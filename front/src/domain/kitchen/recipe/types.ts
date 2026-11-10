export type RecipeStep = {
  id: string
  index: number
  instruction: string
}

export type Ingredient = {
  id: string
  description: string
}

export type Recipe = {
  id: string
  name: string
  description?: string
  cookTime: number
  prepTime: number
  ingredients: Ingredient[]
  directions: RecipeStep[]
}

export type CreateRecipeRequest = Omit<Recipe, 'id'>
export type CreateIngredientRequest = Omit<Ingredient, 'id'>
export type CreateRecipeStepRequest = Omit<RecipeStep, 'id'>
