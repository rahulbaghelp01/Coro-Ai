import { useAuth } from "../features/auth/useAuth"

export function useUserId() {
  return useAuth().user?.id
}