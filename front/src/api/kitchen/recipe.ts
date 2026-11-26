import {
  mapCreateRecipeToApi,
  type MapRecipeToApiParams,
  mapRecipeToDomain,
  type Recipe,
} from '@/domain'
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

export type PostRecipeRequest =
  paths['/api/kitchen/recipes']['post']['requestBody']['content']['application/json']

export type PostRecipeResponse =
  paths['/api/kitchen/recipes']['post']['responses']['200']['content']['application/json']

export type CreateRecipe = {
  input: MapRecipeToApiParams
  output: Recipe
}

export const createRecipe = async (
  input: CreateRecipe['input'],
): Promise<CreateRecipe['output']> => {
  const { data } = await api.post<PostRecipeResponse>(
    `/api/kitchen/recipes`,
    mapCreateRecipeToApi(input),
  )

  return mapRecipeToDomain(data.recipe)
}

export type PutRecipeRequest =
  paths['/api/kitchen/recipes/{id}']['put']['requestBody']['content']['application/json']

export type PutRecipeResponse =
  paths['/api/kitchen/recipes/{id}']['put']['responses']['200']['content']['application/json']

export type UpdateRecipe = {
  input: { id: string } & MapRecipeToApiParams
  output: Recipe
}

export const updateRecipe = async (
  input: UpdateRecipe['input'],
): Promise<UpdateRecipe['output']> => {
  const { id, ...body } = input
  const { data } = await api.put<PutRecipeResponse>(
    `/api/kitchen/recipes/${id}`,
    mapCreateRecipeToApi(body),
  )

  return mapRecipeToDomain(data.recipe)
}

export type DeleteRecipe = {
  input: { id: string }
  output: void
}

export const deleteRecipe = async (
  input: DeleteRecipe['input'],
): Promise<DeleteRecipe['output']> => {
  await api.delete<PutRecipeResponse>(`/api/kitchen/recipes/${input.id}`)
}
