
import { useEffect, useState } from 'react'
 
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
}

export default function ChatPanel({ chatId }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  

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
      {messages.length === 0 ? (
        <p>No messages yet. Start the conversation!</p>
      ) : (
        messages.map((message) => (
          <div key={message.id}>
            <p>{message.text}</p>
          </div>
        ))
      )}
    </main>
  )
}
