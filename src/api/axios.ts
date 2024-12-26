import axios from 'axios'
import { REACT_APP_API_URL } from './api.utils'

export const API_URL = REACT_APP_API_URL

export const axiosClassic = axios.create({
	baseURL: API_URL,
})
