import { cn } from '@gnomo/uikit'
import type React from 'react'

import gnomeChef from '@/assets/gnome_chef.png'

const GNOME_TO_IMAGE = {
  chef: gnomeChef,
} as const

type ExtendedProps = Omit<React.ComponentProps<'img'>, 'src'>

export interface GnomeLoadingProps extends ExtendedProps {
  gnome: keyof typeof GNOME_TO_IMAGE
}

export function GnomeLoading(props: GnomeLoadingProps) {
  const { gnome, className, ...imgProps } = props
  return (
    <img
      {...imgProps}
      src={GNOME_TO_IMAGE[gnome]}
      className={cn(
        className,
        'opacity-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse',
      )}
    />
  )
}
