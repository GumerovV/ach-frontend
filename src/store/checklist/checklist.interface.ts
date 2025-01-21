import { IChecklist } from '../../types/checklist.type'

export interface IChecklistInitialState {
	checklist: ChecklistItemType[]
}

export type ChecklistItemType = IChecklist & {
	step_index: number
}
