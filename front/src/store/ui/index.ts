import { combineReducers } from '@reduxjs/toolkit'

import { initialState as headerState, reducer as header } from './header'

export const initialState = {
  header: headerState,
}

export type UiState = typeof initialState

export default combineReducers({
  header,
} satisfies Record<keyof UiState, unknown>)
