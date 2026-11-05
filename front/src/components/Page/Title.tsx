import { cn } from '@gnomo/uikit'
import type React from 'react'

type TitleProps = React.ComponentProps<'h1'>

export function Title(props: TitleProps) {
  const { children, className, ...h1Props } = props
  return (
    <h1 className={cn('font-bold w-full text-center', className)} {...h1Props}>
      {children}
    </h1>
  )
}
