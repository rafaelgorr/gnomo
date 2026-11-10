import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { AppSidebar } from '../components/AppSidebar/AppSidebar'
import { MobileSidebarTrigger } from './MobileSidebarTrigger'

export function Root() {
  return (
    <>
      <AppSidebar />
      <main className="flex flex-col p-2 w-screen h-screen md:w-full md:h-full">
        <MobileSidebarTrigger />
        <Outlet />
      </main>
      {!import.meta.env.PROD ? <TanStackRouterDevtools /> : null}
    </>
  )
}
