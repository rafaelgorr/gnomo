import { Button, useSidebar } from '@gnomo/uikit'
import { MenuIcon } from 'lucide-react'

export function MobileSidebarTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <div onClick={toggleSidebar} className="z-10 flex gap-1 items-center md:hidden">
      <Button size="icon-lg" variant="ghost">
        <MenuIcon />
      </Button>
      {/* <p className="text-lg font-bold">Menu</p> */}
    </div>
  )
}
