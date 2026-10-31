import { RouterProvider } from 'react-router/dom'
import { router } from './app/router'
import AuthProvider from './features/auth/authProvider'


//finally wrapping up the whole application inside the auth provider 
export default function App() {
  return (
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
