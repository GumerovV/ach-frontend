import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client'

const options: Partial<ManagerOptions & SocketOptions> = {
	forceNew: true,
	reconnectionAttempts: Infinity,
	timeout: 10000,
	transports: ['websocket'],
}

const socket: Socket = io('http://localhost:3001', options)

export default socket
