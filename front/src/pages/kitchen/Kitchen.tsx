import { Spinner } from '@gnomo/uikit'
import { useEffect } from 'react'

import gnomeChef from '@/assets/gnome_chef.png'
import { Page } from '@/components/Page'
import { useAppDispatch } from '@/store/hooks'

import { useConnector } from './connector'

export function Kitchen() {
  const dispatch = useAppDispatch()
  const { actions, selectors } = useConnector()

  useEffect(() => {
    void dispatch(actions.getRecipes())
  }, [dispatch, actions])

  return (
    <Page backgroundPath={gnomeChef}>
      <Page.Title>COZINHA DO GNOMO</Page.Title>
      <div className="flex-1 flex justify-center">
        {selectors.fetching ? (
          <Spinner />
        ) : (
          selectors.recipes.map((recipe) => <p key={recipe.id}>{recipe.name}</p>)
        )}
      </div>
    </Page>
  )
}
