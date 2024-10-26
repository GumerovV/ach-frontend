import React, { FC } from 'react'
import Container from '../../../ui/container/Container'

import styles from './Events.module.scss'
import EventItem from './EventItem'

const Events: FC = () => {
	return (
		<Container title={'События'}>
			<ul className={styles.events}>
				<EventItem date={'12/03/2024 19:16:35'} text={'Событие 1'} />
				<EventItem date={'12/03/2024 19:17:40'} text={'Событие 2'} />
				<EventItem date={'12/03/2024 19:17:42'} text={'Событие 3'} />
				<EventItem date={'12/03/2024 19:18:12'} text={'Событие 4'} />
				<EventItem date={'12/03/2024 19:20:03'} text={'Событие 5'} />
				<EventItem date={'12/03/2024 19:22:55'} text={'Событие 6'} />
			</ul>
		</Container>
	)
}

export default Events
