import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import type { Chat} from '../features/types/types' 
import { api } from '../lib/api'

interface Message {
  id: string
  chatId: string
  senderId: string | null
  senderType: string
  text: string
  createdAt: string
}

interface ChatPanelProps {
  chatId: string
  addChat: (chat: Chat) => void
}
 

export default function ChatPanel({ chatId,addChat }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const location = useLocation()
  const isHomePage = location.pathname === '/app'
  const isChatPage = location.pathname.startsWith('/app/chat/')

  const navigate = useNavigate()
  
 async function createChat(name: string) {
  const data = await api<{ chat: Chat }>('/chats', {
    method: 'POST',
    body: { name },
  })

  addChat(data.chat)
    navigate(`/app/chat/${data.chat.id}`)
  } 

  // Fetch chat messages
  useEffect(() => {
    let ignore = false

    async function fetchMessages() {
      try {
        setLoading(true)
        setError(null)

        const data = await api<{ messages: Message[] }>(
          `/chats/${encodeURIComponent(chatId)}/messages`
        )

        if (!ignore) {
          setMessages(data.messages)
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load messages'
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchMessages()

    return () => {
      ignore = true
    }
  }, [chatId])

  if (loading) {
    return <main>Loading messages...</main>
  }

  if (error) {
    return <main>{error}</main>
  }

  return (
    <main className="flex h-full flex-col">
      {isHomePage && (
    <form
      onSubmit={async (e) => {
      e.preventDefault()
      await createChat(name)
    }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Chat name"
      />
      <button type="submit">Create Chat</button>
      </form>
      )}
      {isChatPage && (
        <div></div>
      )}
    </main>
  )
}
