import React, { FC } from 'react'
import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'
import { IEventDetailModal } from './event-detail-modal.interface'

import styles from './EventDetailModal.module.scss'

const EventDetailModal: FC<IEventDetailModal> = ({
	isOpen,
	onClose,
	event,
}) => {
	return (
		<Dialog onClose={onClose} open={isOpen} className={styles.modal}>
			<div className={styles.wrapper}>
				<DialogPanel className={styles.modal_wrapper}>
					<DialogTitle className={styles.title}>{event.name}</DialogTitle>
					<Description>
						<div>
							<div>Дата: {event.date}</div>
							<div>Время: {event.time}</div>
							<div>Назвние: {event.name}</div>
							<div>Является отклонением: {event.isDeviation}</div>
							<div>Тайм-код события: {event.eventTimeCode}</div>
							<div>Ссылка на видео: {event.videoPath}</div>
							<div>Подтверждено: {event.isAccepted}</div>
						</div>
					</Description>
				</DialogPanel>
			</div>
		</Dialog>
	)
}

export default EventDetailModal
