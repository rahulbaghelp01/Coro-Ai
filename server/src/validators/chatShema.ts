import { z } from 'zod'

export const createChatSchema = z.object({
  name: z.string().trim().min(1, 'Chat name is required').max(60, 'Chat name is too long'),
})


export const sendMessageSchema = z.object({
  text: z.string().trim().min(1, 'Message cannot be empty').max(4000, 'Message is too long'),
})