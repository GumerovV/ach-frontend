import React, { FC, useState } from 'react'

import styles from './Violations.module.scss'
import Violation from '../../../../assets/violation.png'
import ViolationVideoModal from './violation-video-modal/ViolationVideoModal'

const ViolationItem: FC<{
	achName: string
	violationName: string
	date: string
	time: string
	photoPath: string
	videoPath: string
}> = ({ time, date, achName, violationName, photoPath, videoPath }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<>
			<li className={styles.violation_item}>
				<div className={styles.info}>
					{/*<img src={`${photoPath}`} alt='Violation Photo' />*/}
					<div
						className={styles.photo}
						onClick={() => {
							setIsOpen(true)
						}}
					>
						<img src={Violation} alt='Violation Photo' />
						<span>Посмотреть</span>
					</div>
					<div>
						<p>{achName}</p>
						<p>{date}</p>
						<p>{time}</p>
						<p className={styles.violation_name}>{violationName}</p>
					</div>
				</div>
				<div className={styles.actions}>
					<button className='bg-[#317B1F] hover:bg-success transition-all duration-300'>
						Подтвердить
					</button>
					<button className='bg-[#911515] hover:bg-error transition-all duration-300'>
						Отклонить
					</button>
				</div>
			</li>
			<ViolationVideoModal
				videoPath={videoPath}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</>
	)
}

export default ViolationItem
