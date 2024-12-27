import React, { FC, useState } from 'react'
import styles from './Events.module.scss'
import { IEvent } from '../../../../types/event.type'
import EventDetailModal from './event-detail-modal/EventDetailModal'

const EventItem: FC<IEvent> = event => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<>
			<p className={styles.event_content}>{event.datetime}</p>
			<p className={styles.event_content}>{event.time}</p>
			<p className={styles.event_content}>{event.step_name}</p>
			{/*<p className={styles.event_content}>{event.id}</p>*/}
			<button className={styles.event_content} onClick={() => setIsOpen(true)}>
				Подробнее
			</button>
			{isOpen && (
				<EventDetailModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					event={event}
				/>
			)}
		</>
	)
}

export default EventItem
