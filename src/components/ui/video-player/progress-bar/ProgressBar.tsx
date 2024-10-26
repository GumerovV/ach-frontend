import React, { FC, useState } from 'react'
import { IProgressBarProps } from './progress-bar.interface'
import styles from './ProgressBar.module.scss'

const ProgressBar: FC<IProgressBarProps> = ({
	currentTime,
	videoTime,
	handleRangeChange,
}) => {
	const [hoverTime, setHoverTime] = useState<number | null>(null)
	const [hoverPosition, setHoverPosition] = useState<number | null>(null)

	const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
		const input = e.currentTarget
		const rect = input.getBoundingClientRect()
		const position = e.clientX - rect.left
		const progress = position / rect.width
		const time = Math.floor(progress * videoTime)

		setHoverTime(time)
		setHoverPosition(position)
	}

	const handleMouseLeave = () => {
		setHoverTime(null)
		setHoverPosition(null)
	}

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${minutes}:${seconds.toString().padStart(2, '0')}`
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.progressContainer}>
					<input
						className='w-full'
						type='range'
						min={0}
						max={Math.floor(videoTime)}
						value={Math.floor(currentTime)}
						onChange={handleRangeChange}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					/>
					{hoverTime !== null && (
						<div
							className={styles.hoverTime}
							style={{ left: hoverPosition || 0 }}
						>
							{formatTime(hoverTime)}
						</div>
					)}
				</div>
				<button>В эфир</button>
			</div>
		</div>
	)
}

export default ProgressBar
