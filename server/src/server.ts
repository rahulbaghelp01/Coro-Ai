import { createServer } from 'http'
import { app } from './app'
import { env } from './config/env'
import { connectDB } from './config/db'
import { initSocket } from './sockets'

async function start() {
  await connectDB()

  const httpServer = createServer(app)
  initSocket(httpServer)

  httpServer.listen(env.port, () => console.log(`Server on port ${env.port}`))
}

start()