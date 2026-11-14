
import ChatPanel from './ChatPanel'
import VideoPanel from './VideoCallPanel'
import MembersPanel from './MembersPanel'

import { useAppStore } from '../store/appStore'

type ChatWorkspaceProps = {
  chatId: string | null
}

export default function ChatWorkspace({ chatId }: ChatWorkspaceProps) {
  const activePanel = useAppStore((state) => state.activePanel)
  const isMemberListOpen = useAppStore((state) => state.isMemberListOpen)

  return (
    <div className="relative flex h-full min-h-0 w-full overflow-hidden">

      {/* Main Panel */}
      <div className="min-w-0 flex-1 overflow-hidden">
        {activePanel === 'video' ? (
          <VideoPanel chatId={chatId} />
        ) : (
          <ChatPanel chatId={chatId} />
        )}
      </div>

      {/* Floating Members Panel */}
      {isMemberListOpen && (
        <div className="absolute right-4 top-4 z-20 h-[calc(100%-2rem)] w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <MembersPanel chatId={chatId} />
        </div>
      )}

    </div>
  )
}
