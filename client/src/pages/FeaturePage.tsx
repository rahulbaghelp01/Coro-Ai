const features = [
  { title: 'Chats you host', text: 'Create a chat and share one link. Anyone with the link can join.' },
  { title: 'Camera or just voice', text: 'Each person chooses video, mic only, or text.' },
  { title: 'A shared AI', text: 'Type @coro and the whole group sees the answer.' },
  { title: 'Host controls', text: 'Hosts can mute, remove and pin people.' },
]

export function Component() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-24 text-[#0b1030]">
      <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">Features</h1>
      <div className="mt-10 grid gap-5">
        {features.map(({ title, text }) => (
          <div key={title} className="rounded-3xl border border-white/40 bg-white/50 p-6 backdrop-blur-md">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-2 font-medium text-[#0b1030]/70">{text}</p>
          </div>
        ))}
      </div>
    </main>
  )
}