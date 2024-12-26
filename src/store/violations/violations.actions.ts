import { createAsyncThunk } from '@reduxjs/toolkit'
import { ToastrError } from '../../utils/api.utils'
import { ViolationsService } from '../../services/violations.service'
import { IViolation } from '../../types/violation.type'

export const getViolations = createAsyncThunk<IViolation[], string>(
	'load/violations',
	async (event_uuid, thunkAPI) => {
		try {
			const response = await ViolationsService.getViolations(event_uuid)
			return response
		} catch (e) {
			ToastrError(e)
			return thunkAPI.rejectWithValue(e)
		}
	},
)
