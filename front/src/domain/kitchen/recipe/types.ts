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
  cookTime: string
  prepTime: string
  createdAt: string
  ingredients: Ingredient[]
  directions: RecipeStep[]
}

export type CreateRecipeInput = Pick<Recipe, 'name' | 'description' | 'cookTime' | 'prepTime'>
export type CreateIngredientInput = Omit<Ingredient, 'id'>
export type CreateRecipeStepInput = Omit<RecipeStep, 'id'>
