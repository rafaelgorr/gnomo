import {
  cn,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@gnomo/uikit'

import gnome from '@/assets/gnome.png'
import { Link } from '@tanstack/react-router'

const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Cozinha',
      url: '#',
      items: [
        {
          title: 'Receitas',
          url: '/kitchen',
        },
        {
          title: 'Ranking',
          url: '#',
        },
      ],
    },
  ],
} as const

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
        {data.navMain.map((item) => (
          <Collapsible key={item.title} defaultOpen>
            <SidebarGroup>
              <SidebarGroupLabel render={<CollapsibleTrigger />}>{item.title}</SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent className="ml-3 border-l">
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton onClick={isMobile ? toggleSidebar : undefined}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  )
}
