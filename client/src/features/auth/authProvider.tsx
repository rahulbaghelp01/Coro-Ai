import { useEffect, useState, type ReactNode } from 'react'
import { api } from '../../lib/api'
import { AuthContext, type User } from './authContext'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // On startup, ask the server who is logged in
  useEffect(() => {
    api<{ user: User }>('/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoaded(true))
  }, [])

  async function login(email: string, password: string) {
    const data = await api<{ user: User }>('/auth/login', { method: 'POST', body: { email, password } })
    setUser(data.user)
  }

  async function signup(name: string, email: string, password: string) {
    const data = await api<{ user: User }>('/auth/signup', { method: 'POST', body: { name, email, password } })
    setUser(data.user)
  }

  async function logout() {
    await api('/auth/logout', { method: 'POST' })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoaded, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}