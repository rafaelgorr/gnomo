import { kitchenActions, selectors as featureSelectors } from '@/store/feature/kitchen'
import { useAppSelector } from '@/store/hooks'

export const useConnector = () => {
  const selectors = {
    creating: useAppSelector(featureSelectors.isFeatureFetching('createRecipe')),
    updating: useAppSelector(featureSelectors.isFeatureFetching('updateRecipe')),
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
