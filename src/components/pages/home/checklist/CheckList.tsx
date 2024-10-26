import React, { FC } from 'react'
import Container from '../../../ui/container/Container'
import CheckListItem from './CheckListItem'

import styles from './CheckList.module.scss'

const CheckList: FC = () => {
	return (
		<Container title={'Чек-лист'}>
			<ul className={styles.checklist}>
				<CheckListItem color={'success'} text={'Этап 1'} />
				<CheckListItem color={'success'} text={'Этап 2'} />
				<CheckListItem color={'error'} text={'Этап 3'} />
				<CheckListItem color={'error'} text={'Этап 4'} />
				<CheckListItem color={'other'} text={'Этап 5'} />
				<CheckListItem color={'other'} text={'Этап 6'} />
			</ul>
		</Container>
	)
}

export default CheckList
