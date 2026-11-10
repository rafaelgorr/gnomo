import { createFileRoute } from '@tanstack/react-router'

import { KitchenLayout } from '@/pages/kitchen/KitchenLayout'

export const Route = createFileRoute('/_kitchen')({
  component: KitchenLayout,
})
