import { api } from '.'
import type { GetRecipesResponse } from './types'

export type GetRecipes = {
  input: void
  output: { id: string; name: string }[]
}

export const getRecipes = async (): Promise<GetRecipes['output']> => {
  const { data } = await api.get<GetRecipesResponse>('/api/kitchen/recipes')

  return data.recipes
}
