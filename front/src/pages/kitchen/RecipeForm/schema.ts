import * as z from 'zod'

import type { Ingredient, Recipe, RecipeStep } from '@/domain'
import type { ZodShape } from '@/utils/zod'

type IngredientSchemaShape = Pick<Ingredient, 'description'>
type RecipeStepSchemaShape = Pick<RecipeStep, 'instruction'>
interface RecipeSchemaShape extends Pick<Recipe, 'name' | 'description' | 'prepTime' | 'cookTime'> {
  ingredients: IngredientSchemaShape[]
  directions: RecipeStepSchemaShape[]
}

const ingredientSchema = z.object({
  description: z.string().trim().min(3),
} satisfies ZodShape<IngredientSchemaShape>)

const recipeStepSchema = z.object({
  instruction: z.string().trim().min(3),
} satisfies ZodShape<RecipeStepSchemaShape>)

export const recipeSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  cookTime: z.string().min(1).max(999).or(z.literal('')),
  prepTime: z.string().min(1).max(999).or(z.literal('')),
  ingredients: ingredientSchema.array(),
  directions: recipeStepSchema.array(),
} satisfies ZodShape<RecipeSchemaShape>)

export type RecipeSchema = z.infer<typeof recipeSchema>
