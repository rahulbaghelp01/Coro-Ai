import { useState, type FormEvent } from 'react'
import { useAuth } from '../features/auth/useAuth'

type Mode = 'login' | 'signup'

const inputClass =
  'w-full rounded-xl border border-white/50 bg-white/60 px-4 py-3 font-medium text-[#0b1030] outline-none placeholder:text-[#0b1030]/40 focus:border-[#2f3fc4]'

export function Component() {
  const { login, signup } = useAuth()

  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSignup = mode === 'signup'

  function switchMode() {
    setMode(isSignup ? 'login' : 'signup')
    setError('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (isSignup) await signup(name, email, password)
      else await login(email, password)
      // On success the GuestOnly guard sees the user and redirects to /app
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 pt-10 pb-16 text-[#0b1030]">
      <section className="rounded-3xl border border-white/40 bg-white/40 p-7 backdrop-blur-md">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isSignup && (
            <input
              className={inputClass}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            className={inputClass}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={inputClass}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p role="alert" className="text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full hover:cursor-po rounded-full bg-[#0f1b5c] py-3.5 font-semibold text-white transition hover:bg-[#151c51] disabled:opacity-60"
          >
            {isSubmitting ? 'Please wait...' : isSignup ? 'Sign up' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-medium">
          {isSignup ? 'Already have an account?' : 'New to Coro AI?'}{' '}
          <button
            type="button"
            onClick={switchMode}
            className="font-bold text-[#2f3fc4] hover:underline"
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </section>
    </main>
  )
}