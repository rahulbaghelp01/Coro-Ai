import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { socket } from '../lib/socket'

// AppLayout stays mounted while the user moves between /app and /app/chat/:chatId,
// so the socket connects once here and every page and hook shares the same connection.
export default function AppLayout() {
  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}