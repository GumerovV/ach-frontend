import { Middleware } from '@reduxjs/toolkit'
import {
	connect,
	disconnect,
	setConnection,
} from '../websocket/websocket.slice'
import { addEvent } from '../event/event.slice'
import { addItem } from '../checklist/checklist.slice'

const websocketMiddleware = (url: string): Middleware => {
	let socket: WebSocket | null = null

	return store => next => action => {
		if (connect.match(action)) {
			socket = new WebSocket(url)

			socket.onopen = () => {
				store.dispatch(setConnection(true))
			}

			socket.onclose = () => {
				store.dispatch(setConnection(false))
			}

			socket.onmessage = event => {
				const message = JSON.parse(event.data)

				switch (message.type) {
					case 'event':
						console.log('Received event', message)
						store.dispatch(addEvent(message))
						break
					case 'checklist':
						console.log('Received event', message)
						store.dispatch(addItem(message))
						break
					default:
						console.warn('Unknown event type:', message.type)
				}
			}
		}

		if (disconnect.match(action) && socket) {
			socket.close()
			socket = null
		}

		return next(action)
	}
}

export default websocketMiddleware
