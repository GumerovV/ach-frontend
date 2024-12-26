import { IEventsInitialState } from './event.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getEvents, getEventUUID } from './event.actions'
import { IEventWebSocketDto } from '../../types/event.type'

const initialState: IEventsInitialState = {
	events: [],
	event_uuid: '',
}

const EventsSlice = createSlice({
	name: 'events',
	initialState: initialState,
	reducers: {
		addEvent: (state, action: PayloadAction<IEventWebSocketDto>) => {
			state.events.push({
				id: action.payload.step_id,
				step_name: action.payload.step_name,
				datetime: action.payload.datetime,
			})
		},
		changeEventUUID: (state, action: PayloadAction<string>) => {
			state.event_uuid = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getEvents.fulfilled, (state, action) => {
				state.events = action.payload
			})
			.addCase(getEventUUID.fulfilled, (state, action) => {
				state.event_uuid = action.payload
			})
	},
})

export const { addEvent, changeEventUUID } = EventsSlice.actions
export default EventsSlice.reducer
