import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../utils/AppError'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues[0].message })
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  console.error(err)
  res.status(500).json({ message: 'Something went wrong' })
}


/*this is the global error handler it runs when an error comes 
for now it checks error and finds out the reason if its a zod error or the 
app erorwe use the appError

*/ 