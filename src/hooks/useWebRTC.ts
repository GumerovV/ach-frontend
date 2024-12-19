import { useCallback, useEffect, useRef } from 'react'
// @ts-ignore
import freeice from 'freeice'
import socket from '../socket-client/socket'
import ACTIONS from '../socket-client/actions'

export default function useWebRTC() {
	const peerConnection = useRef<RTCPeerConnection | null>(null)
	const videoElement = useRef<HTMLVideoElement | null>(null)

	useEffect(() => {
		peerConnection.current = new RTCPeerConnection({
			iceServers: freeice(),
		})

		peerConnection.current.onicecandidate = event => {
			if (event.candidate) {
				socket.emit(ACTIONS.RELAY_ICE, {
					peerID: 'server', // Статический ID для сервера
					iceCandidate: event.candidate,
				})
			}
		}

		peerConnection.current.ontrack = ({ streams: [remoteStream] }) => {
			if (videoElement.current) {
				videoElement.current.srcObject = remoteStream
			}
		}

		async function createAndSendOffer() {
			const offer = await peerConnection.current?.createOffer()
			await peerConnection.current?.setLocalDescription(offer)

			socket.emit(ACTIONS.RELAY_SDP, {
				peerID: 'server',
				sessionDescription: offer,
			})
		}

		createAndSendOffer()

		socket.on(ACTIONS.SESSION_DESCRIPTION, async ({ sessionDescription }) => {
			const remoteDesc = new RTCSessionDescription(sessionDescription)
			await peerConnection.current?.setRemoteDescription(remoteDesc)

			if (sessionDescription.type === 'offer') {
				const answer = await peerConnection.current?.createAnswer()
				await peerConnection.current?.setLocalDescription(answer)

				socket.emit(ACTIONS.RELAY_SDP, {
					peerID: 'server',
					sessionDescription: answer,
				})
			}
		})

		socket.on(ACTIONS.ICE_CANDIDATE, ({ iceCandidate }) => {
			peerConnection.current?.addIceCandidate(new RTCIceCandidate(iceCandidate))
		})

		return () => {
			peerConnection.current?.close()
			peerConnection.current = null

			socket.off(ACTIONS.SESSION_DESCRIPTION)
			socket.off(ACTIONS.ICE_CANDIDATE)
		}
	}, [])

	const provideMediaRef = useCallback((node: HTMLVideoElement) => {
		videoElement.current = node
	}, [])

	return {
		provideMediaRef,
	}
}
