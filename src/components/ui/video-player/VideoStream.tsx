import React, { FC } from 'react'
import { usePlayer } from './usePlayer'
import styles from './VideoPlayer.module.scss'
import ProgressBar from './progress-bar/ProgressBar'
import useWebRTC from '../../../hooks/useWebRTC'
import classNames from 'classnames'
import { IoPause, IoPlay } from 'react-icons/io5'
import { BiLoader } from 'react-icons/bi'

const VideoStream: FC<{ videoPath: string; isStream?: boolean }> = ({
	videoPath,
	isStream = true,
}) => {
	const { playerState, handleRangeChange } = usePlayer()
	const {
		provideAudioRef,
		provideVideoRef,
		start,
		stop,
		isPlaying,
		setIsPlaying,
		isLoading,
	} = useWebRTC()
	// const [isPlaying, setIsPlaying] = useState<boolean>(false)

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
					ref={provideVideoRef}
					autoPlay
					playsInline={true}
					className={styles.background}
				/>
				<video
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

				{isLoading && (
					<div className={styles.controls}>
						<BiLoader className='animate-spin' />
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

export default VideoStream
