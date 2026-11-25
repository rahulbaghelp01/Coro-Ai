
import ChatWork from '../../components/ChatWorkplace'
import Sidebar from '../../components/ChatSidebar'
import TopNavigation from '../../components/TopNavigation'
import { useChats } from '../../hooks/useChats'
import BottomNavigation from '../../components/BottomNavigation'
import { useParams } from 'react-router'
import ShareModal from '../../components/ShareChat'
import { useAppStore } from '../../store/appStore'
import { useEffect } from 'react'
import ListMember from '../../components/MembersPanel'

export function Component() {
  const { addChat, chats } = useChats()
  const { chatId } = useParams()

  const setSidebarOpen = useAppStore(
    (state) => state.setSidebarOpen
  )

  const setMemberListOpen = useAppStore(
    (state) => state.setMemberListOpen
  )

  const isMemberListOpen = useAppStore(
    (state) => state.isMemberListOpen
  )

  useEffect(() => {
    setSidebarOpen(!chatId)
  }, [chatId, setSidebarOpen])

  useEffect(() => {
    setMemberListOpen(!chatId)
  }, [chatId, setMemberListOpen])

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#090a10] text-white">

      <div className="fixed z-999">
        <Sidebar />
      </div>

      <TopNavigation />

      {/* Main workspace */}
      <div className="flex min-h-0 w-full flex-1 px-4 pb-20 pt-5 sm:px-6 sm:pt-8">
        <div className="min-h-0 min-w-0 w-full flex-1">
          <ChatWork
            addChat={addChat}
            chatId={chatId!}
          />
        </div>
      </div>

      {/* Floating Members Panel */}
      {isMemberListOpen && chatId && (
        <div className="fixed right-4 top-20 z-50 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-[#151720] shadow-2xl">
          <ListMember chatId={chatId} />
        </div>
      )}

      <BottomNavigation />

      <ShareModal Chats={chats} />

    </div>
  )
}
