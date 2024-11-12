import { IChecklistInitialState } from './checklist.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChecklist } from '../../types/checklist'

const initialState: IChecklistInitialState = {
	checklist: [],
}

const ChecklistSlice = createSlice({
	name: 'checklist',
	initialState: initialState,
	reducers: {
		addItem: (state, action: PayloadAction<IChecklist>) => {
			state.checklist.push(action.payload)
		},
	},
})

export const { addItem } = ChecklistSlice.actions
export default ChecklistSlice.reducer
