type LogoProps = {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="coro-icon-gradient" x1="5" y1="5" x2="35" y2="35">
            <stop offset="0%" stopColor="#0F1B5C" />
            <stop offset="48%" stopColor="#2F3FC4" />
            <stop offset="100%" stopColor="#5B3FC9" />
          </linearGradient>
        </defs>

        <path
          d="M29 11 A14 14 0 1 0 29 29"
          stroke="url(#coro-icon-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle
          cx="20"
          cy="20"
          r="4"
          fill="url(#coro-icon-gradient)"
        />
      </svg>

      <span className="bg-linear-to-r from-[#0F1B5C] via-[#2F3FC4] to-[#5B3FC9] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
        Coro AI
      </span>
    </div>
  )
}