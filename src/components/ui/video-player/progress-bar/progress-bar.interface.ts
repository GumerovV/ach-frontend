export interface IProgressBarProps {
	videoTime: number
	currentTime: number
	handleRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	isStream: boolean
}
