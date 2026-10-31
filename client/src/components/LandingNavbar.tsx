import { Link } from 'react-router'
import Logo from './logo'
import Reveal from './Reveal'
import { ROUTES } from '../app/routes'

const links = [
  { label: 'About', to: ROUTES.about },
  { label: 'Features', to: ROUTES.features },
  { label: 'Learn', to: ROUTES.learn },
]

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <Reveal>
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/40 px-4 py-2.5 backdrop-blur-md md:px-6">
          <Link to={ROUTES.landing} aria-label="Coro AI home">
            <Logo />
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-6 md:flex">
              {links.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-sm font-semibold text-[#0b1030]/70 transition hover:text-[#0b1030]"
                >
                  {label}
                </Link>
              ))}
            </div>

            <Link
              to={ROUTES.auth}
              className="rounded-full bg-[#0f1b5c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#151c51] md:px-5"
            >
              Get started
            </Link>
          </div>
        </nav>
      </Reveal>
    </header>
  )
}