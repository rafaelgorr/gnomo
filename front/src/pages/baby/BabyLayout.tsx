import { Outlet } from '@tanstack/react-router'

export function BabyLayout() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  )
}
