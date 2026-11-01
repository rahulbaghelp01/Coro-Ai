import { createBrowserRouter } from 'react-router'
import { GuestOnly, RequireAuth } from './guards'
import PublicLayout from '../layouts/PublicLayout'

//here we register all our routes if url matches any of these routes it will take them to this page 

export const router = createBrowserRouter([
  {
    element: <GuestOnly />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, lazy: () => import('../pages/LandingPage') },
          { path: 'about', lazy: () => import('../pages/AboutPage') },
          { path: 'features', lazy: () => import('../pages/FeaturePage') },
          { path: 'learn', lazy: () => import('../pages/LearnPage') },
          { path: 'auth', lazy: () => import('../pages/AuthPage') },
        ],
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [{ path: 'app', lazy: () => import('../pages/HomePage') }],
  },
])
//this is where we tell 