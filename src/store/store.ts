import { configureStore, createStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import websocketMiddleware from './middlewares/websocket.middleware'

const websocketUrl = process.env.REACT_APP_WS_URL

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({}).concat(
			websocketMiddleware(websocketUrl || 'ws://localhost:8080'),
		),
})

export type TypeRootState = ReturnType<typeof rootReducer>
