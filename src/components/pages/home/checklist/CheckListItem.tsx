import React, { FC } from 'react'
import styles from './CheckList.module.scss'
import classNames from 'classnames'

const CheckListItem: FC<{
	color: 'success' | 'error' | 'other'
	text: string
}> = ({ color, text }) => {
	return (
		<li className={styles.checklist_item}>
			<div
				className={classNames(styles.circle, {
					'bg-success': color === 'success', // зеленый для success
					'bg-error': color === 'error', // красный для error
					'bg-other': color === 'other', // серый для other
				})}
			></div>
			<p>{text}</p>
		</li>
	)
}

export default CheckListItem
