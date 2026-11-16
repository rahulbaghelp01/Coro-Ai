
import { Outlet } from 'react-router'

import TopNavigation from '../components/TopNavigation'
import BottomNavigation from '../components/BottomNavigation'
import Sidebar from '../components/ChatSidebar'

import { useAppStore } from '../store/appStore'

export default function AppLayout() {
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)
  const toggleVoicePanel = useAppStore((state) => state.toggleVoicePanel)
  const toggleMemberList = useAppStore((state) => state.toggleMemberList)

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-black">

      {/* Top Navigation */}
      <TopNavigation onToggleSidebar={toggleSidebar} />

      {/* Main Application */}
      <div className="flex min-h-0 flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* Current Route */}
        <main className="min-w-0 flex-1 overflow-hidden">
          <Outlet />
        </main>

      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        onOpenMembers={toggleMemberList}
        onOpenVideo={toggleVoicePanel}
      />

    </div>
  )
}
