import { selectors as entitiesSelectors } from '@/store/entities/kitchen'
import { kitchenActions, selectors as featureSelectors } from '@/store/feature/kitchen'
import { useAppSelector } from '@/store/hooks'

export const useConnector = (recipeId: string) => {
  const selectors = {
    fetching: useAppSelector(featureSelectors.isFeatureFetching('getRecipes')),
    recipe: useAppSelector((state) => entitiesSelectors.getRecipe(state, recipeId)),
  }

  const actions = {
    getRecipes: kitchenActions.getRecipes,
  }

  return {
    actions,
    selectors,
  }
}
