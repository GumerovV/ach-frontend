import { IBase } from './base'

export interface IChecklist extends IBase {
	color: 'success' | 'error' | 'other'
	text: string
}
