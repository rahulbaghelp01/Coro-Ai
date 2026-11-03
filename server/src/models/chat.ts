import mongoose, { InferSchemaType } from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    inviteToken: {
      type: String,
      unique: true,
      default: () => crypto.randomUUID(),
    },
  },
  { timestamps: true }
)

export type ChatDoc = InferSchemaType<typeof chatSchema>
export const Chat = mongoose.model('Chat', chatSchema)