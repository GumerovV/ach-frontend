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
		updateSuccessItem: (
			state,
			action: PayloadAction<IChecklistWebSocketDto>,
		) => {
			const checklistCopy = [...state.checklist] // Создаем копию массива
			const firstStep = checklistCopy.find(
				el => el.step_name === action.payload.step_name,
			)
			const secondStep = [...checklistCopy]
				.reverse()
				.find(el => el.step_name === action.payload.step_name)

			if (firstStep?.step_index === secondStep?.step_index) {
				state.checklist = state.checklist.map(item => {
					if (item.step_index === secondStep?.step_index) {
						item.id = action.payload.step_id
						item.color = 'success'
					}
					return item
				})
			} else if (!firstStep?.id) {
				state.checklist = state.checklist.map(item => {
					if (item.step_index === firstStep?.step_index) {
						item.id = action.payload.step_id
						item.color = 'success'
					}
					return item
				})
			} else {
				state.checklist = state.checklist.map(item => {
					if (item.step_index === secondStep?.step_index) {
						item.id = action.payload.step_id
						item.color = 'success'
					}
					return item
				})
			}
		},
		updateErrorItem: (state, action: PayloadAction<IChecklistWebSocketDto>) => {
			const checklistCopy = [...state.checklist] // Создаем копию массива
			const firstStep = checklistCopy.find(
				el => el.step_name === action.payload.step_name,
			)
			const secondStep = [...checklistCopy]
				.reverse()
				.find(el => el.step_name === action.payload.step_name)

			if (firstStep?.step_index === secondStep?.step_index) {
				state.checklist = state.checklist.map(item => {
					if (item.step_index === secondStep?.step_index) {
						item.id = action.payload.step_id
						item.color = 'error'
					}
					return item
				})
			} else if (!firstStep?.id) {
				state.checklist = state.checklist.map(item => {
					if (item.step_index === firstStep?.step_index) {
						item.id = action.payload.step_id
						item.color = 'error'
					}
					return item
				})
			} else {
				state.checklist = state.checklist.map(item => {
					if (item.step_index === secondStep?.step_index) {
						item.id = action.payload.step_id
						item.color = 'error'
					}
					return item
				})
			}
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
	updateSuccessItem,
	updateErrorItem,
	resetChecklist,
	changeToSuccessStep,
	updateToSuccessStep,
} = ChecklistSlice.actions
export default ChecklistSlice.reducer
