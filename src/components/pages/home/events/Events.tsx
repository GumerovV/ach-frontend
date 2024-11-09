import React, { FC } from 'react'
import Container from '../../../ui/container/Container'

import styles from './Events.module.scss'
import EventItem from './EventItem'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { getDate, getTime } from '../../../../utils/format-date'

const Events: FC = () => {
	const { events } = useTypedSelector(state => state.events)

	return (
		<Container title={'События'}>
			<ul className={styles.events}>
				{events
					.slice()
					.reverse()
					.map(event => (
						<EventItem
							key={event.date}
							date={getDate(event.date)}
							time={getTime(event.date)}
							name={event.name}
						/>
					))}
			</ul>
		</Container>
	)
}

export default Events
