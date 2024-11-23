import React, { FC } from 'react'
import Container from '../../../ui/container/Container'
import CheckListItem from './CheckListItem'

import styles from './CheckList.module.scss'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Field, Label, Switch } from '@headlessui/react'

const CheckList: FC = () => {
	const { checklist } = useTypedSelector(state => state.checklist)

	return (
		<Container title={'Чек-лист'}>
			<div className='w-full flex flex-col justify-between'>
				<div className='w-full'>
					<ul className={styles.checklist}>
						{checklist.length ? (
							checklist.map(item => (
								<CheckListItem color={item.color} text={item.text} />
							))
						) : (
							<li className='text-center text-gray-500'>
								Пока нет актуальных этапов...
							</li>
						)}
					</ul>
				</div>
				<div className='w-full flex flex-col flex-grow-3 space-y-4 font-oswald text-xl'>
					<Field className='flex items-center justify-between'>
						<Label>Заземлено</Label>
						<Switch className='group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600'>
							<span className='size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6' />
						</Switch>
					</Field>
					<Field className='flex items-center justify-between'>
						<Label>Заземление убрано</Label>
						<Switch className='group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600'>
							<span className='size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6' />
						</Switch>
					</Field>
				</div>
			</div>
		</Container>
	)
}

export default CheckList
