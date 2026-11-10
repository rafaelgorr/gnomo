import { Outlet } from '@tanstack/react-router'

import { AppSidebar } from '../components/AppSidebar/AppSidebar'
import { MobileSidebarTrigger } from './MobileSidebarTrigger'

export function Root() {
  return (
    <>
      <AppSidebar />
      <main className="flex flex-col p-2 w-dvw h-dvh">
        <MobileSidebarTrigger />
        <Outlet />
      </main>
      {/* {!import.meta.env.PROD ? <TanStackRouterDevtools /> : null} */}
    </>
  )
}
