import { createAsyncThunk } from '@reduxjs/toolkit'
import { IEvent } from '../../types/event.type'
import { EventService } from '../../services/event.service'
import { ToastrError } from '../../utils/api.utils'

export const getEvents = createAsyncThunk<IEvent[], string>(
	'load/events',
	async (event_uuid, thunkAPI) => {
		try {
			const res = await EventService.getEvents(event_uuid)
			return res
		} catch (e) {
			ToastrError(e)
			return thunkAPI.rejectWithValue(e)
		}
	},
)

export const getEventUUID = createAsyncThunk<string>(
	'load/eventUUID',
	async (_, thunkAPI) => {
		try {
			const res = await EventService.getEventUUID()
			return res
		} catch (e) {
			ToastrError(e)
			return thunkAPI.rejectWithValue(e)
		}
	},
)
