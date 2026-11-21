import * as z from 'zod'

import type { Ingredient, Recipe, RecipeStep } from '@/domain'
import type { ZodShape } from '@/utils/zod'

const validatePositiveNumber = (ctx: z.core.ParsePayload<string>) => {
  const { value, issues } = ctx
  const valueNumber = Number(value)
  const isNaN = Number.isNaN(valueNumber)

  if (isNaN) {
    issues.push({
      code: 'custom',
      message: 'Deve ser um número',
      input: value,
    })

    return z.NEVER
  }

  if (valueNumber <= 0) {
    issues.push({
      code: 'custom',
      message: 'Deve ser um número positivo',
      input: value,
    })

    return z.NEVER
  }
}

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
  cookTime: z.string().check(validatePositiveNumber),
  prepTime: z.string().check(validatePositiveNumber),
  ingredients: ingredientSchema.array(),
  directions: recipeStepSchema.array(),
} satisfies ZodShape<RecipeSchemaShape>)

export type RecipeSchema = z.infer<typeof recipeSchema>
