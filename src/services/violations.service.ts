import { axiosClassic } from '../api/axios'

export const ViolationsService = {
	async getViolations(event_uuid: string) {
		const response = await axiosClassic.get(
			`load/violations?event_uuid=${event_uuid}`,
		)
		return response.data
	},
}
