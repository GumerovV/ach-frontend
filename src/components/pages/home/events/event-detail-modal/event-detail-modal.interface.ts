import { IEvent } from '../../../../../types/event.type'
import { IModal } from '../../../../../types/modal.type'

export interface IEventDetailModal extends IModal {
	event: IEvent
}
