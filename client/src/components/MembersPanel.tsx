import { useEffect, useState } from "react"
import { api } from "../lib/api"
import MemberSkeleton from "./MemberSkeleton"

// Adjust these fields to match what your GET /chats/:chatId/members backend returns
export interface Member {
  id: string
  name: string
  email: string
}

export default function ListMember({ chatId }: { chatId?: string }) {
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!chatId) return

    setIsLoading(true)
    api<{ members: Member[] }>(`/chats/${chatId}/members`)
      .then((data) => setMembers(data.members))
      .catch((err) => console.error("Failed to load members:", err))
      .finally(() => setIsLoading(false))
  }, [chatId])

  if (isLoading) return <MemberSkeleton/>

  return (
    <ul>
      {members.map((member) => (
        <li key={member.id}>{member.name}</li>
      ))}
    </ul>
  )
}
