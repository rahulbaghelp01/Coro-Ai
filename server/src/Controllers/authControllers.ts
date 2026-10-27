import type { Request, Response } from 'express'
import { signupSchema,loginSchema } from '../validators/authSchema'
import * as authService from '../services/authService'

export async function signup(req: Request, res: Response) {
  const { name, email, password } = signupSchema.parse(req.body)
  const result = await authService.signup(name, email, password)
  res.status(201).json(result)
} 

export async function login(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body)
  const result = await authService.login(email, password)
  res.json(result)
}

/*so the first thing we have here is the 
we check the each thing with the signup schema if its not in this format then its not valid 
and then the zod error comes our error handler treats that
and then we have a result where we call the signup services function...
*/