
export function Component() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">

      <div className="flex flex-col items-center text-center">

        {/* Welcome */}
        <h1 className="text-3xl font-bold tracking-tight text-[#151c51]">
          Welcome to Coro AI
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
          Your space for conversations, collaboration and
          real-time communication.
        </p>

        {/* New Chat */}
        <button
          className="mt-8 rounded-xl bg-[#2F3FC4] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5B3FC9]"
        >
          + Start a new conversation
        </button>

      </div>

    </div>
  )
}
