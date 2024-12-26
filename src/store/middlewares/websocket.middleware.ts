import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import {
	connect,
	disconnect,
	sendMessage,
	setConnection,
} from '../websocket/websocket.slice'
import { addEvent, changeEventUUID } from '../event/event.slice'
import {
	changeToSuccessStep,
	resetChecklist,
	updateErrorItem,
	updateSuccessItem,
	updateToSuccessStep,
} from '../checklist/checklist.slice'
import {
	ToasterSuccess,
	ToasterWarning,
	ToastrError,
} from '../../utils/api.utils'
import { toastr } from 'react-redux-toastr'
import { addViolation } from '../violations/violations.slice'
import { ChecklistService } from '../../services/checklist.service'
import { ChecklistItemType } from '../checklist/checklist.interface'

function saveChecklist(store: MiddlewareAPI) {
	const { checklist, events } = store.getState()
	try {
		const message = checklist.checklist
			.filter((el: ChecklistItemType) => el.id) // Фильтруем только элементы с id
			.map((el: ChecklistItemType) => ({
				step_index: el.step_index,
				id: el.id,
				color: el.color,
				step_name: el.step_name,
			}))
		ChecklistService.saveChecklist(events.event_uuid, message)
			.then(response => {
				console.log('Чек-лист сохранён:', response)
			})
			.catch(error => {
				console.error('Ошибка при сохранении чек-листа:', error)
			})
	} catch (e) {
		console.warn('Неожиданная ошибка при сохранении чек-листа:', e)
	}
}

const websocketMiddleware = (url: string): Middleware => {
	let socket: WebSocket | null = null

	return store => next => action => {
		if (connect.match(action)) {
			socket = new WebSocket(url)

			socket.onopen = () => {
				store.dispatch(setConnection(true))
				ToasterSuccess('Новое сообщение:', 'Подключение установлено')
			}

			socket.onclose = () => {
				store.dispatch(setConnection(false))
				toastr.error('Новое сообщение:', 'Подключение разорвано')
			}

			socket.onmessage = event => {
				const message = JSON.parse(event.data)

				switch (message.type) {
					case 'event':
						ToasterSuccess('Новое сообщение:', message.message)
						store.dispatch(updateSuccessItem(message))
						saveChecklist(store)
						break
					case 'violation':
						ToastrError('Новое сообщение:', message.message)
						store.dispatch(updateErrorItem(message))
						store.dispatch(addViolation(message))
						saveChecklist(store)
						break
					case 'logger':
						store.dispatch(addEvent(message))
						break
					case 'car-moved':
						ToasterWarning('Новое сообщение:', 'Смена машины')
						store.dispatch(changeEventUUID(message.event_uuid))
						store.dispatch(resetChecklist())
						break
					default:
						console.warn('Unknown event type:', message.type)
						ToastrError('Unknown event type:', message.type)
				}
			}
		}

		if (sendMessage.match(action) && socket) {
			console.log(action.payload)
			socket.send(JSON.stringify(action.payload))
		}

		if (updateToSuccessStep.match(action)) {
			store.dispatch(changeToSuccessStep(action.payload))
			saveChecklist(store)
		}

		if (disconnect.match(action) && socket) {
			socket.close()
			socket = null
		}

		return next(action)
	}
}

export default websocketMiddleware
