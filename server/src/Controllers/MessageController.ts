import type { Request, Response } from 'express'
import { sendMessageSchema } from '../validators/chatShema'
import * as messageService from '../services/MessageService'

export async function sendMessage(req: Request, res: Response) {
  const { text } = sendMessageSchema.parse(req.body)
  const message = await messageService.createMessage(String(req.params.chatId), req.userId!, text)
  res.status(201).json({ message })
}

export async function listMessages(req: Request, res: Response) {
  const before = typeof req.query.before === 'string' ? req.query.before : undefined
  const messages = await messageService.listMessages(String(req.params.chatId), req.userId!, before)
  res.json({ messages })
}