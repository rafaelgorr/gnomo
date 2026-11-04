import { SidebarProvider } from '@gnomo/uikit'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppSidebar } from './AppSidebar'
import { MobileSidebarTrigger } from './MobileSidebarTrigger'

export function Root() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-2">
          <MobileSidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
      {!import.meta.env.PROD ? <TanStackRouterDevtools /> : null}
    </>
  )
}
