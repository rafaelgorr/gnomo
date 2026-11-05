import { api } from '.'

export type GetRecipes = {
  input: void
  output: { id: string; name: string }[]
}

export const getRecipes = async (): Promise<GetRecipes['output']> => {
  const { data } = await api.get<{ recipes: { id: string; name: string }[] }>('/api/recipes')

  return data.recipes
}
