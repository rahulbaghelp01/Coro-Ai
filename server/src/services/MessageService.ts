import { Message } from '../models/Message'
import { assertMember } from './chatService'

function toDto(message: InstanceType<typeof Message>) {
  return {
    id: message.id,
    chatId: message.chat.toString(),
    senderId: message.sender?.toString() ?? null,
    senderType: message.senderType,
    text: message.text,
    createdAt: message.createdAt,
  }
}

export async function createMessage(chatId: string, userId: string, text: string) {
  await assertMember(chatId, userId)
  const message = await Message.create({ chat: chatId, sender: userId, text })
  return toDto(message)
}

export async function listMessages(chatId: string, userId: string, before?: string) {
  await assertMember(chatId, userId)

  const filter = before
    ? { chat: chatId, createdAt: { $lt: new Date(before) } }
    : { chat: chatId }

  const messages = await Message.find(filter).sort({ createdAt: -1 }).limit(30)

  return messages.reverse().map(toDto)
}