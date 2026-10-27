import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRouer'
import { errorHandler } from './middleware/errorhandler'

export const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Server is running perfectly!')
})

app.use('/api/auth', authRoutes)

app.use(errorHandler) // must stay last



//holds the global logic of application router error handlers middlewares


