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

export type GetRecipe = {
  input: { id: string }
  output: Recipe
}

export type GetRecipeResponse =
  paths['/api/kitchen/recipes/{id}']['get']['responses']['200']['content']['application/json']

export const getRecipe = async (input: GetRecipe['input']): Promise<GetRecipe['output']> => {
  const { data } = await api.get<GetRecipeResponse>(`/api/kitchen/recipes/${input.id}`)

  return mapRecipeToDomain(data.recipe)
}
