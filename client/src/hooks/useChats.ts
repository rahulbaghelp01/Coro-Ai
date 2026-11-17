
import { useCallback, useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { Chat } from '../features/types/types'



export function useChats() {
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    api<{ chats: Chat[] }>('/chats')
      .then((data) => {
        if (!ignore) setChats(data.chats)
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : 'Could not load chats')
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  const addChat = useCallback((chat: Chat) => {
    setChats((prev) => [chat, ...prev])
  }, [])

  const removeChat = useCallback((chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId))
  }, [])

  return { chats, isLoading, error, addChat, removeChat }
}

