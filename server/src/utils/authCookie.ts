import type { CookieOptions } from 'express'

export const AUTH_COOKIE = 'token'

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, same as the token
}