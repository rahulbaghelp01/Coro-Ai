import 'dotenv/config'

const requiredEnv = (name: string) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is missing in .env`)
  }

  return value
}

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: requiredEnv('MONGO_URI'),
  jwtSecret: requiredEnv('JWT_SECRET'),
}