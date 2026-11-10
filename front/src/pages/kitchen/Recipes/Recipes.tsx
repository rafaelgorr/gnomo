import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle, Skeleton } from '@gnomo/uikit'
import { useNavigate } from '@tanstack/react-router'
import { ChevronRightIcon } from 'lucide-react'
import { useEffect } from 'react'

import { Page } from '@/components/Page'
import { useAppDispatch } from '@/store/hooks'

import { useConnector } from './connector'

export function Recipes() {
  const navigate = useNavigate({ from: '/kitchen/recipes/' })

  const dispatch = useAppDispatch()
  const { actions, selectors } = useConnector()

  const { fetching, recipes } = selectors

  useEffect(() => {
    void dispatch(actions.getRecipes())
  }, [dispatch, actions])

  return (
    <Page>
      <Page.Title>COZINHA DO GNOMO</Page.Title>
      <Page.Content className="flex gap-2 flex-col pt-2">
        {fetching
          ? Array.from({ length: 15 }, (_, index) => index).map((index) => (
              <Skeleton key={`skeleton-${index}`} className="w-full h-16.5" />
            ))
          : recipes.map((recipe) => (
              <Item
                key={recipe.id}
                variant="outline"
                onClick={() =>
                  navigate({ to: '/kitchen/recipes/$recipeId', params: { recipeId: recipe.id } })
                }
              >
                <ItemContent>
                  <ItemTitle>{recipe.name}</ItemTitle>
                  <ItemDescription>{recipe.description}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon />
                </ItemActions>
              </Item>
            ))}
      </Page.Content>
    </Page>
  )
}
