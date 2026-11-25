
import { Users, PanelLeft } from "lucide-react"
import { useAppStore } from "../store/appStore"
import { useLocation } from "react-router"
import { useEffect } from "react"

export default function TopNavigation() {
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)
  const toggleMemberList = useAppStore((state) => state.toggleMemberList)
  
  const location = useLocation()
  const isHomePage = location.pathname === "/app"
  
  const buttonStyle =
    "group flex size-11 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#202330] text-white/45 transition-all duration-200 hover:border-white/10 hover:bg-[#292e40] hover:text-white active:scale-90"

  useEffect(()=>{
    
  },[])

  return (
    <nav className="flex w-full shrink-0 items-center justify-between border-b border-white/8 bg-[#171923]/95 px-4 py-3 backdrop-blur-xl sm:px-6">

      {/* Sidebar */}
      <button
        onClick={toggleSidebar}
        className={buttonStyle}
        aria-label="Toggle sidebar"
        title="Toggle sidebar"
      >
        <PanelLeft
          size={21}
          strokeWidth={1.9}
          className="transition-transform duration-200 group-hover:scale-110"
        />
      </button>

      {/* Members */}
      <button
        disabled={isHomePage}
        onClick={toggleMemberList}
        className={buttonStyle}
        aria-label="Show members"
        title="Show members"
      >
        <Users
          size={21}
          strokeWidth={1.9}
          className="transition-transform duration-200 group-hover:scale-110"
        />
      </button>

    </nav>
  )
}