const API_URL = 'http://localhost:3000'

type Options = {
  method?: string
  body?: unknown
}

export async function api<T>(path: string, options: Options = {}): Promise<T> {
  // 1. call fetch(`${API_URL}/api${path}`, { ... })
  const data = await fetch(`${API_URL}/`)
  // 2. parse the JSON
  // 3. if (!res.ok) throw new Error(data.message)
  // 4. return data as T
}