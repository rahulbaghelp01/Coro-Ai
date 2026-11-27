
import { z } from 'zod'

export const callJoinSchema = z.object({
  chatId: z.string().min(1),
  micOn: z.boolean(),
  cameraOn: z.boolean(),
})

export const callSignalSchema = z.object({
  chatId: z.string().min(1),
  to: z.string().min(1),
  signal: z.object({}).passthrough(),
})

export const mediaStateSchema = z.object({
  chatId: z.string().min(1),
  micOn: z.boolean(),
  cameraOn: z.boolean(),
})
