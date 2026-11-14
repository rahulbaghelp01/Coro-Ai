
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { api } from '../lib/api'

type Message = {
  id: string
  chatId: string
  senderId: string | null
  senderType: string
  text: string
  createdAt: string
}

type ChatPanelProps = {
  chatId: string | null
}

export default function ChatPanel({ chatId }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch messages whenever the chat changes
  useEffect(() => {
    if (!chatId) {
      setMessages([])
      return
    }

    let ignore = false

    async function loadMessages() {
      try {
        setIsLoading(true)
        setError(null)
        setMessages([])

        const data = await api<{ messages: Message[] }>(
          `/chats/${encodeURIComponent(chatId!)}/messages`
        )

        if (!ignore) {
          setMessages(data.messages)
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : 'Failed to load messages'
          )
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadMessages()

    return () => {
      ignore = true
    }
  }, [chatId])

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Send message
  async function handleSendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const trimmedText = text.trim()

    if (!chatId || !trimmedText || isSending) return

    try {
      setIsSending(true)
      setError(null)

      const data = await api<{ message: Message }>(
        `/chats/${encodeURIComponent(chatId)}/messages`,
        {
          method: 'POST',
          body: { text: trimmedText },
        }
      )

      setMessages((prev) => {
        if (prev.some((message) => message.id === data.message.id)) {
          return prev
        }

        return [...prev, data.message]
      })

      setText('')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send message'
      )
    } finally {
      setIsSending(false)
    }
  }

  if (!chatId) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-lg font-semibold">Welcome to Coro AI</h2>
        <p className="text-sm text-gray-500">
          Create or select a chat to start messaging.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col">

      {/* Header */}
      <div className="border-b p-4">
        <h2 className="font-semibold">Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4">

        {isLoading && (
          <p className="text-center text-sm text-gray-500">
            Loading messages...
          </p>
        )}

        {error && (
          <p className="mb-3 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {!isLoading && messages.length === 0 && !error && (
          <p className="text-center text-sm text-gray-500">
            No messages yet. Start the conversation!
          </p>
        )}

        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className="max-w-[80%] self-start rounded-xl bg-gray-100 px-4 py-2 text-gray-900"
            >
              {message.senderType === 'ai' && (
                <p className="mb-1 text-xs font-semibold text-blue-600">
                  Coro AI
                </p>
              )}

              <p className="wrap-break-word   text-sm">{message.text}</p>

              <p className="mt-1 text-right text-[10px] text-gray-500">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 border-t p-3"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          disabled={isSending}
          className="min-w-0 flex-1 rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={!text.trim() || isSending}
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </form>

    </div>
  )
}
