import { selectors as entitiesSelectors } from '@/store/entities/kitchen'
import { kitchenActions, selectors as featureSelectors } from '@/store/feature/kitchen'
import { useAppSelector } from '@/store/hooks'

export const useConnector = (recipeId: string) => {
  const selectors = {
    fetching: useAppSelector(featureSelectors.isFeatureFetching('getRecipe')),
    recipe: useAppSelector((state) => entitiesSelectors.getRecipe(state, recipeId)),
  }

  const actions = {
    getRecipe: kitchenActions.getRecipe,
  }

  return {
    actions,
    selectors,
  }
}
