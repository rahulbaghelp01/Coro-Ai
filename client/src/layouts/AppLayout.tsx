import { Outlet } from 'react-router'



//this is the app layout and the children is outlet which will be passed inside the  router.tsx
export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}