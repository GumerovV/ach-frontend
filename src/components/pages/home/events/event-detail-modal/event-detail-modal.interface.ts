import { IEvent } from '../../../../../types/event'

export interface IEventDetailModal {
	isOpen: boolean
	onClose: () => void
	event: IEvent
}
