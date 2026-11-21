import { cn } from '@gnomo/uikit'
import { useLocation } from '@tanstack/react-router'
import type React from 'react'

import type { FileRoute } from '@/utils/routes'

import { GnomeImage } from '../GnomeImage'
import { Content } from './Content'
import { Title } from './Title'

interface PageProps extends React.ComponentProps<'div'> {
  loading?: boolean
}

export function Page(props: PageProps) {
  const { children, className, loading, ...divProps } = props

  const { pathname } = useLocation()

  const currentRoute = (pathname.split('/').at(1) || '/') as FileRoute

  return (
    <div {...divProps} className={cn('flex flex-col h-screen max-h-full relative', className)}>
      <GnomeImage
        gnome={currentRoute}
        className={loading ? 'animate-pulse opacity-60' : undefined}
      />
      {!loading ? children : null}
    </div>
  )
}

Page.Title = Title
Page.Content = Content
