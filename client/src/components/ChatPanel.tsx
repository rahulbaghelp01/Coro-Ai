import { useLayoutEffect, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import type { Chat, ChatPanelProps } from '../features/types/types'
import { api } from '../lib/api'
import { useUserId } from '../hooks/useUserId'
import { useChatMessages } from '../hooks/useChatMessages'

export default function ChatPanel({ chatId, addChat }: ChatPanelProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const userId = useUserId()

  const isHomePage = location.pathname === '/app'
  const isChatPage = location.pathname.startsWith('/app/chat/')

  // Messages, live updates, joining the room and sending all live in the hook
  const { messages, isLoading, isLoadingOlder, hasMore, error, loadOlder, sendMessage } =
    useChatMessages(isChatPage ? chatId : undefined)

  // Create chat form (home page)
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  // Message form (chat page)
  const [messageText, setMessageText] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  // Scroll handling
  const listRef = useRef<HTMLDivElement>(null)
  const stickToBottom = useRef(true)
  const prevScrollHeight = useRef<number | null>(null)

  // A different chat starts at the bottom again
  useEffect(() => {
    stickToBottom.current = true
  }, [chatId])

  // After the list changes: keep the user's place, or follow new messages
  useLayoutEffect(() => {
    const el = listRef.current
    if (!el) return

    if (prevScrollHeight.current !== null) {
      // older messages were added at the top, so keep the same messages in view
      el.scrollTop += el.scrollHeight - prevScrollHeight.current
      prevScrollHeight.current = null
    } else if (stickToBottom.current) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  // If loading older messages failed, forget the saved height
  useEffect(() => {
    if (!isLoadingOlder) prevScrollHeight.current = null
  }, [isLoadingOlder])

  function handleScroll() {
    const el = listRef.current
    if (!el) return

    // Are we near the bottom? Then new messages should scroll into view.
    stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80

    // Near the top? Ask for the 30 messages before the oldest one we have.
    if (el.scrollTop < 80 && hasMore && !isLoadingOlder && !isLoading) {
      prevScrollHeight.current = el.scrollHeight
      loadOlder()
    }
  }

  async function createChat(chatName: string) {
    try {
      setCreating(true)
      setCreateError(null)

      const data = await api<{ chat: Chat }>('/chats', {
        method: 'POST',
        body: { name: chatName },
      })

      addChat?.({ ...data.chat, isHost: true })
      setName('')
      navigate(`/app/chat/${data.chat.id}`)
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create chat')
    } finally {
      setCreating(false)
    }
  }

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const text = messageText.trim()
    if (!text || sending) return

    try {
      setSending(true)
      setSendError(null)
      stickToBottom.current = true // always follow my own message
      await sendMessage(text)
      setMessageText('')
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const visibleError = error ?? sendError

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-[#171923]">
      {/* Home page */}
      {isHomePage && (
        <div className="flex h-full flex-col items-center justify-center overflow-y-auto px-3 py-5 text-center sm:px-5 sm:py-8">
          <h2 className="text-lg font-semibold text-white sm:text-xl">Start a new chat</h2>

          <p className="mt-2 max-w-sm text-xs leading-5 text-white/45 sm:text-sm sm:leading-6">
            Give your conversation a name. You can invite people once it’s created.
          </p>

          <form
            className="mt-5 flex w-full max-w-md flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3"
            onSubmit={async (e) => {
              e.preventDefault()
              await createChat(name)
            }}
          >
            <input
              className="min-w-0 flex-1 rounded-lg border border-white/8 bg-[#202330] px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/35 transition focus:border-[#5554c9]/60 focus:ring-2 focus:ring-[#5554c9]/10 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Weekend plans"
              aria-label="Chat name"
            />

            <button
              className="shrink-0 rounded-lg bg-[#5554c9] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#6865e8] disabled:opacity-45 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
              type="submit"
              disabled={creating || !name.trim()}
            >
              {creating ? 'Creating...' : 'Create chat'}
            </button>
          </form>

          {createError && <p className="mt-3 text-xs text-rose-400 sm:text-sm">{createError}</p>}
        </div>
      )}

      {/* Chat page */}
      {isChatPage && (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {/* Messages */}
          <div
            ref={listRef}
            onScroll={handleScroll}
            className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain p-2 [overflow-anchor:none] sm:space-y-3 sm:p-3"
          >
            {isLoadingOlder && (
              <p className="py-1 text-center text-[10px] text-white/35">Loading older messages...</p>
            )}

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div
                  role="status"
                  aria-label="Loading messages"
                  className="size-6 animate-spin rounded-full border-2 border-white/20 border-t-[#5554c9]"
                />
              </div>
            ) : messages.length === 0 ? (
              <p className="py-5 text-center text-xs text-white/35 sm:py-6 sm:text-sm">
                No messages yet. Start a conversation!
              </p>
            ) : (
              messages.map((message) => {
                const isOwnMessage = message.senderId === userId

                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[90%] wrap-break-word rounded-xl px-3 py-2 sm:max-w-[75%] sm:rounded-2xl sm:px-4 sm:py-3 ${
                        isOwnMessage
                          ? 'rounded-br-sm bg-[#5554c9] text-white'
                          : 'rounded-bl-sm border border-white/[0.07] bg-[#252939] text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-xs leading-5 sm:text-sm sm:leading-6">
                        {message.text}
                      </p>

                      <small className="mt-1 block text-right text-[9px] text-white/45 sm:text-[10px]">
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
          {visibleError && (
            <p role="alert" className="shrink-0 px-2 py-1.5 text-xs text-rose-400 sm:px-3 sm:py-2 sm:text-sm">
              {visibleError}
            </p>
          )}

          {/* Message input */}
          <form
            onSubmit={handleSendMessage}
            className="flex shrink-0 items-center gap-1.5 border-t border-white/[0.07] bg-[#171923] p-2 sm:gap-2 sm:p-3"
          >
            <input
              className="min-w-0 flex-1 rounded-lg border border-white/8 bg-[#202330] px-2.5 py-2.5 text-xs text-white outline-none placeholder:text-white/35 transition focus:border-[#5554c9]/60 focus:bg-[#252939] focus:ring-2 focus:ring-[#5554c9]/10 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write a message..."
              disabled={isLoading}
            />

            <button
              type="submit"
              className="shrink-0 rounded-lg bg-[#5554c9] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#6865e8] disabled:opacity-40 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
              disabled={isLoading || sending || !messageText.trim()}
            >
              {sending ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}