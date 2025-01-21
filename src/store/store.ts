import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import websocketMiddleware from './middlewares/websocket.middleware'
import { REACT_APP_WS_URL } from '../api/api.utils'

const websocketUrl = REACT_APP_WS_URL

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({}).concat(websocketMiddleware(websocketUrl)),
})

export type TypeRootState = ReturnType<typeof rootReducer>
