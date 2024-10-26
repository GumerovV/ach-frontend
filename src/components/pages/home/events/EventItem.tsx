import React, { FC } from 'react'

import styles from './Events.module.scss'

const EventItem: FC<{ date: String; text: String }> = ({ text, date }) => {
	return (
		<li className={styles.event_item}>
			<div className={styles.event_content}>
				<p>{date}</p>
				<p>{text}</p>
			</div>
		</li>
	)
}

export default EventItem
