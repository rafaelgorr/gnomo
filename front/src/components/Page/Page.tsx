import { cn } from '@gnomo/uikit'
import type React from 'react'
import { Title } from './Title'

type PageProps = React.ComponentProps<'div'> & {
  backgroundPath?: string
}

export function Page(props: PageProps) {
  const { children, className, backgroundPath, ...divProps } = props

  return (
    <div className={cn('flex flex-col flex-1 relative', className)} {...divProps}>
      {children}
      {backgroundPath ? (
        <img
          src={backgroundPath}
          className="absolute opacity-25 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        />
      ) : null}
    </div>
  )
}

Page.Title = Title
