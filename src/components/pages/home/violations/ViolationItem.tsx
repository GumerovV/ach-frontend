import React, { FC } from 'react'

import styles from './Violations.module.scss'
import Violation from '../../../../assets/violation.png'

const ViolationItem: FC<{
	achName: String
	violationName: String
	date: String
	time: String
	photoPath: String
}> = ({ time, date, achName, violationName, photoPath }) => {
	return (
		<li className={styles.violation_item}>
			<div className={styles.info}>
				{/*<img src={`${photoPath}`} alt='Violation Photo' />*/}
				<img src={Violation} alt='Violation Photo' />
				<div>
					<p>{achName}</p>
					<p>{date}</p>
					<p>{time}</p>
					<p className={styles.violation_name}>{violationName}</p>
				</div>
			</div>
			<div className={styles.actions}>
				<button className='bg-[#317B1F] hover:bg-success transition-all duration-300'>
					Подтвердить
				</button>
				<button className='bg-[#911515] hover:bg-error transition-all duration-300'>
					Отклонить
				</button>
			</div>
		</li>
	)
}

export default ViolationItem
