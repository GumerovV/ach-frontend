import { useCallback, useEffect, useRef, useState } from 'react'
import { IVideoElement, IVideoPlayerState } from './video-player.interface'

const initialVideoPlayerState: IVideoPlayerState = {
	videoTime: 0,
	currentTime: 0,
	progress: 0,
	isPlaying: false,
}

export const usePlayer = () => {
	const videoRef = useRef<IVideoElement>(null)

	const [playerState, setPlayerState] = useState<IVideoPlayerState>(
		initialVideoPlayerState,
	)

	useEffect(() => {
		const originalDuration = videoRef.current?.duration
		if (originalDuration)
			setPlayerState({ ...playerState, videoTime: originalDuration })
	}, [videoRef.current?.duration])

	const toggleVideo = useCallback(() => {
		if (!playerState.isPlaying) {
			videoRef.current?.play()
			setPlayerState(prevState => ({ ...prevState, isPlaying: true }))
		} else {
			videoRef.current?.pause()
			setPlayerState(prevState => ({ ...prevState, isPlaying: false }))
		}
	}, [playerState.isPlaying])

	const forward = () => {
		if (videoRef.current) videoRef.current.currentTime += 15
	}

	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 15
	}

	const fullscreen = () => {
		const video = videoRef.current

		if (!video) return

		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen()
		} else if (video.mozRequestFullscreen) {
			video.mozRequestFullscreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		}
	}

	useEffect(() => {
		const video = videoRef.current

		if (!video) return

		const updateProgress = () => {
			setPlayerState(prevState => ({
				...prevState,
				currentTime: video.currentTime,
				progress: (video.currentTime / prevState.videoTime) * 100,
			}))
		}

		video.addEventListener('timeupdate', updateProgress)

		return () => {
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [playerState.videoTime])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowLeft':
					revert()
					break
				case 'ArrowRight':
					forward()
					break
				case ' ':
					e.preventDefault()
					toggleVideo()
					break
				case 'f':
					fullscreen()
					break
				default:
					return
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [toggleVideo])

	const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = Number(e.target.value) // текущее время
		if (videoRef.current) {
			videoRef.current.currentTime = newTime // устанавливаем новое время в видео
		}
		setPlayerState(prevState => ({
			...prevState,
			currentTime: newTime, // устанавливаем новое время в состоянии
			progress: (newTime / prevState.videoTime) * 100, // обновляем прогресс в процентах
		}))
	}

	return {
		videoRef,
		playerState,
		toggleVideo,
		fullscreen,
		handleRangeChange,
	}
}
