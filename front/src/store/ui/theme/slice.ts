import { createSlice } from '@reduxjs/toolkit'

export const THEME_LOCAL_STORAGE_KEY = '@gnomo/theme'

export interface State {
  theme: 'light' | 'dark'
}

export const initialState: State = {
  theme: (localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as State['theme']) ?? 'light',
}

export const slice = createSlice({
  name: 'ui/theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, state.theme)
    },
  },
})

const { reducer, actions } = slice

export { actions, reducer }
