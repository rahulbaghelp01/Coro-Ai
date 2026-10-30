 

const API_URL = import.meta.env.API_URL

type Options = {
  method?: string
  body?: unknown
}

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