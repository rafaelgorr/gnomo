import { SidebarProvider } from '@gnomo/uikit'
import { createRouter, RouterProvider } from '@tanstack/react-router'
// Import the generated route tree
import { Provider } from 'react-redux'

import { routeTree } from './routeTree.gen'
import { store } from './store'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </Provider>
  )
}
