import type { Server as HttpServer } from 'http'
import { Server } from 'socket.io'
import * as cookie from 'cookie' // Keeps the namespace import
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { AUTH_COOKIE } from '../utils/authCookie'

export function initSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: { origin: 'http://localhost:5173', credentials: true },
  })

  io.use((socket, next) => {
    try {
      // ✅ CHANGED: cookie.parse -> cookie.parseCookie
      const cookies = cookie.parseCookie(socket.handshake.headers.cookie ?? '')
      const token = cookies[AUTH_COOKIE]
      if (!token) return next(new Error('Not logged in'))

      const payload = jwt.verify(token, env.jwtSecret) as { sub: string }
      socket.data.userId = payload.sub
      next()
    } catch {
      next(new Error('Invalid session'))
    }
  })

  io.on('connection', (socket) => {
    console.log('socket connected:', socket.data.userId)
  })

  return io
}
