import mongoose, { InferSchemaType } from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    senderType: { type: String, enum: ['user', 'ai'], default: 'user' },
    text: { type: String, required: true, trim: true, maxlength: 4000 },
  },
  { timestamps: true }
)

messageSchema.index({ chat: 1, createdAt: -1 })

export type MessageDoc = InferSchemaType<typeof messageSchema>
export const Message = mongoose.model('Message', messageSchema)