import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../lib/api'
import { socket } from '../lib/socket'
import type { Message } from '../features/types/types'

const PAGE_SIZE = 30

type Ack = { ok: boolean; error?: string }

// Put `older` first, then add anything from `current` that isn't already there
function mergeById(older: Message[], current: Message[]) {
  const ids = new Set(older.map((m) => m.id))
  return [...older, ...current.filter((m) => !ids.has(m.id))]
}

export function useChatMessages(chatId: string | undefined) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingOlder, setIsLoadingOlder] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [error, setError] = useState('')

  const openChatId = useRef(chatId)
  const loadingOlderRef = useRef(false)

  useEffect(() => {
    if (!chatId) return
    let ignore = false
    openChatId.current = chatId

    setMessages([])
    setHasMore(false)
    setError('')
    setIsLoading(true)

    function onMessage(message: Message) {
      if (message.chatId !== chatId) return
      setMessages((prev) =>
        prev.some((m) => m.id === message.id) ? prev : [...prev, message]
      )
    }

    function join() {
      socket.emit('chat:join', chatId, (res: Ack) => {
        if (!res.ok && !ignore) setError(res.error ?? 'Could not join the chat')
      })
    }

    // 1. listen and join the live room first
    socket.on('chat:message', onMessage)
    socket.on('connect', join) // rooms are lost on reconnect, so join again
    join()

    // 2. then load the newest page
    api<{ messages: Message[] }>(`/chats/${chatId}/messages`)
      .then((data) => {
        if (ignore) return
        setMessages((prev) => mergeById(data.messages, prev))
        setHasMore(data.messages.length === PAGE_SIZE)
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : 'Could not load messages')
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
      socket.off('chat:message', onMessage)
      socket.off('connect', join)
      socket.emit('chat:leave', chatId)
    }
  }, [chatId])

  const loadOlder = useCallback(async () => {
    if (!chatId || loadingOlderRef.current || !hasMore || messages.length === 0) return

    loadingOlderRef.current = true
    setIsLoadingOlder(true)

    try {
      const before = encodeURIComponent(messages[0].createdAt)
      const data = await api<{ messages: Message[] }>(
        `/chats/${chatId}/messages?before=${before}`
      )
      if (openChatId.current !== chatId) return // user switched chats meanwhile

      setMessages((prev) => mergeById(data.messages, prev))
      setHasMore(data.messages.length === PAGE_SIZE)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load older messages')
    } finally {
      loadingOlderRef.current = false
      setIsLoadingOlder(false)
    }
  }, [chatId, hasMore, messages])

  const sendMessage = useCallback(
    (text: string) =>
      new Promise<void>((resolve, reject) => {
        socket.emit('chat:send', { chatId, text }, (res: Ack) => {
          if (res.ok) resolve()
          else reject(new Error(res.error ?? 'Could not send the message'))
        })
      }),
    [chatId]
  )

  return { messages, isLoading, isLoadingOlder, hasMore, error, loadOlder, sendMessage }
}