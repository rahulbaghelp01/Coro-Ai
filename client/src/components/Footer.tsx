import { Link } from 'react-router'
import { Mail, ArrowUpRight } from 'lucide-react'
import { ROUTES } from '../app/routes'

const product = [
  { label: 'Features', to: ROUTES.features },
  { label: 'About', to: ROUTES.about },
  { label: 'Learn', to: ROUTES.learn },
]

export default function Footer() {
  return (
<footer className="mt-24 bg-[#0a0a12] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-extrabold tracking-tight">Coro AI</p>
          <p className="mt-3 max-w-xs font-medium text-white/60">
            Chat and video with friends, and one shared AI in the room.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-bold text-white/90">Explore</p>
          <ul className="mt-4 space-y-3">
            {product.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="font-medium text-white/60 transition hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-bold text-white/90">Get in touch</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="mailto:you@example.com" // TODO: your email
                className="inline-flex items-center gap-2 font-medium text-white/60 transition hover:text-white"
              >
                <Mail size={16} />
                you@example.com
              </a>
            </li>
            <li>
              <Link
                to={ROUTES.auth}
                className="inline-flex items-center gap-1 font-medium text-white/60 transition hover:text-white"
              >
                Get started
                <ArrowUpRight size={16} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm font-medium text-white/50 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Coro AI</span>
          <span>Built by YOUR NAME</span> {/* TODO */}
        </div>
      </div>
    </footer>
  )
}