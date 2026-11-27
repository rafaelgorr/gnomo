import { createFileRoute } from '@tanstack/react-router'

import { BabyHome } from '@/pages/baby/BabyHome'

export const Route = createFileRoute('/_baby/baby/')({
  component: BabyHome,
})
