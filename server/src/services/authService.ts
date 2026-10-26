import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { env } from '../config/env'
import { AppError } from '../utils/AppError'

function signToken(userId: string) {
  return jwt.sign({ sub: userId }, env.jwtSecret, { expiresIn: '7d' })
}

export async function signup(name: string, email: string, password: string) {
  const exists = await User.findOne({ email })
  if (exists) throw new AppError('Email already in use', 409)

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash })

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token: signToken(user.id),
  }
}