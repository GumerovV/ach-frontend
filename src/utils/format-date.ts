export function getDate(timestamp: string): string {
	const date = new Date(timestamp)
	return date.toISOString().split('T')[0] // Формат YYYY-MM-DD
}

export function getTime(timestamp: string): string {
	const date = new Date(timestamp)
	return date.toISOString().split('T')[1].split('.')[0] // Формат HH:MM:SS
}
