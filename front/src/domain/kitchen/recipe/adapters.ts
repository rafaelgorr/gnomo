import type { components } from '@/generated/contracts/kitchen'

import type {
  CreateIngredientRequest,
  CreateRecipeRequest,
  CreateRecipeStepRequest,
  Ingredient,
  Recipe,
  RecipeStep,
} from './types'

//#region API -> DOMAIN

const mapRecipeStepToDomain = (step: components['schemas']['RecipeStep']): RecipeStep => ({
  id: step.id,
  index: step.index,
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
  cookTime: recipe.cook_time,
  prepTime: recipe.prep_time,
  ingredients: recipe.ingredients.map(mapIngredientToDomain),
  directions: recipe.directions.map(mapRecipeStepToDomain),
})

//#region DOMAIN -> API

const mapRecipeStepToApi = (
  step: CreateRecipeStepRequest,
): components['schemas']['CreateRecipeStepInput'] => ({
  index: step.index,
  instruction: step.instruction,
})

const mapIngredientToApi = (
  ingredient: CreateIngredientRequest,
): components['schemas']['CreateIngredientInput'] => ({
  description: ingredient.description,
})

type MapRecipeToApiParams = {
  recipe: CreateRecipeRequest
  ingredients: CreateIngredientRequest[]
  directions: CreateRecipeStepRequest[]
}

export const mapRecipeToApi = (
  params: MapRecipeToApiParams,
): components['schemas']['CreateRecipeRequest'] => {
  const { directions, ingredients, recipe } = params
  return {
    recipe: {
      name: recipe.name,
      description: recipe.description,
      cook_time: recipe.cookTime,
      prep_time: recipe.prepTime,
    },
    ingredients: ingredients.map(mapIngredientToApi),
    directions: directions.map(mapRecipeStepToApi),
  }
}
