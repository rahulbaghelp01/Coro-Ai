import type { Server } from 'socket.io'

let io: Server | null = null

export function setIo(instance: Server) {
  io = instance
}

export function getIo() {
  if (!io) throw new Error('Socket.IO is not initialized')
  return io
}