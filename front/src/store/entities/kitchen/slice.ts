import { kitchenActions } from '@/store/feature/kitchen/actions'
import { type EntityState, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const adapter = createEntityAdapter<{ id: string; name: string }>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export type State = {
  recipes: EntityState<{ id: string; name: string }, string>
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
