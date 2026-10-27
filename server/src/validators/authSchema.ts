import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().toLowerCase().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

//this is the zod error validation which we have used inside the
//inside the controllers 