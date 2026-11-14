import { Video,MessageCircle,Share,Bell } from "lucide-react" 
import { useAppStore } from "../store/appStore"

export default function BottomNavigation() {


  return (
    <div>
      <button>
        <Video/>
      </button>

      <button>
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
