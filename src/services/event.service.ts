import { axiosClassic } from '../api/axios'
import { IEvent } from '../types/event.type'

export const EventService = {
	async getEvents(event_uuid: string) {
		const response = await axiosClassic.get<IEvent[]>(
			`/load/logs?event_uuid=${event_uuid}`,
		)
		return response.data
	},

	async getEventUUID() {
		const response = await axiosClassic.get<string>('/load/current_uuid')
		return response.data
	},
}
