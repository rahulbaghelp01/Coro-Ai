import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../features/auth/useAuth'
import PageLoader from '../components/PageLoader'
import { ROUTES } from './routes'

// Pages only for logged-in users (home, chats)
export function RequireAuth() {
  const { user, isLoaded } = useAuth()
  const location = useLocation()

  if (!isLoaded) return <PageLoader />

  // Remember where they were going, so we can send them back after login
  if (!user) return <Navigate to={ROUTES.auth} state={{ from: location }} replace />

  return <Outlet />
}

// Pages only for logged-out visitors (landing, auth)
export function GuestOnly() {
  const { user, isLoaded } = useAuth()

  if (!isLoaded) return <PageLoader />
  if (user) return <Navigate to={ROUTES.home} replace />

  return <Outlet />
}