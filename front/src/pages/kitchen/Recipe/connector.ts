import { selectors as entitiesSelectors } from '@/store/entities/kitchen'
import { kitchenActions, selectors as featureSelectors } from '@/store/feature/kitchen'
import { useAppSelector } from '@/store/hooks'

export const useConnector = (recipeId: string) => {
  const selectors = {
    fetching: useAppSelector(featureSelectors.isFeatureFetching('getRecipe')),
    deleting: useAppSelector(featureSelectors.isFeatureFetching('deleteRecipe')),
    recipe: useAppSelector((state) => entitiesSelectors.getRecipe(state, recipeId)),
  }

  const actions = {
    getRecipe: kitchenActions.getRecipe,
    deleteRecipe: kitchenActions.deleteRecipe,
  }

  return {
    actions,
    selectors,
  }
}
