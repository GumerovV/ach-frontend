import React, { FC } from 'react'
import Container from '../../../ui/container/Container'

import styles from './Violations.module.scss'
import ViolationItem from './ViolationItem'

const Violations: FC = () => {
	return (
		<Container title={'Подтверждение нарушения'}>
			<ul className={styles.violations}>
				<ViolationItem
					achName={'ACH-7'}
					violationName={'Название нарушения'}
					date={'12/03/2024'}
					time={'19:16:35'}
					photoPath={''}
					videoPath={''}
				/>
			</ul>
		</Container>
	)
}

export default Violations
