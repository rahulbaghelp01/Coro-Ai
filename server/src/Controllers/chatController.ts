import type { Request, Response } from 'express'
import { createChatSchema } from '../validators/chatShema'
import * as chatService from '../services/chatService'

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