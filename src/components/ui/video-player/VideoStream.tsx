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
	const { provideAudioRef, provideVideoRef, start, stop } = useWebRTC()

	return (
		<>
			<div className={styles.wrapper}>
				<video
					ref={provideVideoRef}
					autoPlay
					playsInline={true}
					className={styles.player}
				/>
				<audio autoPlay ref={provideAudioRef} />
				<div className='absolute top-1 right-1'>
					<div className='flex gap-4 text-font'>
						<button onClick={start}>Start</button>
						<button onClick={stop}>Stop</button>
					</div>
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
