import { createEntityAdapter, createSlice, type EntityState } from '@reduxjs/toolkit'

import type { Recipe } from '@/domain'
import { kitchenActions } from '@/store/feature/kitchen/actions'

export const adapter = createEntityAdapter<Recipe>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export type State = {
  recipes: EntityState<Recipe, string>
}

export const initialState: State = {
  recipes: adapter.getInitialState(),
}

const slice = createSlice({
  name: 'entities/kitchen',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(kitchenActions.getRecipes.fulfilled, (state, action) => {
      adapter.addMany(state.recipes, action.payload)
    })
  },
})

const { reducer } = slice

export { reducer }
