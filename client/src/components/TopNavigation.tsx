
import { Users, ToggleLeft } from "lucide-react"
import { useAppStore } from "../store/appStore"

export default function TopNavigation() {
  const toggleChatPanel = useAppStore((state) => state.toggleChatPanel)
  const toggleMemberList = useAppStore((state) => state.toggleMemberList)

  const buttonStyle =
    "flex items-center justify-center rounded-xl p-3 text-gray-400 transition-colors duration-200 hover:bg-gray-800 hover:text-white"

  return (
    <div className="
      flex w-full items-center justify-between
      bg-black p-3
    ">
      <button
        onClick={toggleChatPanel}
        className={buttonStyle}
        aria-label="Toggle chat"
      >
        <ToggleLeft size={22} />
      </button>

      <button
        onClick={toggleMemberList}
        className={buttonStyle}
        aria-label="Show members"
      >
        <Users size={22} />
      </button>
    </div>
  )
}
