
import ChatPanel from './ChatPanel'
import VideoPanel from './VideoCallPanel'
import { useAppStore } from '../store/appStore'
import type { ChatPanelProps } from '../features/types/types'


export default function ChatWork({ chatId, addChat }: ChatPanelProps) {
  const isChatPanelOpen = useAppStore(
    (state) => state.isChatPanelOpen
  )

  const isVoicePanelOpen = useAppStore(
    (state) => state.isVoicePanelOpen
  )

  return (
    <main className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl bg-[#212121] p-2 text-[#ECECEC] sm:p-3">

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 md:flex-row md:gap-3">

        {/* Video Panel */}
        {isVoicePanelOpen && (
          <section className="min-h-0 min-w-0 flex-[1.5] overflow-hidden rounded-xl border border-[#3A3A3A] bg-[#171717]">
            <VideoPanel chatId={chatId} />
          </section>
        )}

        {/* Chat Panel */}
        {isChatPanelOpen && (
          <section className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl border border-[#3A3A3A] bg-[#171717]">
            <ChatPanel chatId={chatId} addChat={addChat} />
          </section>
        )}

      </div>
    </main>
  )
}
