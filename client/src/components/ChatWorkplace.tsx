
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
    <main className="flex h-full min-h-0 w-full flex-col gap-3 overflow-hidden p-3">

      {/* Panels */}
      <div className="flex min-h-0 flex-1 gap-3">

        {/* Chat Panel */}
        {isChatPanelOpen && (
          <section className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-2xl">
            <ChatPanel chatId={chatId} addChat={addChat} />
          </section>
        )}

        {/* Video Panel */}
        {isVoicePanelOpen && (
          <section className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-2xl">
            <VideoPanel chatId={"393"} />
          </section>
        )}

      </div>

    </main>
  )
}
