import { Outlet } from 'react-router'
import Background from '../components/backGround'
import LandingNavbar from '../components/LandingNavbar'
import Footer from '../components/Footer'


//this is the public layout and the children is outlet which will be passed inside the  router.tsx
export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Background />
      <LandingNavbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}