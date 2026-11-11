import { type StoreState } from '@/store'

import { adapter } from './slice'

const adapterSelectors = adapter.getSelectors<StoreState>((state) => state.entities.kitchen.recipes)

export const getRecipes = adapterSelectors.selectAll

export const getRecipe = adapterSelectors.selectById
