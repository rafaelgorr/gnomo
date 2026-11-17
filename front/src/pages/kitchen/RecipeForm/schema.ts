import * as z from 'zod'

export const recipeSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(2),
  description: z.string().optional(),
  cookTime: z.string().min(1).max(999).or(z.literal('')),
  prepTime: z.string().min(1).max(999).or(z.literal('')),
})

export type RecipeSchema = z.infer<typeof recipeSchema>
