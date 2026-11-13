
import { Outlet } from 'react-router'
import Sidebar from '../components/ChatSidebar'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
