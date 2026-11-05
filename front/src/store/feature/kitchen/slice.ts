import { createSlice } from '@reduxjs/toolkit'

import { kitchenActions, prefix } from './actions'

export interface State {
  fetching: Partial<Record<keyof typeof kitchenActions, boolean>>
}

export const initialState: State = {
  fetching: {},
}

export const slice = createSlice({
  name: prefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    Object.entries(kitchenActions).forEach(([actionsKey, asyncFn]) => {
      const asyncFnName = actionsKey as keyof typeof kitchenActions
      Object.entries(asyncFn).forEach(([key, action]) => {
        if (key === 'pending') {
          builder.addCase(action, (state) => {
            state.fetching[asyncFnName] = true
          })
        }
        if (key === 'rejected' || key === 'fulfilled') {
          builder.addCase(action, (state) => {
            state.fetching[asyncFnName] = false
          })
        }
      })
    })
  },
})

const reducer = slice.reducer

export { reducer }
