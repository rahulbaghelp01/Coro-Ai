import ChatWorkspace from '../../components/ChatWorkplace'
import Sidebar from '../../components/ChatSidebar'
import TopNavigation from '../../components/TopNavigation'
import BottomNavigation from '../../components/BottomNavigation'


export function Component() {
  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      {/* Sidebar - above the other components */}
      <Sidebar />

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavigation />

        <main className="flex-1 overflow-hidden">
          <ChatWorkspace chatId={"null"} />
        </main>

        <BottomNavigation />
      </div>
    </div>
  )
}