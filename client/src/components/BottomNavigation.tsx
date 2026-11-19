
import { useLocation } from "react-router"
import { Video, MessageCircle, Share, Bell } from "lucide-react"
import { useAppStore } from "../store/appStore"

export default function BottomNavigation() {
  const toggleChatPanel = useAppStore((state) => state.toggleChatPanel)
  const toggleVoicePanel = useAppStore((state) => state.toggleVoicePanel)

  const isChatPanelOpen = useAppStore((state) => state.isChatPanelOpen)
  const isVoicePanelOpen = useAppStore((state) => state.isVoicePanelOpen)

  const location = useLocation()
  const isHomePage = location.pathname === "/app"

  const isChatToggleDisabled = isHomePage || !isVoicePanelOpen
  const isVideoToggleDisabled = isHomePage || !isChatPanelOpen
  const toggleSharedModal = useAppStore((state)=>state.toggleShareModal)

  const buttonStyle =
    "group relative flex size-11 items-center justify-center rounded-2xl border transition-all duration-200 active:scale-90 disabled:cursor-not-allowed disabled:opacity-25"

  const inactiveStyle =
    "border-transparent bg-white/[0.04] text-gray-400 hover:border-white/10 hover:bg-white/[0.09] hover:text-white"

  const activeStyle =
    "border-white/80 bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.12)]"

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-[#111111]/90 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">

      <div className="mx-auto flex max-w-md items-center justify-around">

        {/* Chat */}
        <button
          onClick={toggleChatPanel}
          disabled={isChatToggleDisabled}
          className={`${buttonStyle} ${
            isChatPanelOpen ? activeStyle : inactiveStyle
          }`}
          aria-label="Toggle chat panel"
          title="Chat"
        >
          <MessageCircle
            size={20}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </button>

        {/* Video */}
        <button
          onClick={toggleVoicePanel}
          disabled={isVideoToggleDisabled}
          className={`${buttonStyle} ${
            isVoicePanelOpen ? activeStyle : inactiveStyle
          }`}
          aria-label="Toggle video panel"
          title="Video"
        >
          <Video
            size={20}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </button>

        {/* Share */}
        <button
          disabled={isHomePage}
          onClick={toggleSharedModal}
          className={`${buttonStyle} ${inactiveStyle}`}
          aria-label="Share"
          title="Share"
        >
          <Share
            size={19}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </button>

        {/* Notifications */}
        <button
          className={`${buttonStyle} ${inactiveStyle}`}
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell
            size={19}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </button>

      </div>
    </nav>
  )
}
