import { Outlet } from '@tanstack/react-router'

import { RecipeActionButtons } from '@/components/RecipeActionButtons'

export function KitchenLayout() {
  return (
    <div className="w-full h-full relative">
      <Outlet />
      <div className="z-10 absolute bottom-0 left-0 right-0 flex justify-center">
        <RecipeActionButtons />
      </div>
    </div>
  )
}
