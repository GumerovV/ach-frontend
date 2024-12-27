import React, { FC } from 'react'
import styles from './CheckList.module.scss'
import classNames from 'classnames'
import { IChecklist } from '../../../../types/checklist.type'

type CheckListPropsType = Pick<IChecklist, 'step_name' | 'color'>

const CheckListItem: FC<CheckListPropsType> = ({ color, step_name }) => {
	return (
		<li className={styles.checklist_item}>
			<div
				className={classNames(styles.circle, {
					'bg-success': color === 'success', // зеленый для success
					'bg-error': color === 'error', // красный для error
					'bg-other': color === 'other', // серый для other
				})}
			></div>
			<p>{step_name}</p>
		</li>
	)
}

export default CheckListItem
