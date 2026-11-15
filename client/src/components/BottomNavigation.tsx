import { Video,MessageCircle,Share,Bell } from "lucide-react" 
import { useAppStore } from "../store/appStore"

export default function BottomNavigation() {

  const toggleChatPanel = useAppStore((state)=>state.toggleChatPanel)
  const toggleVoicePanel = useAppStore((state)=>state.toggleVoicePanel)

  return (
    <div>
      <button onClick={toggleVoicePanel}>
        <Video/>
      </button>

      <button onClick={toggleChatPanel}>
        <MessageCircle/>
      </button>

      <button>
        <Share/>
      </button>

      <button>
        <Bell/> 
      </button>
    </div>
  )
}
