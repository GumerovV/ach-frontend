import { IEvent } from '../../types/event.type'

export interface IEventsInitialState {
	event_uuid: string
	events: IEvent[]
}
