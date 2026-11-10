import { createFileRoute } from '@tanstack/react-router'

import { Recipes } from '@/pages/kitchen'

export const Route = createFileRoute('/_kitchen/kitchen/recipes/')({
  component: Recipes,
})
