
import { Link } from 'react-router'
import Logo from './logo'

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#151c51] text-white flex flex-col p-4">
      <Logo/>

      {/* New Chat */}
      <Link
        to="/app"
        className="w-full rounded-lg bg-[#365acb] px-4 py-3 text-sm hover:bg-[#456be0] transition"
      >
        + New Chat
      </Link>

      {/* Chat History */}
      <div className="mt-8 flex-1">
        <h2 className="text-xs uppercase text-gray-400 mb-4">
          Recent Chats
        </h2>

        <div className="flex flex-col gap-2">
          {/* Chat history will go here */}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 pt-4">
        <button className="w-full text-left text-sm text-gray-300 hover:text-white">
          Settings
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
