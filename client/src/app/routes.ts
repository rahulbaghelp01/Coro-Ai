export const ROUTES = {
  landing: '/',
  about: '/about',
  features: '/features',
  learn: '/learn',
  auth: '/auth',
  home: '/app',
  chat: (id: string) => `/chat/${id}`,
  call: (id: string) => `/chat/${id}/call`,
  join: (token: string) => `/join/${token}`,
} as const

