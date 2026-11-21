export type Chat = {
  id: string
  name: string
  isHost: boolean
  inviteToken: string
}

export interface ChatPanelProps {
  chatId: string
  addChat: (chat: Chat) => void
}

export type Message = {
  id: string
  chatId: string
  senderId: string | null
  senderType: 'user' | 'ai'
  text: string
  createdAt: string
} 