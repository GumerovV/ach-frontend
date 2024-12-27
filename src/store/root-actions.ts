import * as EventActions from './event/event.actions'
import * as ChecklistActions from './checklist/checklist.actions'
import * as ViolationActions from './violations/violations.actions'

export const rootActions = {
	...EventActions,
	...ChecklistActions,
	...ViolationActions,
}
