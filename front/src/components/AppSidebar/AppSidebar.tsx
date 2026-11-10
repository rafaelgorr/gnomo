import { cn, Sidebar, SidebarContent, SidebarTrigger, useSidebar } from '@gnomo/uikit'
import { Link } from '@tanstack/react-router'

import gnome from '@/assets/gnome.png'

import { AppSidebarContent } from './AppSidebarContent'

export function AppSidebar() {
  const { state, toggleSidebar, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Sidebar variant="inset" collapsible="icon" className="p-2 bg-accent">
      {isCollapsed ? <img src={gnome} className="size-10" /> : null}
      <div className="flex items-center">
        {!isCollapsed ? (
          <Link
            to="/"
            className="flex justify-start items-center gap-2"
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <img src={gnome} className="w-10 h-auto rounded-lg" />
            <p className="font-bold">Casa do gnomo</p>
          </Link>
        ) : null}
        <SidebarTrigger className={cn('hidden md:block', !isCollapsed ? 'ml-auto' : '')} />
      </div>
      <SidebarContent className={isCollapsed ? 'hidden' : ''}>
        <AppSidebarContent />
      </SidebarContent>
    </Sidebar>
  )
}
