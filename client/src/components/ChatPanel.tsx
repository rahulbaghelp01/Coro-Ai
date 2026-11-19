
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import type { Chat,ChatPanelProps } from '../features/types/types'
import { api } from '../lib/api'
import PageLoader from './PageLoader'
import { useUserId } from '../hooks/useUserId'
 

interface Message {
  id: string
  chatId: string
  senderId: string | null
  senderType: string
  text: string
  createdAt: string
}



export default function ChatPanel({
  chatId,
  addChat,
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

  const userId = useUserId()

  // Create chat
  async function createChat(name: string) {
    try {
      setLoading(true)
      setError(null)

      const data = await api<{ chat: Chat }>('/chats', {
        method: 'POST',
        body: { name },
      })

      addChat?.(data.chat)
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
        <div className="flex h-full flex-col items-center justify-center px-5 py-10 text-center">
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-indigo-300/20 bg-indigo-400/10 text-indigo-200">
            <span className="text-2xl" aria-hidden="true">+</span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Start a new chat
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-white/50">
            Give your conversation a name. You can invite people once it’s
            created.
          </p>

          <form
            className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={async (e) => {
              e.preventDefault()
              await createChat(name)
            }}
          >
            <input
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-indigo-300/50 focus:ring-2 focus:ring-indigo-400/15"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Weekend plans"
              aria-label="Chat name"
            />

            <button
              className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-45"
              type="submit"
              disabled={loading || !name.trim()}
            >
              {loading ? 'Creating...' : 'Create chat'}
            </button>
          </form>
          {error && (
            <p className="mt-4 text-sm text-rose-300" role="alert">
              {error}
            </p>
          )}
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
