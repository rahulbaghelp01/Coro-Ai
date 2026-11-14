import { useParams } from 'react-router'
import ChatWorkspace from '../../components/ChatWorkplace'

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>()

  if (!chatId) return null

  return <ChatWorkspace chatId={chatId} />
}