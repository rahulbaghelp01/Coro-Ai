export type Chat = {
  id: string
  name: string
  isHost: boolean
  inviteToken: string
}

export interface ChatPanelProps {
  chatId: string
  addChat?: (chat: Chat) => void
}