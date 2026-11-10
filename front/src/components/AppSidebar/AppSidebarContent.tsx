import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@gnomo/uikit'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'

const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Cozinha',
      url: '#',
      items: [
        {
          title: 'Receitas',
          url: '/kitchen/recipes',
        },
        {
          title: 'Ranking',
          url: '#',
        },
      ],
    },
  ],
} as const

export function AppSidebarContent() {
  const { toggleSidebar, isMobile } = useSidebar()

  const [open, setOpen] = useState(true)

  return data.navMain.map((item) => (
    <Collapsible key={item.title} open={open} onOpenChange={setOpen}>
      <SidebarGroup>
        <SidebarGroupLabel className="flex justify-between">
          <Label htmlFor="item-title">{item.title}</Label>
          <CollapsibleTrigger id="item-title" className="size-4">
            {open ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
          </CollapsibleTrigger>
        </SidebarGroupLabel>
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
  ))
}
