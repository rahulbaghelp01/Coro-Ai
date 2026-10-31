import { useContext } from 'react'
import { AuthContext } from './authContext'

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

//this is an use auth reusable function we will simply use it to instead of initializing the use context in every single file 
//we have little error handling to here to check if we are calling the use auth inside right place just in case  