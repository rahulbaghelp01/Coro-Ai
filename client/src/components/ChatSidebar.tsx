
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Search, PanelRight } from 'lucide-react'

import Logo from './logo'
import ChatListSkeleton from './ChatListSkeleton'

import { useAppStore } from '../store/appStore'
import { api } from '../lib/api'
import type { Chat } from '../features/types/types'

interface ChatsResponse {
  chats: Chat[]
}

export default function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isSidebarOpen = useAppStore(
    (state) => state.isSidebarOpen
  )

  const toggleSidebar = useAppStore(
    (state) => state.toggleSidebar
  )

  // Fetch chats from backend
  useEffect(() => {
    async function fetchChats() {
      try {
        setLoading(true)
        setError(null)

        const data = await api<ChatsResponse>('/chats')

        setChats(data.chats)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to fetch chats'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [])

  // Filter chats based on search
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {isSidebarOpen && (
        <aside
          className="relative isolate flex h-screen w-72 shrink-0
          flex-col overflow-hidden border-r border-white/8
          text-white"
        >
          {/* Sidebar background */}
          <div className="absolute inset-0 -z-10 bg-[#171923]" />

          {/* Header */}
          <div className="flex h-18 shrink-0 items-center justify-between px-4">

            {isSidebarOpen && (
              <div className="flex h-auto w-auto p-2 px-2.5 items-center justify-center
              rounded-xl border border-white/8 bg-white/4
              shadow-sm">
                <Logo />
              </div>
            )}

            <button
              onClick={toggleSidebar}
              className="flex h-10 w-10 items-center justify-center
              rounded-xl border border-white/6 bg-white/4
              text-white/60 transition-all duration-200
              hover:border-white/10 hover:bg-white/10 hover:text-white"
              aria-label="Toggle sidebar"
            >
              <PanelRight size={20} />
            </button>
          </div>

          {isSidebarOpen && (
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 rounded-xl
              border border-white/8 bg-[#202330] px-3 py-2.5
              transition-all duration-200
              focus-within:border-[#5554c9]/60
              focus-within:bg-[#252939]
              focus-within:ring-2 focus-within:ring-[#5554c9]/10">

                <Search size={18} className="shrink-0 text-white/40" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chats..."
                  className="w-full bg-transparent text-sm font-medium
                  text-white outline-none
                  placeholder:text-white/35"
                />
              </div>
            </div>
          )}

          {isSidebarOpen && (
            <div className="flex-1 overflow-y-auto px-3 pb-4
            scrollbar-thin
            [scrollbar-color:#383d52_transparent]">

              <p className="mb-3 px-2 text-[11px] font-bold uppercase
              tracking-[0.15em] text-white/35">
                Your chats
              </p>

              <div className="flex flex-col gap-1">

                {/* Loading */}
                {loading && <ChatListSkeleton />}

                {/* Error */}
                {!loading && error && (
                  <p className="px-3 py-6 text-center text-sm text-red-400">
                    {error}
                  </p>
                )}

                {!loading && !error && filteredChats.map((chat) => (
                  <Link
                    key={chat.id}
                    to={`/app/chat/${chat.id}`}
                    className="group flex items-center gap-3 rounded-xl
                    border border-transparent px-3 py-3
                    text-sm font-medium text-white/65
                    transition-all duration-200
                    hover:border-white/5
                    hover:bg-white/6
                    hover:text-white"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full
                    bg-[#6865e8] shadow-[0_0_8px_#6865e855]
                    transition group-hover:bg-[#8986ff]
                    group-hover:shadow-[0_0_10px_#8986e8]" />

                    <span className="truncate">
                      {chat.name}
                    </span>
                  </Link>
                ))}

                {/* Empty state */}
                {!loading && !error && filteredChats.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm
                  font-medium text-white/35">
                    No chats found
                  </p>
                )}

              </div>
            </div>
          )}
        </aside>
      )}
    </>
  )
}
