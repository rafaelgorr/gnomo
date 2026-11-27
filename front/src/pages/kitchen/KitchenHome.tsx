import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@gnomo/uikit'
import { useNavigate } from '@tanstack/react-router'
import { ChevronRightIcon } from 'lucide-react'

import gnomeChefPan from '@/assets/gnome_chef_pan.png'
import gnomeMason from '@/assets/gnome_mason.png'
import { Page } from '@/components/Page'
import type { FileRoutesByTo } from '@/routeTree.gen'

type KitchenItem = {
  type: 'recipes' | 'ranking' | 'products'
  title: string
  description: string
  path?: keyof FileRoutesByTo
  avatarSrc: string
}

const KITCHEN_ITEMS: KitchenItem[] = [
  {
    type: 'recipes',
    title: 'Receitas',
    description: 'As melhores receitas do gnomo',
    path: '/kitchen/recipes',
    avatarSrc: gnomeChefPan,
  },
  {
    type: 'ranking',
    title: 'Ranking',
    description: 'Em construção...',
    avatarSrc: gnomeMason,
  },
  {
    type: 'products',
    title: 'Produtos',
    description: 'Em construção...',
    avatarSrc: gnomeMason,
  },
]

export function KitchenHome() {
  const navigate = useNavigate({ from: '/kitchen/' })
  return (
    <Page>
      <Page.Title>Cozinha do gnomo</Page.Title>
      <Page.Content>
        <div className="flex flex-col gap-2">
          {KITCHEN_ITEMS.map((item) => (
            <Item
              key={item.type}
              onClick={() => (item.path ? navigate({ to: item.path }) : undefined)}
              variant="outline"
            >
              <ItemMedia>
                <Avatar className="size-16">
                  <AvatarImage src={item.avatarSrc} />
                  <AvatarFallback>GNOME</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon />
              </ItemActions>
            </Item>
          ))}
        </div>
      </Page.Content>
    </Page>
  )
}
