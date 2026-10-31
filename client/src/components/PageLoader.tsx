import Background from './backGround'

export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center"
    >
      <Background />

      <div className="relative size-20">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 animate-spin [animation-duration:1.2s]"
        >
          <defs>
            <linearGradient id="loader-gradient" x1="5" y1="5" x2="35" y2="35">
              <stop offset="0%" stopColor="#0F1B5C" />
              <stop offset="55%" stopColor="#2F3FC4" />
              <stop offset="100%" stopColor="#5B3FC9" />
            </linearGradient>
          </defs>
          <circle
            cx="20"
            cy="20"
            r="14"
            stroke="#0F1B5C"
            strokeOpacity="0.12"
            strokeWidth="3"
          />
          <path
            d="M20 6 A14 14 0 0 1 34 20"
            stroke="url(#loader-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <span className="absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#2F3FC4]" />
      </div>

      <span className="sr-only">Loading</span>
    </div>
  )
}