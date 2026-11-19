
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import type { Chat, ChatPanelProps } from '../features/types/types'
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
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">

      {/* Home page */}
      {isHomePage && (
        <div className="flex h-full flex-col items-center justify-center overflow-y-auto px-3 py-5 text-center sm:px-5 sm:py-8">

          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Start a new chat
          </h2>

          <p className="mt-2 max-w-sm text-xs leading-5 text-white/50 sm:text-sm sm:leading-6">
            Give your conversation a name. You can invite people once it’s
            created.
          </p>

          <form
            className="mt-5 flex w-full max-w-md flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3"
            onSubmit={async (e) => {
              e.preventDefault()
              await createChat(name)
            }}
          >
            <input
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/35 focus:border-indigo-300/50 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Weekend plans"
              aria-label="Chat name"
            />

            <button
              className="shrink-0 rounded-lg bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-45 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
              type="submit"
              disabled={loading || !name.trim()}
            >
              {loading ? 'Creating...' : 'Create chat'}
            </button>
          </form>

          {error && (
            <p className="mt-3 text-xs text-rose-300 sm:text-sm">
              {error}
            </p>
          )}
        </div>
      )}

      {/* Chat page */}
      {isChatPage && (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">

          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain p-2 sm:space-y-3 sm:p-3">

            {loading ? (
              <PageLoader />
            ) : messages.length === 0 ? (
              <p className="py-5 text-center text-xs text-white/40 sm:py-6 sm:text-sm">
                No messages yet. Start a conversation!
              </p>
            ) : (
              messages.map((message) => {
                const isOwnMessage = message.senderId === userId

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isOwnMessage ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[90%] wrap-break-words rounded-xl px-3 py-2 sm:max-w-[75%] sm:rounded-2xl sm:px-4 sm:py-3 ${
                        isOwnMessage
                          ? 'rounded-br-sm bg-indigo-600 text-white'
                          : 'rounded-bl-sm border border-white/10 bg-[#292929] text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-xs leading-5 sm:text-sm sm:leading-6">
                        {message.text}
                      </p>

                      <small className="mt-1 block text-right text-[9px] text-white/50 sm:text-[10px]">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </small>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="shrink-0 px-2 py-1.5 text-xs text-rose-300 sm:px-3 sm:py-2 sm:text-sm">
              {error}
            </p>
          )}

          {/* Message input */}
          <form
            onSubmit={handleSendMessage}
            className="flex shrink-0 items-center gap-1.5 border-t border-white/10 bg-[#171717] p-2 sm:gap-2 sm:p-3"
          >
            <input
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#252525] px-2.5 py-2.5 text-xs text-white outline-none placeholder:text-white/40 focus:border-indigo-400/50 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
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
              className="shrink-0 rounded-lg bg-indigo-500 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-40 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
              disabled={loading || sending || !messageText.trim()}
            >
              {sending ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}

    </div>
  )
}
