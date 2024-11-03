import { IEvent } from '../../../../../types/event'
import { IModal } from '../../../../../types/modal'

export interface IEventDetailModal extends IModal {
	event: IEvent
}
