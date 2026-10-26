import express from 'express'
import { env } from './config/env'
import { connectDB } from './config/db'

const app = express()
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Server is running perfectly!')
})

async function start() {
  await connectDB()
  app.listen(env.port, () => console.log(`Server on port ${env.port}`))
}

start()