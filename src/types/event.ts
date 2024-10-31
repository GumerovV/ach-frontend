import { IBase } from './base'

export interface IEvent extends IBase {
	event_id?: number
	date: string
	time?: string
	name: string
	isDeviation?: boolean
	videoPath?: string
	eventTimeCode?: string
	isAccepted?: boolean
}
