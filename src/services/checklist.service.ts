import { axiosClassic } from '../api/axios'
import { ChecklistItemType } from '../store/checklist/checklist.interface'

export const ChecklistService = {
	async getChecklist(event_uuid: string) {
		const response = await axiosClassic.get<ChecklistItemType[]>(
			`/load/checklist?event_uuid=${event_uuid}`,
		)
		return response.data
	},
	async saveChecklist(event_uuid: string, checklist: ChecklistItemType[]) {
		const response = await axiosClassic.post(
			`/load/checklist?event_uuid=${event_uuid}`,
			{ checklist },
		)
		console.log('send', checklist)
		return response.data
	},
}
