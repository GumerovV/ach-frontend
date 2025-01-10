import React, { FC, useEffect } from 'react'
import Container from '../../../ui/container/Container'

import styles from './Events.module.scss'
import EventItem from './EventItem'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { getDate, getTime } from '../../../../utils/format-date'
import { useActions } from '../../../../hooks/useActions'

const Events: FC = () => {
	const { events, event_uuid } = useTypedSelector(state => state.events)
	const { getEvents } = useActions()

	useEffect(() => {
		if (event_uuid) {
			getEvents(event_uuid)
		}
	}, [event_uuid])

	return (
		<Container title={'События'}>
			<ul className={styles.events}>
				{events.length ? (
					events
						.slice()
						.reverse()
						.map(event => (
							<EventItem
								key={event.datetime}
								id={event.id}
								datetime={getDate(event.datetime)}
								time={getTime(event.datetime)}
								step_name={event.step_name}
							/>
						))
				) : (
					<li className='col-span-4 text-center text-gray-500 4xl:text-2xl'>
						Пока нет актуальных событий...
					</li>
				)}
			</ul>
		</Container>
	)
}

export default Events
