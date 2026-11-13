export function Component() {
  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Video Section */}
      <section className="flex-1 border-b border-gray-200">
      </section>

      {/* Chat Section */}
      <section className="flex flex-1 flex-col">
        <div className="flex-1"></div>

        <div className="border-t border-gray-200 bg-white p-4">
          <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <input
              type="text"
              placeholder="Message Coro AI..."
              className="flex-1 bg-transparent text-sm outline-none"
            />

            <button className="rounded-lg bg-[#2F3FC4] px-4 py-2 text-sm font-medium text-white">
              Send
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}