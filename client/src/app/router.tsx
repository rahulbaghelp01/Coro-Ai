import { createBrowserRouter } from 'react-router'
import PublicLayout from '../layouts/PublicLayout'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
  { index: true, lazy: () => import('../pages/LandingPage') },
  { path: 'about', lazy: () => import('../pages/AboutPage') },
  { path: 'features', lazy: () => import('../pages/FeaturePage') },
  { path: 'learn', lazy: () => import('../pages/LearnPage') },
    ],
  },
])