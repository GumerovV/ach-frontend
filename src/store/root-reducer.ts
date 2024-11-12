import { combineReducers } from '@reduxjs/toolkit'
import EventReducer from './event/event.slice'
import WebsocketReducer from './websocket/websocket.slice'
import ChecklistReducer from './checklist/checklist.slice'

export const rootReducer = combineReducers({
	events: EventReducer,
	checklist: ChecklistReducer,
	websocket: WebsocketReducer,
})
