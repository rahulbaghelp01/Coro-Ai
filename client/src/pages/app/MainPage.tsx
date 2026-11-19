
import ChatWork from '../../components/ChatWorkplace'
import Sidebar from '../../components/ChatSidebar'
import TopNavigation from '../../components/TopNavigation'
import { useChats } from '../../hooks/useChats'
import BottomNavigation from '../../components/BottomNavigation'

export function Component() {
  const { addChat } = useChats()

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#090a10] text-white">

      <div className="fixed z-999">
        <Sidebar />
      </div>

      <TopNavigation />

      {/* Main workspace */}
      <div className="flex min-h-0 flex-1 w-full px-4 pb-20 pt-5 sm:px-6 sm:pt-8">

        <div className="min-h-0 min-w-0 flex-1 w-full">
          <ChatWork addChat={addChat} chatId={''} />
        </div>

      </div>

      <BottomNavigation />
    </div>
  )
}
