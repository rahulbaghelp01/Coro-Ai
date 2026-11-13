
import { Outlet } from 'react-router'
 

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
   

      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}


/* so in here the first thing i need to do is this 
 i will need to create this layout to show 4 elements 
the first element would be the sidebar the sidebar logic (means when it should show or not)  should be handled by another component 
the component name will be listmember and toggle button the toggle button will decide when to show the 
when to show the side bar and when not 
means they will have a shared state
now the other one component will be a component 
which will hold two other components or pages which will be controlled by the 
two buttons first a chat button which will decide when to show the chat panel 
and the video call button which will decide when or when not to show the video call panel    

so in total 
the first slide bar is controlled b
*/