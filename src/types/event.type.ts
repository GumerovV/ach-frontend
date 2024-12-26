import { IBase } from './base.type'

export interface IEvent extends IBase {
	id: number
	step_name: string
	datetime: string
	time?: string
	isDeviation?: boolean
	videoPath?: string
	eventTimeCode?: string
	isAccepted?: boolean
}

export interface IEventWebSocketDto extends IBase {
	step_id: number
	step_name: string
	datetime: string
	time?: string
	isDeviation?: boolean
	videoPath?: string
	eventTimeCode?: string
	isAccepted?: boolean
}
