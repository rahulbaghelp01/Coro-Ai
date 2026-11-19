
import { Video, MessageCircle, Share, Bell } from "lucide-react"
import { useAppStore } from "../store/appStore"

export default function BottomNavigation() {
  const toggleChatPanel = useAppStore((state) => state.toggleChatPanel)
  const toggleVoicePanel = useAppStore((state) => state.toggleVoicePanel)

  const buttonStyle =
    "flex items-center justify-center rounded-xl p-3 text-gray-400 transition-colors duration-200 hover:bg-gray-800 hover:text-white"

  return (
    <div className="
      fixed bottom-0 left-0 z-40
      flex w-full flex-row items-center justify-around
      border-t border-gray-800 bg-black p-3

      
    ">
      <button
        onClick={toggleVoicePanel}
        className={buttonStyle}
        aria-label="Video call"
      >
        <Video size={22} />
      </button>

      <button
        onClick={toggleChatPanel}
        className={buttonStyle}
        aria-label="Chat"
      >
        <MessageCircle size={22} />
      </button>

      <button
        className={buttonStyle}
        aria-label="Share"
      >
        <Share size={22} />
      </button>

      <button
        className={buttonStyle}
        aria-label="Notifications"
      >
        <Bell size={22} />
      </button>
    </div>
  )
}

