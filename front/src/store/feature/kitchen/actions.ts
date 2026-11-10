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
} as const
