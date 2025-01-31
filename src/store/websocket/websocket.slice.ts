import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WebSocketState } from './websocket.interface'

const initialState: WebSocketState = {
	isConnected: false,
}

const WebsocketSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {
		setConnection: (state, action: PayloadAction<boolean>) => {
			state.isConnected = action.payload
		},
		connect: state => {
			// Эта функция не требует payload, поэтому оставляем её пустой
		},
		disconnect: state => {
			// Также не требует payload
		},
		sendMessage: (state, action: PayloadAction<any>) => {},
	},
})

export const { setConnection, connect, disconnect, sendMessage } =
	WebsocketSlice.actions
export default WebsocketSlice.reducer
