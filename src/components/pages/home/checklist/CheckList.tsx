import React, { FC, useEffect, useState } from 'react'
import Container from '../../../ui/container/Container'
import CheckListItem from './CheckListItem'
import styles from './CheckList.module.scss'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Field, Label, Switch } from '@headlessui/react'
import { useActions } from '../../../../hooks/useActions'
import { useDispatch } from 'react-redux'
import { sendMessage } from '../../../../store/websocket/websocket.slice'
import { v4 } from 'uuid'

const CheckList: FC = () => {
	const dispatch = useDispatch()
	const { event_uuid } = useTypedSelector(state => state.events)
	const { checklist } = useTypedSelector(state => state.checklist)
	const { getChecklist } = useActions()

	const [isGrounded, setIsGrounded] = useState<boolean>(false)
	const [isGroundedAfter, setIsGroundedAfter] = useState<boolean>(false)

	useEffect(() => {
		if (event_uuid) getChecklist(event_uuid)
	}, [event_uuid])

	const handleToggleGrounded = () => {
		setIsGrounded(!isGrounded)
		!isGrounded &&
			dispatch(
				sendMessage({
					event_uuid,
					step_id: v4(),
					grounding: !isGrounded,
				}),
			)
	}

	const handleToggleGroundedAfter = () => {
		setIsGroundedAfter(!isGroundedAfter)
		!isGroundedAfter &&
			dispatch(
				sendMessage({
					event_uuid,
					step_id: v4(),
					grounding: isGroundedAfter,
				}),
			)
	}

	return (
		<Container title={'Чек-лист'}>
			<div className='w-full flex flex-col justify-between'>
				<div className='w-full'>
					<ul className={styles.checklist}>
						{checklist.length ? (
							checklist.map(item => (
								<CheckListItem
									key={item.step_index}
									color={item.color}
									step_name={item.step_name}
								/>
							))
						) : (
							<li className='text-center text-gray-500'>
								Пока нет актуальных этапов...
							</li>
						)}
					</ul>
				</div>
				<div className='w-full flex flex-col flex-grow-3 space-y-4 font-oswald text-lg xl:text-xl'>
					<Field
						className='flex items-center justify-between'
						onClick={handleToggleGrounded}
					>
						<Label>Заземлено</Label>
						<Switch
							className='group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600'
							checked={isGrounded}
							onClick={handleToggleGrounded}
						>
							<span className='size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6' />
						</Switch>
					</Field>
					<Field
						className='flex items-center justify-between'
						onClick={handleToggleGroundedAfter}
					>
						<Label>Заземление убрано</Label>
						<Switch
							className='group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600'
							checked={isGroundedAfter}
							onClick={handleToggleGroundedAfter}
						>
							<span className='size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6' />
						</Switch>
					</Field>
				</div>
			</div>
		</Container>
	)
}

export default CheckList
