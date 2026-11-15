import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface State {
  title: string
}

export const initialState: State = {
  title: '',
}

export const slice = createSlice({
  name: 'ui/header',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
  },
})

const reducer = slice.reducer

export { reducer }
