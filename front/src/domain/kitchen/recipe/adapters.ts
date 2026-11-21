import type { components } from '@/generated/contracts/kitchen'

import type {
  CreateIngredientInput,
  CreateRecipeInput,
  CreateRecipeStepInput,
  Ingredient,
  Recipe,
  RecipeStep,
} from './types'

//#region API -> DOMAIN

const mapRecipeStepToDomain = (step: components['schemas']['RecipeStep']): RecipeStep => ({
  id: step.id,
  instruction: step.instruction,
})

const mapIngredientToDomain = (ingredient: components['schemas']['Ingredient']): Ingredient => ({
  id: ingredient.id,
  description: ingredient.description,
})

export const mapRecipeToDomain = (recipe: components['schemas']['RecipeOutput']): Recipe => ({
  id: recipe.id,
  name: recipe.name,
  description: recipe.description,
  cookTime: recipe.cook_time.toString(),
  prepTime: recipe.prep_time.toString(),
  createdAt: recipe.created_at,
  ingredients: recipe.ingredients.map(mapIngredientToDomain),
  directions: recipe.directions.map(mapRecipeStepToDomain),
})

//#region DOMAIN -> API

const mapRecipeStepToApi = (
  step: CreateRecipeStepInput,
): components['schemas']['CreateRecipeStepInput'] => ({
  instruction: step.instruction,
})

const mapIngredientToApi = (
  ingredient: CreateIngredientInput,
): components['schemas']['CreateIngredientInput'] => ({
  description: ingredient.description,
})

export type MapRecipeToApiParams = {
  recipe: CreateRecipeInput
  ingredients: CreateIngredientInput[]
  directions: CreateRecipeStepInput[]
}

export const mapCreateRecipeToApi = (
  params: MapRecipeToApiParams,
): components['schemas']['CreateRecipeRequest'] => {
  const { directions, ingredients, recipe } = params
  return {
    recipe: {
      name: recipe.name,
      description: recipe.description,
      cook_time: Number(recipe.cookTime),
      prep_time: Number(recipe.prepTime),
    },
    ingredients: ingredients.map(mapIngredientToApi),
    directions: directions.map(mapRecipeStepToApi),
  }
}
