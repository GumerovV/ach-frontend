import { IBase } from './base.type'

export interface IViolation extends IBase {
	id: string
	step_name: string
	video_link?: string
	preview_path?: string
	datetime: string
}

export interface IViolationWebSocketDto extends IBase {
	step_id: string
	step_name: string
	video_link?: string
	preview_path?: string
	datetime: string
}
