import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import PageLoader from '../../components/PageLoader'
import { api } from '../../lib/api'
import { ROUTES } from '../../app/routes'

export function Component() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return
    let ignore = false

    async function join() {
      try {
        const { chat } = await api<{ chat: { id: string } }>(`/chats/join/${token}`, {
          method: 'POST',
        })
        if (!ignore) navigate(ROUTES.chat(chat.id), { replace: true })
      } catch (err) {
        if (!ignore) setError(err instanceof Error ? err.message : 'Could not join this chat')
      }
    }

    join()

    return () => {
      ignore = true
    }
  }, [token, navigate])

  if (!error) return <PageLoader />

  return (
    <main className="p-10 text-center">
      <p role="alert">{error}</p>
      <Link to={ROUTES.home}>Go to home</Link>
    </main>
  )
}