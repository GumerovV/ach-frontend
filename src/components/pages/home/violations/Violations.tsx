import React, { FC, useEffect } from 'react'
import Container from '../../../ui/container/Container'
import ViolationItem from './ViolationItem'
import Carousel from '../../../ui/carousel/Carousel'

import styles from './Violations.module.scss'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useActions } from '../../../../hooks/useActions'

const Violations: FC = () => {
	const { event_uuid } = useTypedSelector(state => state.events)
	const { violations } = useTypedSelector(state => state.violations)
	const { getViolations } = useActions()

	useEffect(() => {
		if (event_uuid) getViolations(event_uuid)
	}, [event_uuid])

	return (
		<Container title={'Подтверждение нарушения'}>
			<ul key='violations' className={styles.violations}>
				{violations.length ? (
					<Carousel>
						{violations.map(violation => (
							<ViolationItem
								key={violation.id}
								step_id={violation.id}
								achName={'ACH-7'}
								violationName={violation.step_name}
								date={'12/03/2024'}
								time={'19:16:35'}
								photoPath={''}
								videoPath={violation.video_link || ''}
							/>
						))}
					</Carousel>
				) : (
					<p className='col-span-4 p-4 text-center text-gray-500 4xl:text-2xl'>
						Нарушения не зафиксированы
					</p>
				)}
			</ul>
		</Container>
	)
}

export default Violations
