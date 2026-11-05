import * as kitchenApi from '@/api/kitchen'
import { createAsyncThunk } from '@reduxjs/toolkit'

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
} as const
