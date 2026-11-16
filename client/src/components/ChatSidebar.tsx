
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Search, PanelRight } from 'lucide-react'

import Logo from './logo'
import Background from './backGround'
import ChatListSkeleton from './ChatListSkeleton'

import { useAppStore } from '../store/appStore'
import { api } from '../lib/api'

interface Chat {
  id: string
  name: string
  isHost: boolean
}

interface ChatsResponse {
  chats: Chat[]
}

type ChatPanelProps = {
  chatId: string;
};


export default function ChatPanel({ chatId }: ChatPanelProps) {
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

            {/* Loading */}
            {loading && <ChatListSkeleton />}

            {/* Error */}
            {!loading && error && (
              <p className="px-3 py-6 text-center text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Chat list */}
            {!loading && !error && filteredChats.map((chat) => (
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

            {/* Empty state */}
            {!loading && !error && filteredChats.length === 0 && (
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
