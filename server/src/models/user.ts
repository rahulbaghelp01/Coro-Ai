import mongoose, { InferSchemaType } from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true }
)

export type UserDoc = InferSchemaType<typeof userSchema>
export const User = mongoose.model('User', userSchema)



/*here we are simply creating the user schema and then we are conencting the user model to the db using the mongoose connection*/