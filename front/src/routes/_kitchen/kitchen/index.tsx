import { createFileRoute } from '@tanstack/react-router'

import { KitchenHome } from '@/pages/kitchen'

export const Route = createFileRoute('/_kitchen/kitchen/')({
  component: KitchenHome,
})
