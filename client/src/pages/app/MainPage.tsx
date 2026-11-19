import { useParams } from 'react-router'
 
import { Sidebar } from 'lucide-react'

export function Component() {
  const { chatId } = useParams<{ chatId: string }>()

  if (!chatId) return null

  return <Sidebar/>
}