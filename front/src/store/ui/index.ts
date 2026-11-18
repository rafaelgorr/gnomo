import { combineReducers } from '@reduxjs/toolkit'

import { initialState as headerState, reducer as header } from './header'
import { initialState as themeState, reducer as theme } from './theme'

export const initialState = {
  header: headerState,
  theme: themeState,
}

export type UiState = typeof initialState

export default combineReducers({
  header,
  theme,
} satisfies Record<keyof UiState, unknown>)
