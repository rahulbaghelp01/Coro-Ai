import { useParams } from 'react-router'
import ChatWorkspace from '../../components/ChatWorkplace'

export function Component() {
  const { chatId } = useParams<{ chatId: string }>()

  if (!chatId) return null

  return <ChatWorkspace chatId={chatId} />
}