import type { Socket } from 'socket.io'
import { assertMember } from '../services/chatService'

type Ack = (response: { ok: boolean; error?: string }) => void

export function registerChatHandlers(socket: Socket) {
  socket.on('chat:join', async (chatId: string, ack?: Ack) => {
    try {
      await assertMember(String(chatId), socket.data.userId)
      await socket.join(String(chatId))
      ack?.({ ok: true })
    } catch {
      ack?.({ ok: false, error: 'Chat not found' })
    }
  })
}