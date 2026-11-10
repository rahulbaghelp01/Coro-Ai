import type { Server, Socket } from 'socket.io'
import { ZodError } from 'zod'
import { assertMember } from '../services/chatService'
import { createMessage } from '../services/MessageService'
import { sendMessageSchema } from '../validators/chatShema'
import { AppError } from '../utils/AppError'

type Ack = (response: { ok: boolean; error?: string }) => void

function toErrorMessage(err: unknown) {
  if (err instanceof ZodError) return err.issues[0].message
  if (err instanceof AppError) return err.message
    console.error(err)
  return 'Something went wrong'
}

export function registerChatHandlers(io: Server, socket: Socket) {
  socket.on('chat:join', async (chatId: string, ack?: Ack) => {
    try {
      await assertMember(String(chatId), socket.data.userId)
      await socket.join(String(chatId))
      ack?.({ ok: true })
    } catch (err) {
      ack?.({ ok: false, error: toErrorMessage(err) })
    }
  })

  socket.on('chat:send', async (payload: { chatId: string; text: string }, ack?: Ack) => {
    try {
      const { text } = sendMessageSchema.parse({ text: payload?.text })
      const message = await createMessage(String(payload?.chatId), socket.data.userId, text)

      io.to(message.chatId).emit('chat:message', message)
      ack?.({ ok: true })
    } catch (err) {
      ack?.({ ok: false, error: toErrorMessage(err) })
    }
  })
}