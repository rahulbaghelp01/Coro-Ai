
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import type { Chat } from '../features/types/types'
import { api } from '../lib/api'
import PageLoader from './PageLoader'

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
  userId: string
}

export default function ChatPanel({
  chatId,
  addChat,
  userId,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [messageText, setMessageText] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const isHomePage = location.pathname === '/app'
  const isChatPage = location.pathname.startsWith('/app/chat/')

  // Create chat
  async function createChat(name: string) {
    try {
      setLoading(true)
      setError(null)

      const data = await api<{ chat: Chat }>('/chats', {
        method: 'POST',
        body: { name },
      })

      addChat(data.chat)
      setName('')
      navigate(`/app/chat/${data.chat.id}`)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create chat'
      )
    } finally {
      setLoading(false)
    }
  }

  // Fetch messages
  useEffect(() => {
    if (!isChatPage) {
      setMessages([])
      return
    }

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
  }, [chatId, isChatPage])

  // Send message
  async function handleSendMessage(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    const text = messageText.trim()

    if (!text || sending) return

    try {
      setSending(true)
      setError(null)

      const data = await api<{ message: Message }>(
        `/chats/${encodeURIComponent(chatId)}/messages`,
        {
          method: 'POST',
          body: { text },
        }
      )

      setMessages((prev) => [...prev, data.message])
      setMessageText('')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send message'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="flex h-full flex-col">

      {/* Home page */}
      {isHomePage && (
        <div>
          {error && <p>{error}</p>}

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

            <button type="submit" disabled={loading || !name.trim()}>
              {loading ? 'Creating...' : 'Create Chat'}
            </button>
          </form>
        </div>
      )}

      {/* Chat page */}
      {isChatPage && (
        <div className="flex h-full flex-col">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">

            {loading ? (
              <PageLoader />
            ) : messages.length === 0 ? (
              <p>No messages yet. Start a conversation!</p>
            ) : (
              messages.map((message) => {
                const isOwnMessage = message.senderId === userId

                return (
                  <div
                    key={message.id}
                    className={`mb-3 flex ${
                      isOwnMessage ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className="max-w-[75%] rounded-lg border p-3">
                      <p>{message.text}</p>

                      <small>
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                  </div>
                )
              })
            )}

          </div>

          {/* Error */}
          {error && <p>{error}</p>}

          {/* Message input */}
          <form
            onSubmit={handleSendMessage}
            className="flex gap-2"
          >
            <input
              className="flex-1 border p-2"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  e.currentTarget.form?.requestSubmit()
                }
              }}
              placeholder="Write a message..."
              disabled={loading || sending}
            />

            <button
              type="submit"
              disabled={loading || sending || !messageText.trim()}
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </form>

        </div>
      )}

    </main>
  )
}
