import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import type { Recipe } from '@/domain'
import { kitchenActions } from '@/store/feature/kitchen/actions'

export const adapter = createEntityAdapter<Recipe, string>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
  selectId: (recipe) => recipe.id,
})

export const initialState = {
  recipes: adapter.getInitialState(),
}

const slice = createSlice({
  name: 'entities/kitchen/recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(kitchenActions.getRecipes.fulfilled, (state, action) => {
        adapter.addMany(state.recipes, action.payload)
      })
      .addCase(kitchenActions.getRecipe.fulfilled, (state, action) => {
        adapter.addOne(state.recipes, action.payload)
      })
      .addCase(kitchenActions.updateRecipe.fulfilled, (state, action) => {
        adapter.upsertOne(state.recipes, action.payload)
      })
      .addCase(kitchenActions.createRecipe.fulfilled, (state, action) => {
        adapter.addOne(state.recipes, action.payload)
      })
      .addCase(kitchenActions.deleteRecipe.fulfilled, (state, action) => {
        adapter.removeOne(state.recipes, action.meta.arg.id)
      })
  },
})

const { reducer } = slice

export { reducer }
