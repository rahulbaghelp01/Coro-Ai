import { useEffect } from 'react'
import { Outlet } from 'react-router'
import


//this is the app layout and the children is outlet which will be passed inside the  router.tsx
export default function AppLayout() {

  useEffect(()=>{

  },[])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}