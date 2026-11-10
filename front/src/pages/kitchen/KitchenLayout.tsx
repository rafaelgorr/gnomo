import { Outlet } from '@tanstack/react-router'

import gnomeChef from '@/assets/gnome_chef.png'

export function KitchenLayout() {
  return (
    <div className="w-full h-full">
      <img
        src={gnomeChef}
        className="absolute opacity-15 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
      />
      <Outlet />
    </div>
  )
}
