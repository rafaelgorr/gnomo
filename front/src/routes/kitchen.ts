import { Kitchen } from '@/pages/kitchen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/kitchen')({
  component: Kitchen,
})
