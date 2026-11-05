import { combineReducers } from '@reduxjs/toolkit'
import { reducer as kitchen, initialState as kitchenState } from './kitchen'

export const initialState = {
  kitchen: kitchenState,
}

export type EntitiesState = typeof initialState

export default combineReducers({ kitchen } satisfies Record<keyof EntitiesState, unknown>)
