 
import { useState } from 'react'
import { Link } from 'react-router'
import { Search, PanelRight } from 'lucide-react'

import Logo from './logo'
import Background from './backGround'
import { useAppStore } from '../store/appStore'

// Temporary mock data matching your backend response
const mockChats = [
  { id: 'chat-001', name: 'Project Coro AI', isHost: true },
  { id: 'chat-002', name: 'Development Team', isHost: false },
  { id: 'chat-003', name: 'Random Discussions', isHost: true },
  { id: 'chat-004', name: 'Learning Node.js', isHost: false },
  { id: 'chat-005', name: 'System Design', isHost: true },
  { id: 'chat-006', name: 'Friends Group', isHost: false },
]

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('')

  const isSidebarOpen = useAppStore(
    (state) => state.isSidebarOpen
  )

  const toggleSidebar = useAppStore(
    (state) => state.toggleSidebar
  )

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <aside
      className={`relative isolate flex h-screen shrink-0 flex-col
      overflow-hidden border-r border-white/30 text-[#000000eb]
      transition-all duration-300
      ${isSidebarOpen ? 'w-72' : 'w-19'}`}
    >
      {/* Gradient background */}
      <Background />

      {/* Header */}
      <div className="flex h-18 shrink-0 items-center justify-between px-4">

        {isSidebarOpen && <Logo />}

        <button
          onClick={toggleSidebar}
          className="flex h-10 w-10 shrink-0 items-center justify-center
          rounded-xl transition hover:bg-white/30"
          aria-label="Toggle sidebar"
        >
          <PanelRight size={20} />
        </button>
      </div>

      {/* Search */}
      {isSidebarOpen && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 rounded-xl
          border border-white/40 bg-white/30 px-3 py-2.5
          backdrop-blur-md transition focus-within:bg-white/50">

            <Search size={18} className="shrink-0 text-black/60" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full bg-transparent text-sm font-medium
              text-black outline-none placeholder:text-black/50"
            />
          </div>
        </div>
      )}

      {/* Chat history */}
      {isSidebarOpen && (
        <div className="flex-1 overflow-y-auto px-3 pb-4">

          <p className="mb-3 px-2 text-xs font-bold uppercase
          tracking-wider text-black/50">
            Your chats
          </p>

          <div className="flex flex-col gap-1">

            {filteredChats.map((chat) => (
              <Link
                key={chat.id}
                to={`/app/chat/${chat.id}`}
                className="flex items-center gap-3 rounded-xl
                px-3 py-3 text-sm font-semibold
                transition hover:bg-white/40"
              >
                <span className="h-2 w-2 shrink-0 rounded-full
                bg-[#2F3FC4]" />

                <span className="truncate">
                  {chat.name}
                </span>
              </Link>
            ))}

            {filteredChats.length === 0 && (
              <p className="px-3 py-6 text-center text-sm
              font-medium text-black/50">
                No chats found
              </p>
            )}

          </div>
        </div>
      )}
    </aside>
  )
}
