import { createAsyncThunk } from '@reduxjs/toolkit'

import * as kitchenApi from '@/api/kitchen'

export const prefix = 'features/kitchen'

export const kitchenActions = {
  getRecipes: createAsyncThunk(`${prefix}/getRecipes`, async (_, thunkApi) => {
    try {
      const result = await kitchenApi.getRecipes()

      return result
    } catch (e) {
      return thunkApi.rejectWithValue(e)
    }
  }),
  getRecipe: createAsyncThunk(
    `${prefix}/getRecipe`,
    async (params: kitchenApi.GetRecipe['input'], thunkApi) => {
      try {
        const result = await kitchenApi.getRecipe(params)

        return result
      } catch (e) {
        return thunkApi.rejectWithValue(e)
      }
    },
  ),
} as const
