import React, { FC } from 'react'
import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'
import { IEventDetailModal } from './event-detail-modal.interface'

const EventDetailModal: FC<IEventDetailModal> = ({
	isOpen,
	onClose,
	event,
}) => {
	return (
		<Dialog onClose={onClose} open={isOpen} className='relative z-50 text-font'>
			<div className='fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50'>
				<DialogPanel className='max-w-lg space-y-4 border bg-white p-12'>
					<DialogTitle className='font-bold text-center'>
						{event.name}
					</DialogTitle>
					<Description>
						<div>
							<div>Дата: {event.date}</div>
							<div>Время: {event.time}</div>
							<div>Назвние: {event.name}</div>
							<div>Является отклонением: {event.isDeviation}</div>
							<div>Тайм-код события: {event.eventTimeCode}</div>
							<div>Ссылка на видео: {event.videoPath}</div>
							<div>Подтверждено: {event.isAccepted}</div>
						</div>
					</Description>
				</DialogPanel>
			</div>
		</Dialog>
	)
}

export default EventDetailModal
