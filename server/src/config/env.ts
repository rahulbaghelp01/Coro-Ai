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


//here we store all the env variables so we dont need to import dotenv every where 
//it also provides us a required function which checks if the env is available or not 