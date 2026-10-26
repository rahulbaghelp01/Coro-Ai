import { Outlet } from 'react-router'
import Background from '../components/backGround'
import LandingNavbar from '../components/LandingNavbar'
import Footer from '../components/Footer'

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