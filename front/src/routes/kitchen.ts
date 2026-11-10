import { createFileRoute } from '@tanstack/react-router'

import { Kitchen } from '@/pages/kitchen'

export const Route = createFileRoute('/kitchen')({
  component: Kitchen,
})
