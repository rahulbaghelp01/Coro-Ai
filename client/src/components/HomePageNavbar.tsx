
import { useState } from 'react'
import {
  PanelLeft,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
} from 'lucide-react'

type TopNavigationProps = {
  onToggleSidebar: () => void
}

export default function TopNavigation({
  onToggleSidebar,
}: TopNavigationProps) {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="relative z-30 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={21} />
        </button>

        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Coro <span className="text-blue-600">AI</span>
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">

        <button
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        <button
          className="relative rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
            aria-label="Profile menu"
          >
            R
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg">

              <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User size={17} />
                Profile
              </button>

              <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings size={17} />
                Settings
              </button>

              <div className="my-1 border-t border-gray-100" />

              <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut size={17} />
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  )
}
