import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IViolationsInitialState } from './violations.interface'
import { IViolation, IViolationWebSocketDto } from '../../types/violation.type'
import { getViolations } from './violations.actions'

const initialState: IViolationsInitialState = {
	violations: [],
}

const ViolationSlice = createSlice({
	name: 'violations',
	initialState: initialState,
	reducers: {
		addViolation: (state, action: PayloadAction<IViolationWebSocketDto>) => {
			state.violations.push({
				id: action.payload.step_id,
				step_name: action.payload.step_name,
				datetime: action.payload.datetime,
				video_link: action.payload.video_link,
				preview_path: action.payload.preview_path,
			})
		},
		processViolation: (state, action: PayloadAction<string>) => {
			state.violations = state.violations.filter(
				violation => violation.id !== action.payload,
			)
		},
		resetViolations: state => {
			state.violations = initialState.violations
		},
	},
	extraReducers: builder => {
		builder.addCase(
			getViolations.fulfilled,
			(state, action: PayloadAction<IViolation[]>) => {
				state.violations = action.payload
			},
		)
	},
})

export const { addViolation, processViolation, resetViolations } =
	ViolationSlice.actions
export default ViolationSlice.reducer
