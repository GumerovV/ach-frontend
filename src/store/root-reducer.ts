import { combineReducers } from '@reduxjs/toolkit'
import EventReducer from './event/event.slice'
import WebsocketReducer from './websocket/websocket.slice'
import ChecklistReducer from './checklist/checklist.slice'
import ViolationReducer from './violations/violations.slice'
import { reducer as toastReducer } from 'react-redux-toastr'

export const rootReducer = combineReducers({
	events: EventReducer,
	checklist: ChecklistReducer,
	violations: ViolationReducer,
	websocket: WebsocketReducer,
	toastr: toastReducer,
})
