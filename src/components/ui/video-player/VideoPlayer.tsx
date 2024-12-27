import React, { FC, useState } from 'react'
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

	const [videoError, setVideoError] = useState<boolean>(false)

	return (
		<>
			<div className={styles.wrapper}>
				{!videoError ? (
					<video
						src={videoPath}
						ref={videoRef}
						className={styles.player}
						preload='metadata'
						onClick={toggleVideo}
						onError={() => setVideoError(!videoError)}
					/>
				) : (
					<div className='text-font'>
						<p>Видео обрабатывается. Попробуйте позже</p>
					</div>
				)}

				{!videoError && (
					<div
						className={classNames(styles.controls, {
							[styles.hide]: playerState.isPlaying,
						})}
					>
						{
							<button onClick={toggleVideo}>
								{playerState.isPlaying ? <IoPause /> : <IoPlay />}
							</button>
						}
					</div>
				)}
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
