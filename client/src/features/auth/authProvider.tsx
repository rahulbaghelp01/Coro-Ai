import { useEffect, useState, type ReactNode } from 'react'
import { api } from '../../lib/api'
import { AuthContext, type User } from './authContext'

//this is the auth provider it provides the auth so we can wrap our whole application with it so then every part of our code and every compenent will be able to 
//get access to these the user and loading state  login and signup functions and logout function as you can see we have used the api here   

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // On startup, ask the server who is logged in
  // so what it does is it sends an request to the server when page laods and then we have a loading state which gets converted to tru 
  // so then the loading stops 
  //if any error happens we keep the user state empty which means the user does not exists now we can simply check in other files 
  //does the user if he does not exista and they click get started button we will simply navigate them to the login page 
  // so i am guesssing our next step is to check if the user does exists and send them on the page needed 
  //but before that we will create an cool animation for our app   
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