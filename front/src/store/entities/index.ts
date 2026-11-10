import { combineReducers } from '@reduxjs/toolkit'

import { initialState as kitchenState, reducer as kitchen } from './kitchen'

export const initialState = {
  kitchen: kitchenState,
}

export type EntitiesState = typeof initialState

export default combineReducers({ kitchen } satisfies Record<keyof EntitiesState, unknown>)
