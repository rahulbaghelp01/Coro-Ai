 
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

type Options = {
  method?: string
  body?: unknown
}


//here the T is a generic we will provide it when we will really call the api function 
//what this api function do is it recives two things the path and the options 
//so we wont need to call the fetch everytime 
export async function api<T>(path: string, options: Options = {}): Promise<T> {
  const { method = 'GET', body } = options

  const response = await fetch(`${API_URL}/api${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message ?? 'Something went wrong')

  return data as T
}