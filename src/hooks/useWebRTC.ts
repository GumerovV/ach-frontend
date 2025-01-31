import { useCallback, useEffect, useRef, useState } from 'react'
import { REACT_APP_WEBRTC_URL } from '../api/api.utils'
import { toastr } from 'react-redux-toastr'

export default function useWebRTC() {
	const URL = REACT_APP_WEBRTC_URL

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const peerConnection = useRef<RTCPeerConnection | null>(null)
	const videoElement = useRef<HTMLVideoElement | null>(null)
	const audioElement = useRef<HTMLAudioElement | null>(null)

	const negotiate = useCallback((): void => {
		if (!peerConnection.current) return

		// Add transceivers for video and audio
		peerConnection.current.addTransceiver('video', { direction: 'recvonly' })
		peerConnection.current.addTransceiver('audio', { direction: 'recvonly' })

		peerConnection.current
			.createOffer()
			.then(offer => peerConnection.current?.setLocalDescription(offer))
			.then(() => {
				// Wait for ICE gathering to complete
				return new Promise<void>(resolve => {
					if (peerConnection.current?.iceGatheringState === 'complete') {
						resolve()
					} else {
						const checkState = () => {
							if (peerConnection.current?.iceGatheringState === 'complete') {
								peerConnection.current?.removeEventListener(
									'icegatheringstatechange',
									checkState,
								)
								resolve()
							}
						}
						peerConnection.current?.addEventListener(
							'icegatheringstatechange',
							checkState,
						)
					}
				})
			})
			.then(() => {
				const offer = peerConnection.current?.localDescription
				if (!offer) throw new Error('Local description is not set.')

				return fetch(URL, {
					body: JSON.stringify({
						sdp: offer.sdp,
						type: offer.type,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
				})
			})
			.then(response => response.json())
			.then(answer => {
				if (peerConnection.current) {
					peerConnection.current.setRemoteDescription(answer)
				}
			})
			.then(() => {
				// Adjust bitrate for video track
				peerConnection.current?.getSenders().forEach(sender => {
					if (sender.track?.kind === 'video') {
						const params = sender.getParameters()
						if (!params.encodings) {
							params.encodings = [{}]
						}
						params.encodings[0].maxBitrate = 2500000 // 2.5 Mbps
						sender.setParameters(params).catch(e => console.error(e))
					}
				})
			})
			.catch(e => {
				console.log(e)
				setIsLoading(false)
				setIsPlaying(false)
				toastr.error('Ошибка', 'Не удалось подключиться к трансляции')
			})
	}, [])

	const start = useCallback((): void => {
		console.log('started connection to webRTC')
		const config: RTCConfiguration = {
			iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
		}

		peerConnection.current = new RTCPeerConnection(config)

		// Connect audio and video tracks
		peerConnection.current.addEventListener('track', (evt: RTCTrackEvent) => {
			if (evt.track.kind === 'video') {
				if (videoElement.current) {
					videoElement.current.srcObject = evt.streams[0]
				}
			} else if (evt.track.kind === 'audio') {
				if (audioElement.current) {
					audioElement.current.srcObject = evt.streams[0]
				}
			}
		})

		peerConnection.current.addEventListener('connectionstatechange', () => {
			if (peerConnection.current?.connectionState === 'connected') {
				setIsPlaying(true)
				setIsLoading(false)
			}
		})

		setIsLoading(true)

		negotiate()
	}, [negotiate])

	const stop = useCallback((): void => {
		if (peerConnection.current) {
			peerConnection.current.close()
			peerConnection.current = null
			setIsPlaying(false)
			setIsLoading(false)
		}
	}, [])

	const provideVideoRef = useCallback((node: HTMLVideoElement | null): void => {
		videoElement.current = node
	}, [])

	const provideAudioRef = useCallback((node: HTMLAudioElement | null): void => {
		audioElement.current = node
	}, [])

	useEffect(() => {
		return () => {
			if (peerConnection.current) {
				peerConnection.current.close()
			}
		}
	}, [])

	return {
		start,
		stop,
		provideVideoRef,
		provideAudioRef,
		isPlaying,
		setIsPlaying,
		isLoading,
	}
}
