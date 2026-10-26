import Logo from './logo'

const people = [
  { name: 'Aarav', initial: 'A', bg: 'from-[#3a4bd6] to-[#1b2470]', speaking: true },
  { name: 'Mia', initial: 'M', bg: 'from-[#7a5cf0] to-[#35208f]', speaking: false },
  { name: 'Sam', initial: 'S', bg: 'from-[#4a7fe0] to-[#1a3a82]', speaking: false },
]

export default function CallPreview() {
  return (
    <div
      role="img"
      aria-label="Example of a Coro AI call with three friends and the AI"
      className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl p-0.5"
    >
      {/* Spinning dark line: only the 2px edge is visible */}
     <div
        aria-hidden
         className="absolute -inset-full animate-spin bg-[conic-gradient(from_0deg,transparent_0_70%,#0b1030_100%)] [animation-duration:4s]"
    />

      {/* Card */}
      <div className="relative grid grid-cols-2 gap-2 rounded-[22px] bg-[#929ded] p-2">
        {people.map(({ name, initial, bg, speaking }) => (
          <div
            key={name}
            className={`relative flex aspect-4/3 items-center justify-center rounded-2xl bg-linear-to-br ${bg}`}
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold text-white md:size-14 md:text-xl">
              {initial}
            </span>
            <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white">
              {speaking && (
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
              )}
              {name}
            </span>
          </div>
        ))}

        {/* Coro AI tile */}
        <div className="flex aspect-4/3 items-center justify-center rounded-2xl bg-white/90">
          <Logo />
        </div>
      </div>
    </div>
  )
}