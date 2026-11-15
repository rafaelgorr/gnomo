import { type Action, combineReducers, configureStore, type Reducer } from '@reduxjs/toolkit'

import entities, { type EntitiesState, initialState as entitiesInitialState } from './entities'
import feature, { type FeatureState, initialState as featureInitialState } from './feature'
import { errorMiddleware, printMiddleware } from './middlewares'
import ui, { initialState as uiInitialState, type UiState } from './ui'

export type StoreState = {
  entities: EntitiesState
  feature: FeatureState
  ui: UiState
}

type ReducerMap<K extends string> = Record<K, Reducer>
const reducers: ReducerMap<keyof StoreState> = {
  feature,
  entities,
  ui,
}

export const initialStoreState: StoreState = {
  entities: entitiesInitialState,
  feature: featureInitialState,
  ui: uiInitialState,
}

const rootReducer = <S extends StoreState, A extends Action>(state: S | undefined, action: A) => {
  if (action.type === 'RESET_STORE') {
    state = undefined
  }

  return combineReducers(reducers)(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([printMiddleware, errorMiddleware]),
  preloadedState: initialStoreState,
  devTools: import.meta.env.DEV,
})

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
