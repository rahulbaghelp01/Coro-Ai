import { createContext } from 'react'

export type User = {
  id: string
  name: string
  email: string
}

export type AuthContextValue = {
  user: User | null
  isLoaded: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)


