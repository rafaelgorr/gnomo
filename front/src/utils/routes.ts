import type { FileRoutesByPath } from '@tanstack/react-router'

type ExtractFileRoutes<T> = T extends `/_${infer Name}/${string}`
  ? Name
  : T extends '/'
    ? '/'
    : never

export type FileRoute = ExtractFileRoutes<keyof FileRoutesByPath>
