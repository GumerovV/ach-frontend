import React, { FC } from 'react'
import Container from '../../../ui/container/Container'

import styles from './Events.module.scss'
import EventItem from './EventItem'

const Events: FC = () => {
	return (
		<Container title={'События'}>
			<ul className={styles.events}>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 111111111111111111'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
				<EventItem
					date={'12/03/2024'}
					time={'19:16:35'}
					name={'Событие 1'}
					id={1}
				/>
			</ul>
		</Container>
	)
}

export default Events
