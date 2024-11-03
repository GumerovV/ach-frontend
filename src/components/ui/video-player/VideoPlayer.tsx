import React, { FC } from 'react'
import { usePlayer } from './usePlayer'
import styles from './VideoPlayer.module.scss'
import classNames from 'classnames'
import { IoPause, IoPlay } from 'react-icons/io5'
import ProgressBar from './progress-bar/ProgressBar'

const VideoPlayer: FC<{ videoPath: string; isStream?: boolean }> = ({
	videoPath,
	isStream = true,
}) => {
	const { videoRef, playerState, toggleVideo, fullscreen, handleRangeChange } =
		usePlayer()

	return (
		<>
			<div className={styles.wrapper}>
				<video
					src={'/video.mp4'}
					ref={videoRef}
					className={styles.player}
					preload='metadata'
					onClick={toggleVideo}
				/>

				<div
					className={classNames(styles.controls, {
						[styles.hide]: playerState.isPlaying,
					})}
				>
					<button onClick={toggleVideo}>
						{playerState.isPlaying ? <IoPause /> : <IoPlay />}
					</button>
				</div>
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
