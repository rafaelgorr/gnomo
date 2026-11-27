import { createFileRoute } from '@tanstack/react-router'

import { BabyLayout } from '@/pages/baby/BabyLayout'

export const Route = createFileRoute('/_baby')({
  component: BabyLayout,
})
