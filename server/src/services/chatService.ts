import { isValidObjectId } from 'mongoose'
import { Chat } from '../models/chat'
import { AppError } from '../utils/AppError'

export async function createChat(name: string, userId: string) {
  const chat = await Chat.create({
    name,
    host: userId,
    members: [userId],
  })

  return {
    id: chat.id,
    name: chat.name,
    inviteToken: chat.inviteToken,
  }
}


export async function joinChat(inviteToken: string, userId: string) {
  const chat = await Chat.findOneAndUpdate(
    { inviteToken },
    { $addToSet: { members: userId } },
    { new: true }
  )
  if (!chat) throw new AppError('Invalid invite link', 404)

  return { id: chat.id, name: chat.name }
}


export async function listMyChats(userId: string) {
  const chats = await Chat.find({ members: userId }).sort({ updatedAt: -1 })

  return chats.map((chat) => ({
    id: chat.id,
    name: chat.name,
    isHost: chat.host.toString() === userId,
  }))
}


export async function assertMember(chatId: string, userId: string) {
  if (!isValidObjectId(chatId)) throw new AppError('Chat not found', 404)

  const chat = await Chat.findOne({ _id: chatId, members: userId })
  if (!chat) throw new AppError('Chat not found', 404)

  return chat
}

