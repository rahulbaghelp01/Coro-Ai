import { useEffect, useState } from "react"
import { api } from "../lib/api"
import MemberSkeleton from "./MemberSkeleton"

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
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!chatId) return

    setIsLoading(true)

    api<MembersResponse>(`/chats/${chatId}/members`)
      .then((data) => setMembers(data.members))
      .catch((err) => console.error("Failed to load members:", err))
      .finally(() => setIsLoading(false))
  }, [chatId])

  if (isLoading) return <MemberSkeleton />

  return (
    <ul>
      {members.map((member) => (
        <li key={member.id}>
          {member.name}
          {member.isHost && <span> (Host)</span>}
        </li>
      ))}
    </ul>
  )
}