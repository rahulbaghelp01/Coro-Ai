import { Users, ToggleLeft } from "lucide-react"
import { useAppStore } from "../store/appStore"

export default function TopNavigation() {
    const toggleChatPanel = useAppStore((state) => state.toggleChatPanel)
    const toggleMemberList = useAppStore((state) => state.toggleMemberList)

    return (
        <div>
            <button onClick={toggleChatPanel}>
                <ToggleLeft />
            </button>

            <button onClick={toggleMemberList}>
                <Users />
            </button>
        </div>
    )
}