import { Outlet } from '@tanstack/react-router'

export function KitchenLayout() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  )
}
