import { IChecklistInitialState } from './checklist.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChecklistWebSocketDto } from '../../types/checklist.type'
import { getChecklist } from './checklist.actions'
import { checklistSliceInitialState } from './checklist.helper'

const initialState: IChecklistInitialState = checklistSliceInitialState

const ChecklistSlice = createSlice({
	name: 'checklist',
	initialState: initialState,
	reducers: {
		setStep: (state, action: PayloadAction<IChecklistWebSocketDto>) => {
			let flag = false
			state.checklist = state.checklist.map(item => {
				if (!flag) {
					if (action.payload.status_bool) {
						if (!item.id) {
							item.id = action.payload.step_id
							item.color = 'success'
							flag = true
						}
					} else {
						if (!item.id) {
							item.id = action.payload.step_id
							item.color = 'error'
							flag = true
						}
					}
				}

				return item
			})
		},
		changeToSuccessStep: (state, action: PayloadAction<string>) => {
			state.checklist = state.checklist.map(item => {
				if (item.id === action.payload) {
					item.color = 'success'
				}
				return item
			})
		},
		updateToSuccessStep: (state, action: PayloadAction<string>) => {},
		resetChecklist: state => {
			state.checklist = checklistSliceInitialState.checklist
		},
	},
	extraReducers: builder => {
		builder.addCase(getChecklist.fulfilled, (state, action) => {
			console.log(action.payload)
			state.checklist = state.checklist.map(item => {
				const findedEl = action.payload.find(
					el => el.step_index === item.step_index,
				)
				if (findedEl) {
					item = findedEl
				}
				return item
			})
		})
	},
})

export const {
	setStep,
	resetChecklist,
	changeToSuccessStep,
	updateToSuccessStep,
} = ChecklistSlice.actions
export default ChecklistSlice.reducer
