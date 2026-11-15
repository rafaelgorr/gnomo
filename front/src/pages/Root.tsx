import { Outlet, useRouter } from '@tanstack/react-router'

import { BackButton } from '@/components/BackButton'

import { AppSidebar } from '../components/AppSidebar/AppSidebar'
import { MobileSidebarTrigger } from './MobileSidebarTrigger'

export function Root() {
  const router = useRouter()
  return (
    <>
      <AppSidebar />
      <main className="flex flex-col p-2 w-dvw h-dvh pt-4">
        <div className="flex justify-between px-2 items-center absolute top-2 left-0 right-0">
          <BackButton onClick={() => router.history.back()} />
          <MobileSidebarTrigger />
        </div>
        <Outlet />
      </main>
      {/* {!import.meta.env.PROD ? <TanStackRouterDevtools /> : null} */}
    </>
  )
}
