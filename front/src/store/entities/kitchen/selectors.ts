import type { StoreState } from '@/store'

import { adapter } from './slice'

export const getRecipes = adapter.getSelectors<StoreState>(
  (state) => state.entities.kitchen.recipes,
).selectAll
