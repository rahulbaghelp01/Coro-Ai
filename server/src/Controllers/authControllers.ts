import type { Request, Response } from 'express'
import { signupSchema } from '../validators/authSchema'
import * as authService from '../services/authService'

export async function signup(req: Request, res: Response) {
  const { name, email, password } = signupSchema.parse(req.body)
  const result = await authService.signup(name, email, password)
  res.status(201).json(result)
} 