import { combineReducers } from '@reduxjs/toolkit'
import EventReducer from './event/event.slice'
import WebsocketReducer from './websocket/websocket.slice'

export const rootReducer = combineReducers({
	events: EventReducer,
	websocket: WebsocketReducer,
})
