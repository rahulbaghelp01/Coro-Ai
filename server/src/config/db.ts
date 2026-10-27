import mongoose from 'mongoose'
import { env } from './env'

export async function connectDB() {
  await mongoose.connect(env.mongoUri)
  console.log('MongoDB connected')
}





//this file is for connecting to the data base it provides us a function for that  