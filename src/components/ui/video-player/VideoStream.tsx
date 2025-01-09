import React, { FC, useState } from 'react'
import { usePlayer } from './usePlayer'
import styles from './VideoPlayer.module.scss'
import ProgressBar from './progress-bar/ProgressBar'
import useWebRTC from '../../../hooks/useWebRTC'
import classNames from 'classnames'
import { IoPause, IoPlay } from 'react-icons/io5'

const VideoStream: FC<{ videoPath: string; isStream?: boolean }> = ({
	videoPath,
	isStream = true,
}) => {
	const { playerState, handleRangeChange } = usePlayer()
	const { provideAudioRef, provideVideoRef, start, stop } = useWebRTC()
	const [isPlaying, setIsPlaying] = useState<boolean>(false)

	const toggleStream = () => {
		if (isPlaying) {
			setIsPlaying(false)
			stop()
		} else {
			setIsPlaying(true)
			start()
		}
	}

	return (
		<>
			<div className={styles.wrapper}>
				<video
					src={'/video5.mp4'}
					ref={provideVideoRef}
					autoPlay
					playsInline={true}
					className={styles.background}
					onClick={toggleStream}
				/>
				<video
					src={'/video5.mp4'}
					ref={provideVideoRef}
					autoPlay
					playsInline={true}
					className={styles.player}
					onClick={toggleStream}
				/>
				<audio autoPlay ref={provideAudioRef} />
				<div
					className={classNames(styles.controls, {
						[styles.hide]: isPlaying,
					})}
				>
					<button onClick={toggleStream}>
						{isPlaying ? <IoPause /> : <IoPlay />}
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

export default VideoStream
