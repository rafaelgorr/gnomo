import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@gnomo/uikit'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import React, { useState } from 'react'

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

const CollapsibleButtonIcon = (props: React.ComponentProps<typeof Button>) => {
  const { children, ...buttonProps } = props
  return (
    <Button {...buttonProps} size="icon" variant="ghost">
      {children}
    </Button>
  )
}

export function AppSidebarContent() {
  const { toggleSidebar, isMobile } = useSidebar()

  const [open, setOpen] = useState(true)

  return data.navMain.map((item) => (
    <Collapsible key={item.title} open={open} onOpenChange={setOpen}>
      <SidebarGroup>
        <SidebarGroupLabel
          render={
            <CollapsibleTrigger className="flex justify-between">
              {item.title}
              <CollapsibleButtonIcon>
                {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </CollapsibleButtonIcon>
            </CollapsibleTrigger>
          }
        />
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
