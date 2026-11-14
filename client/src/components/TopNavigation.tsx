import { Users , ToggleLeft } from "lucide-react"
import { useAppStore } from "../store/appStore"

export  default function TopNavigation(){

    const isChatPanelOpen = useAppStore((state) => state.isChatPanelOpen)


    return(
        <div>
            <button>
                <ToggleLeft/>
            </button>
            <button>
                <Users/>
            </button>
        </div>
    )
}