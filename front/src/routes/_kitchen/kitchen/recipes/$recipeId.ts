import { createFileRoute } from '@tanstack/react-router'

import { Recipe } from '@/pages/kitchen/Recipe/Recipe'

export const Route = createFileRoute('/_kitchen/kitchen/recipes/$recipeId')({
  component: Recipe,
})
