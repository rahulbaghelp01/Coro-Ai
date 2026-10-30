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

export async function login(email: string, password: string) {
  const user = await User.findOne({ email }).select('+passwordHash')
  const valid = user && (await bcrypt.compare(password, user.passwordHash))
  if (!user || !valid) throw new AppError('Invalid email or password', 401)

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token: signToken(user.id),
  }
}

export async function getMe(userId: string) {
  const user = await User.findById(userId)
  if (!user) throw new AppError('User not found', 401)
  return { id: user.id, name: user.name, email: user.email }
}



//this is the service code it basically executes teh core logic  