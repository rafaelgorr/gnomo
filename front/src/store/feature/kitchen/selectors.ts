import type { StoreState } from '@/store'
import { createSelector } from '@reduxjs/toolkit'
import type { State } from './slice'

export const isFetching = createSelector(
  (state: StoreState) => state.feature.kitchen.fetching,
  (fetching) => Object.values(fetching).some((ft) => ft),
)

export const isFeatureFetching = (name: keyof State['fetching']) =>
  createSelector(
    (state: StoreState) => state.feature.kitchen.fetching,
    (fetching) => fetching[name],
  )
