
import { PanelLeft, Users } from 'lucide-react'
import { useAppStore } from '../store/appStore'

export default function HomePageNavbar() {
  const isSidebarOpen = useAppStore(
    (state) => state.isSidebarOpen
  )

  const toggleSidebar = useAppStore(
    (state) => state.toggleSidebar
  )

  const isMemberListOpen = useAppStore(
    (state) => state.isMemberListOpen
  )

  const toggleMemberList = useAppStore(
    (state) => state.toggleMemberList
  )

  return (
    <header className="flex h-16 items-center justify-between px-5 bg-black text-white">

      {/* Sidebar toggle */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="rounded-lg p-2 transition hover:bg-white/10"
        >
          <PanelLeft size={20} />
        </button>
      )}

      {/* Member list toggle */}
      <button
        onClick={toggleMemberList}
        aria-label="Toggle members"
        aria-pressed={isMemberListOpen}
        className={`rounded-lg p-2 transition ${
          isMemberListOpen
            ? 'bg-white/20'
            : 'hover:bg-white/10'
        }`}
      >
        <Users size={20} />
      </button>

    </header>
  )
}
