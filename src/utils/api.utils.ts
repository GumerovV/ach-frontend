import { toastr } from 'react-redux-toastr'

export const errorCatch = (error: any): string =>
	error.response && error.response.data
		? typeof error.response.data.message === 'object'
			? error.response.data.message
			: error.response.data.message
		: error.message

export const ToastrError = (error: any, title: string = 'Error') => {
	const message = errorCatch(error)
	toastr.error(title, message)
}

export const ToasterSuccess = (title: string, message: string) => {
	toastr.success(title, message, { removeOnHover: true })
}

export const ToasterWarning = (title: string, message: string) => {
	toastr.warning(title, message, { removeOnHover: true })
}
