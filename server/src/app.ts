import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRouer'
import { errorHandler } from './middleware/errorhandler'

export const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/', (_req, res) => {
  res.send('Server is running perfectly!')
})

app.use('/api/auth', authRoutes)

app.use(errorHandler) // must stay last // must stay last



//holds the global logic of application router error handlers middlewares


