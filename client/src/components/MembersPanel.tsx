import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { socket } from '../lib/socket'
import { useUserId } from '../hooks/useUserId'
import MemberSkeleton from './MemberSkeleton'

export interface Member {
  id: string
  name: string
  isHost: boolean
}

interface MembersResponse {
  hostId: string
  members: Member[]
}

export default function ListMember({ chatId }: { chatId?: string }) {
  const userId = useUserId()

  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  // Load the members when the chat changes
  useEffect(() => {
    if (!chatId) return
    let ignore = false

    setIsLoading(true)
    setError(null)
    setSelectedId(null)
    setConfirming(false)

    api<MembersResponse>(`/chats/${chatId}/members`)
      .then((data) => {
        if (!ignore) setMembers(data.members)
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : 'Failed to load members')
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [chatId])

  // Live update: someone was removed (by the host, from any window)
  useEffect(() => {
    if (!chatId) return

    function onMemberRemoved(event: { chatId: string; userId: string }) {
      if (event.chatId !== chatId) return
      setMembers((prev) => prev.filter((m) => m.id !== event.userId))
    }

    socket.on('chat:member-removed', onMemberRemoved)
    return () => {
      socket.off('chat:member-removed', onMemberRemoved)
    }
  }, [chatId])

  const iAmHost = members.some((m) => m.id === userId && m.isHost)

  function toggleRow(memberId: string) {
    setSelectedId((current) => (current === memberId ? null : memberId))
    setConfirming(false)
  }

  async function handleRemove(memberId: string) {
    if (!chatId) return

    try {
      setRemovingId(memberId)
      setError(null)
      await api<{ message: string }>(`/chats/${chatId}/members/${memberId}`, {
        method: 'DELETE',
      })
      setMembers((prev) => prev.filter((m) => m.id !== memberId))
      setSelectedId(null)
      setConfirming(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove member')
    } finally {
      setRemovingId(null)
    }
  }

  if (isLoading) return <MemberSkeleton />

  return (
    <div className="flex flex-col gap-1 p-2 text-white">
      <h3 className="px-2 pb-1 text-xs font-semibold sm:text-sm">
        Members ({members.length})
      </h3>

      {error && (
        <p role="alert" className="px-2 pb-1 text-xs text-rose-400">
          {error}
        </p>
      )}

      <ul className="flex flex-col gap-0.5">
        {members.map((member) => {
          const isMe = member.id === userId
          const canManage = iAmHost && !member.isHost && !isMe
          const isOpen = canManage && selectedId === member.id

          return (
            <li key={member.id}>
              <button
                type="button"
                disabled={!canManage}
                aria-expanded={canManage ? isOpen : undefined}
                onClick={() => toggleRow(member.id)}
                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition enabled:hover:bg-white/5"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#5554c9]/30 text-xs font-semibold">
                  {member.name.charAt(0).toUpperCase()}
                </span>

                <span className="min-w-0 flex-1 truncate text-xs sm:text-sm">
                  {member.name}
                </span>

                {member.isHost && (
                  <span className="rounded-md bg-[#5554c9]/25 px-1.5 py-0.5 text-[10px] font-semibold text-[#a9a7ff]">
                    Host
                  </span>
                )}
                {isMe && (
                  <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-white/60">
                    You
                  </span>
                )}
              </button>

              {isOpen && (
                <div className="mx-2 mb-1 rounded-lg border border-white/8 bg-[#202330] p-2">
                  {confirming ? (
                    <>
                      <p className="text-xs text-white/70">
                        Remove {member.name} from this chat?
                      </p>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setConfirming(false)}
                          className="rounded-md px-2.5 py-1.5 text-xs text-white/70 transition hover:bg-white/5"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(member.id)}
                          disabled={removingId === member.id}
                          className="rounded-md bg-rose-500/90 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-500 disabled:opacity-50"
                        >
                          {removingId === member.id ? 'Removing...' : 'Remove'}
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirming(true)}
                      className="text-xs font-semibold text-rose-400 transition hover:text-rose-300"
                    >
                      Remove from chat
                    </button>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}