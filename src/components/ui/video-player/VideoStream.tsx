import React, { FC } from 'react'
import { usePlayer } from './usePlayer'
import styles from './VideoPlayer.module.scss'
import ProgressBar from './progress-bar/ProgressBar'
import useWebRTC from '../../../hooks/useWebRTC'

const VideoPlayer: FC<{ videoPath: string; isStream?: boolean }> = ({
	videoPath,
	isStream = true,
}) => {
	const { videoRef, playerState, toggleVideo, fullscreen, handleRangeChange } =
		usePlayer()
	const { provideMediaRef } = useWebRTC()

	return (
		<>
			<div className={styles.wrapper}>
				<video
					ref={provideMediaRef}
					autoPlay
					playsInline={true}
					className={styles.player}
				/>
			</div>

			<ProgressBar
				videoTime={playerState.videoTime}
				currentTime={playerState.currentTime}
				handleRangeChange={handleRangeChange}
				isStream={isStream}
			/>
		</>
	)
}

export default VideoPlayer
