import { Avatar, AvatarFallback, AvatarImage } from '@gnomo/uikit'
import { useNavigate } from '@tanstack/react-router'

import GnomeMessedUp from '@/assets/gnome_icon_messed_up.svg?react'
import { GNOME_TO_IMAGE } from '@/components/GnomeImage'
import { Page } from '@/components/Page'
import type { GnomeVariant } from '@/domain/gnome'
import type { FileRoutesByTo } from '@/routeTree.gen'

type DashboardItem = {
  type: GnomeVariant
  title: string
  path: keyof FileRoutesByTo
}

const GNOME_DASHBOARD_ITEMS: DashboardItem[] = [
  {
    type: 'kitchen',
    title: 'Cozinha do gnomo',
    path: '/kitchen',
  },
  {
    type: 'baby',
    title: 'Bebê do gnomo',
    path: '/baby',
  },
] as const

export function Home() {
  const navigate = useNavigate({ from: '/' })
  return (
    <Page>
      <Page.Title>CASA DO GNOMO</Page.Title>
      <Page.Content className="grid grid-cols-2 gap-2">
        {GNOME_DASHBOARD_ITEMS.map((item) => (
          <div
            key={item.type}
            className="col-span-1 p-3 flex flex-col items-center border rounded-lg gap-2"
            onClick={() => navigate({ to: item.path })}
          >
            <Avatar className="size-32">
              <AvatarImage src={GNOME_TO_IMAGE[item.type]} />
              <AvatarFallback>
                <GnomeMessedUp />
              </AvatarFallback>
            </Avatar>
            <p className="font-bold">{item.title}</p>
          </div>
        ))}
      </Page.Content>
    </Page>
  )
}
