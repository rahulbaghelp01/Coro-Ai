import { createContext } from 'react'

//this file creates an context names as the auth context 
//and it determines some two types first the user types which we have used in the user means the use object will always look like this 
//and then the second things is the auth context value type which we use whilec reate the auth context it will always recives the object in that type 
//and it will always return the object in that type 

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


