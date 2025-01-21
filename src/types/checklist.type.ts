import { IBase } from './base.type'

export interface IChecklist extends IBase {
	id: string
	step_name: string
	date?: string
	status_string?: string
	status_bool?: boolean
	color: 'success' | 'error' | 'other'
	message?: string
}

export interface IChecklistWebSocketDto extends IBase {
	step_id: string
	step_name: string
	datetime: string
	status_string?: string
	status_bool?: boolean
	color: 'success' | 'error' | 'other'
	message?: string
}
