import type { Server as HttpServer } from 'http'// exporting the type server from the http and then converting it into the httpserver as type  
import { Server } from 'socket.io' //importing the socket for the server
import * as cookie from 'cookie' // Changed to namespace import
import jwt from 'jsonwebtoken' // jwt
import { env } from '../config/env' // env for secret key 
import { AUTH_COOKIE } from '../utils/authCookie' // the auth cookie variable which holds the name of the cookie  
import { registerChatHandlers } from './chatHandlers' // registered caht handler function 

export function initSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: { origin: 'http://localhost:5173', credentials: true },
  }) //creating a function which will create an socket server which runs on the same port for socket 
  // allowsing cors too and cookies too  attaches Socket.IO to your existing HTTP server.

  // Runs once per connection, before it is accepted
  io.use((socket, next) => { // middleware 
    try {
      //   Updated to use parseCookie from the new module layout
      const cookies = cookie.parseCookie(socket.handshake.headers.cookie ?? '') // parsing the cookie which came 
      const token = cookies[AUTH_COOKIE] // getting the token from the cookie 
      if (!token) return next(new Error('Not logged in')) // if not avaiable throwing error // error handler will sent it to frontend

      const payload = jwt.verify(token, env.jwtSecret) as { sub: string } // getting the data from the token 
      socket.data.userId = payload.sub  // assinging the socket event the user id  
      next()
    } catch {
      next(new Error('Invalid session'))
    }
  })

  io.on('connection', (socket) => { 
    console.log('socket connected:', socket.data.userId)
    registerChatHandlers(io, socket)
  }) 

  return io
}
