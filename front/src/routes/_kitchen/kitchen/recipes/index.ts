import { createFileRoute } from '@tanstack/react-router'

import { Recipes } from '@/pages/kitchen/Recipes'

export const Route = createFileRoute('/_kitchen/kitchen/recipes/')({
  component: Recipes,
})
