import { Outlet, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { BackButton } from '@/components/BackButton'

import { AppSidebar } from '../components/AppSidebar/AppSidebar'
import { useConnector } from './connector'
import { MobileSidebarTrigger } from './MobileSidebarTrigger'

export function Root() {
  const router = useRouter()
  const { selectors } = useConnector()
  const { theme } = selectors

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    // if (theme === 'system') {
    //   const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    //     ? 'dark'
    //     : 'light'

    //   root.classList.add(systemTheme)
    //   return
    // }

    root.classList.add(theme)
  }, [theme])

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
