import { createBrowserRouter } from 'react-router'
import { GuestOnly, RequireAuth } from './guards'
import PublicLayout from '../layouts/PublicLayout'
import AppLayout from '../layouts/AppLayout'

//here we register all our routes if url matches any of these routes it will take them to this page 

export const router = createBrowserRouter([
  {
    element: <GuestOnly />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, lazy: () => import('../pages/public/LandingPage') },
          { path: 'about', lazy: () => import('../pages/public/AboutPage') },
          { path: 'features', lazy: () => import('../pages/public/FeaturePage') },
          { path: 'learn', lazy: () => import('../pages/public/LearnPage') },
          { path: 'auth', lazy: () => import('../pages/public/AuthPage') },
        ],
      },
    ],
  },
  {
  element: <RequireAuth />,
  children: [
    {
      path: 'app',
      element: <AppLayout />,
      children: [
        { index: true, lazy: () => import('../pages/app/HomePage') },
        { path: 'chat/:chatId', lazy: () => import('../pages/app/ChatCallPage') },
      ],
    },
  ],
},
])
//this is where we tell 