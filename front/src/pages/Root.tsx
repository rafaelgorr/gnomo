import { Outlet, useRouter } from '@tanstack/react-router'

import { BackButton } from '@/components/BackButton'

import { AppSidebar } from '../components/AppSidebar/AppSidebar'
import { MobileSidebarTrigger } from './MobileSidebarTrigger'

export function Root() {
  const router = useRouter()
  return (
    <>
      <AppSidebar />
      <main className="flex flex-col p-2 w-dvw h-dvh">
        <div className="flex justify-between">
          <BackButton onClick={() => router.history.back()} />
          <MobileSidebarTrigger />
        </div>
        <Outlet />
      </main>
      {/* {!import.meta.env.PROD ? <TanStackRouterDevtools /> : null} */}
    </>
  )
}
