import { ButtonGroup } from '@gnomo/uikit'
import { useRouterState } from '@tanstack/react-router'
import { match } from 'ts-pattern'

import { RecipeDrawerForm } from '@/components/RecipeDrawerForm/RecipeDrawerForm'

import { DeleteAlertDialog } from './DeleteAlertDialog'

export function RecipeActionButtons() {
  const currentRouteId = useRouterState({
    select: (state) => state.matches.at(-1)?.fullPath,
  })

  return (
    <ButtonGroup>
      {match(currentRouteId)
        .with('/kitchen/recipes/', () => <RecipeDrawerForm />)
        .with('/kitchen/recipes/$recipeId', () => (
          <>
            <DeleteAlertDialog />
            <RecipeDrawerForm />
          </>
        ))
        .otherwise(() => null)}
    </ButtonGroup>
  )
}
