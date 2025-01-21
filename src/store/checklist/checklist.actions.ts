import { createAsyncThunk } from '@reduxjs/toolkit'
import { ChecklistService } from '../../services/checklist.service'
import { ToastrError } from '../../utils/api.utils'
import { ChecklistItemType } from './checklist.interface'

export const getChecklist = createAsyncThunk<ChecklistItemType[], string>(
	'load/checklist',
	async (event_uuid, thunkAPI) => {
		try {
			const res = await ChecklistService.getChecklist(event_uuid)
			return res
		} catch (e) {
			ToastrError(e)
			return thunkAPI.rejectWithValue(e)
		}
	},
)
