import { mapRecipeToDomain, type Recipe } from '@/domain'
import type { paths } from '@/generated/contracts/kitchen'

import { api } from '..'

export type GetRecipesResponse =
  paths['/api/kitchen/recipes']['get']['responses']['200']['content']['application/json']

export type GetRecipes = {
  input: void
  output: Recipe[]
}

export const getRecipes = async (): Promise<GetRecipes['output']> => {
  const { data } = await api.get<GetRecipesResponse>('/api/kitchen/recipes')

  return data.recipes.map(mapRecipeToDomain)
}
