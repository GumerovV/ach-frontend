import { IEventsInitialState } from './event.interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IEventsInitialState = {
	events: [],
}

const EventsSlice = createSlice({
	name: 'events',
	initialState: initialState,
	reducers: {
		addEvent: (state, action) => {
			state.events.push(action.payload)
		},
	},
})

export const { addEvent } = EventsSlice.actions
export default EventsSlice.reducer
