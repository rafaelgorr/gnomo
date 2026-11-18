import { Button, cn, Sidebar, SidebarContent, SidebarTrigger, useSidebar } from '@gnomo/uikit'
import { Link } from '@tanstack/react-router'
import { MoonIcon, SunIcon } from 'lucide-react'

import gnome from '@/assets/gnome.png'
import { useAppDispatch } from '@/store/hooks'

import { AppSidebarContent } from './AppSidebarContent'
import { useConnector } from './connector'

export function AppSidebar() {
  const dispatch = useAppDispatch()
  const { actions, selectors } = useConnector()

  const { state, toggleSidebar, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Sidebar variant="inset" side="right" collapsible="icon" className="p-2 bg-accent">
      {isCollapsed ? <img src={gnome} className="size-10" /> : null}
      <div className="flex items-center">
        {!isCollapsed ? (
          <div className="w-full flex items-center justify-between">
            <Link
              to="/"
              className="flex justify-center items-center gap-2"
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <img src={gnome} className="w-10 h-auto rounded-lg" />
              <p className="font-bold">Casa do gnomo</p>
            </Link>
            <Button size="icon-lg" variant="ghost" onClick={() => dispatch(actions.toggleTheme())}>
              {selectors.theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </div>
        ) : null}
        <SidebarTrigger className={cn('hidden md:block', !isCollapsed ? 'ml-auto' : '')} />
      </div>
      <SidebarContent className={isCollapsed ? 'hidden' : ''}>
        <AppSidebarContent />
      </SidebarContent>
    </Sidebar>
  )
}
