import { useAuth } from '../features/auth/useAuth'

export function Component() {
  const { user, logout } = useAuth()

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Hi {user?.name}, this is home</h1>
      <button
        onClick={logout}
        className="mt-4 rounded-full bg-[#0f1b5c] px-5 py-2 text-white"
      >
        Log out
      </button>
    </main>
  )
}