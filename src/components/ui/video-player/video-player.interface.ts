export interface IVideoElement extends HTMLVideoElement {
	msRequestFullscreen?: () => void
	mozRequestFullscreen?: () => void
	webkitRequestFullscreen?: () => void
}

export interface IVideoPlayerState {
	isPlaying: boolean
	videoTime: number
	currentTime: number
	progress: number
}
