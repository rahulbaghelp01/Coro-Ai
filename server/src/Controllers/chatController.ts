import type { Request, Response } from 'express'
import { createChatSchema } from '../validators/chatShema'
import * as chatService from '../services/chatService'
import { getIo } from '../sockets/io'

export async function createChat(req: Request, res: Response) {
  const { name } = createChatSchema.parse(req.body)
  const chat = await chatService.createChat(name, req.userId!)
  res.status(201).json({ chat })
}

export async function joinChat(req: Request, res: Response) {
  const chat = await chatService.joinChat(String(req.params.token), req.userId!)
  res.json({ chat })
}

export async function listMyChats(req: Request, res: Response) {
  const chats = await chatService.listMyChats(req.userId!)
  res.json({ chats })
}

export async function listMembers(req: Request, res: Response) {
  const data = await chatService.listMembers(String(req.params.chatId), req.userId!)
  res.json(data)
}


export async function removeMember(req: Request, res: Response) {
  const chatId = String(req.params.chatId)
  const targetId = String(req.params.userId)

  const { chatName } = await chatService.removeMember(chatId, req.userId!, targetId)

  const io = getIo()
  io.to(`user:${targetId}`).emit('chat:removed', {
    chatId,
    chatName,
    message: 'You were removed from this chat by the host',
  })
  io.in(`user:${targetId}`).socketsLeave(chatId)
  io.to(chatId).emit('chat:member-removed', { chatId, userId: targetId })

  res.json({ message: 'Member removed' })
}