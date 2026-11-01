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

//this is nothing just an object so we dont have to right the path every where we could just routes.about do smtg like this for each