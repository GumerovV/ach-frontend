import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { rootActions } from '../store/root-actions'

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(rootActions, dispatch)
}
