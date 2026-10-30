import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { AppError } from '../utils/AppError'
import { AUTH_COOKIE } from '../utils/authCookie'

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies[AUTH_COOKIE]
  if (!token) throw new AppError('Not logged in', 401)

  try {
    const payload = jwt.verify(token, env.jwtSecret) as { sub: string }
    req.userId = payload.sub
  } catch {
    throw new AppError('Session expired, please log in again', 401)
  }

  next()
}