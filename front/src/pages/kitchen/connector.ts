import { selectors as entitiesSelectors } from '@/store/entities/kitchen'
import { selectors as featureSelectors, kitchenActions } from '@/store/feature/kitchen'
import { useAppSelector } from '@/store/hooks'

export const useConnector = () => {
  const selectors = {
    fetching: useAppSelector(featureSelectors.isFeatureFetching('getRecipes')),
    recipes: useAppSelector(entitiesSelectors.getRecipes),
  }

  const actions = {
    getRecipes: kitchenActions.getRecipes,
  }

  return {
    actions,
    selectors,
  }
}
