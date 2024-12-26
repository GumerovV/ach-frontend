import React, { FC, useState } from 'react'

import styles from './Violations.module.scss'
import Violation from '../../../../assets/violation.png'
import ViolationVideoModal from './violation-video-modal/ViolationVideoModal'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { sendMessage } from '../../../../store/websocket/websocket.slice'
import {
	processViolation,
	resetViolations,
} from '../../../../store/violations/violations.slice'
import {
	resetChecklist,
	updateToSuccessStep,
} from '../../../../store/checklist/checklist.slice'

const ViolationItem: FC<{
	step_id: string
	achName: string
	violationName: string
	date: string
	time: string
	photoPath: string
	videoPath: string
}> = ({
	time,
	date,
	achName,
	violationName,
	photoPath,
	videoPath,
	step_id,
}) => {
	const dispatch = useDispatch()
	const { event_uuid } = useTypedSelector(state => state.events)
	const { checklist } = useTypedSelector(state => state.checklist)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleConfirmed = () => {
		const isResetChecklist = window.confirm('Вы хотите начать заново?')
		const message = {
			event_uuid,
			step_id,
			violation_confirmed: true,
		}
		dispatch(sendMessage(message))
		dispatch(processViolation(step_id))
		console.log('handleConfirmed', checklist)

		if (isResetChecklist) {
			dispatch(
				sendMessage({
					event_uuid,
					renewal_analysis: true,
				}),
			)
			dispatch(resetChecklist())
			dispatch(resetViolations())
		}
	}

	const handleDismiss = () => {
		const message = {
			event_uuid,
			step_id,
			violation_confirmed: false,
			correct_step_index: checklist.find(el => el.id === step_id)?.step_index,
		}
		dispatch(sendMessage(message))
		dispatch(processViolation(step_id))
		dispatch(updateToSuccessStep(step_id))
		console.log('handleDismiss', checklist)
	}

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
					<button
						className='bg-[#317B1F] hover:bg-success transition-all duration-300'
						onClick={handleConfirmed}
					>
						Подтвердить
					</button>
					<button
						className='bg-[#911515] hover:bg-error transition-all duration-300'
						onClick={handleDismiss}
					>
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
