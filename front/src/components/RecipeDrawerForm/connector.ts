import { selectors as entitiesSelectors } from '@/store/entities/kitchen'
import { kitchenActions, selectors as featureSelectors } from '@/store/feature/kitchen'
import { useAppSelector } from '@/store/hooks'

export const useConnector = (recipeId?: string) => {
  const selectors = {
    creating: useAppSelector(featureSelectors.isFeatureFetching('createRecipe')),
    updating: useAppSelector(featureSelectors.isFeatureFetching('updateRecipe')),
    recipe: useAppSelector((state) =>
      recipeId ? entitiesSelectors.getRecipe(state, recipeId) : undefined,
    ),
  }

  const actions = {
    createRecipe: kitchenActions.createRecipe,
    updateRecipe: kitchenActions.updateRecipe,
  }

  return {
    actions,
    selectors,
  }
}
