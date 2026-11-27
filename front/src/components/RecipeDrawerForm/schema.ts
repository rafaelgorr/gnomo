import { match, P } from 'ts-pattern'
import * as z from 'zod'

import type { Ingredient, Recipe, RecipeStep } from '@/domain'
import type { ZodShape } from '@/utils/zod'

const validatePositiveNumber = (ctx: z.core.ParsePayload<string>) => {
  const { value, issues } = ctx

  return match(Number(value))
    .with(NaN, () => {
      issues.push({
        code: 'custom',
        message: 'Deve ser um número',
        input: value,
      })

      return z.NEVER
    })
    .with(0, () => {
      issues.push({
        code: 'custom',
        message: 'Não deve ser 0',
        input: value,
      })

      return z.NEVER
    })
    .with(P.number.lt(0), () => {
      issues.push({
        code: 'custom',
        message: 'Deve ser positivo',
        input: value,
      })

      return z.NEVER
    })
    .with(P.number.gt(999), () => {
      issues.push({
        code: 'custom',
        message: 'Não maior que 999',
        input: value,
      })

      return z.NEVER
    })
    .with(P._, () => {})
    .exhaustive()
}

type IngredientSchemaShape = Pick<Ingredient, 'description'>
type RecipeStepSchemaShape = Pick<RecipeStep, 'instruction'>
interface RecipeSchemaShape extends Pick<Recipe, 'name' | 'description' | 'prepTime' | 'cookTime'> {
  ingredients: IngredientSchemaShape[]
  directions: RecipeStepSchemaShape[]
}

const ingredientSchema = z.object({
  description: z.string().trim().min(3, 'Ingrediente tem que ter no mínimo 3 letras'),
} satisfies ZodShape<IngredientSchemaShape>)

const recipeStepSchema = z.object({
  instruction: z.string().trim().min(3, 'Instrução tem que ter no mínimo 3 letras'),
} satisfies ZodShape<RecipeStepSchemaShape>)

export const recipeSchema = z.object({
  name: z.string().min(3, 'Nome tem que ter no mínimo 3 letras'),
  description: z.string().optional(),
  cookTime: z.string().check(validatePositiveNumber),
  prepTime: z.string().check(validatePositiveNumber),
  ingredients: ingredientSchema.array(),
  directions: recipeStepSchema.array(),
} satisfies ZodShape<RecipeSchemaShape>)

export type RecipeSchema = z.infer<typeof recipeSchema>
