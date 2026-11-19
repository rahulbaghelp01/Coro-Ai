
import ChatWork from '../../components/ChatWorkplace'
import Sidebar from '../../components/ChatSidebar'
import TopNavigation from '../../components/TopNavigation'
import { useChats } from '../../hooks/useChats'
import BottomNavigation from '../../components/BottomNavigation'

export function Component() {
  const { addChat } = useChats()

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#090a10] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-48 size-[28rem] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute -right-32 top-1/4 size-[24rem] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="fixed z-999">
        <Sidebar />
      </div>

      <TopNavigation />

      <div className="relative flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 pb-24 pt-5 sm:px-6 sm:pt-8">
        <header className="mb-6 w-full max-w-5xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-indigo-100">
            <span className="size-1.5 rounded-full bg-indigo-300" />
            YOUR CORO SPACE
          </div>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Make room for{' '}
            <span className="bg-linear-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              good conversations.
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/55 sm:text-base">
            Start a chat, bring your people together, and keep the conversation
            going.
          </p>
        </header>

        <div className="min-h-[280px] w-full max-w-5xl flex-1">
          <ChatWork addChat={addChat} chatId={''} />
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
