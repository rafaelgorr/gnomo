import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { THEME_LOCAL_STORAGE_KEY } from './store/ui/theme'

const rootElement = document.getElementById('root')!

const theme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY)

if (theme) {
  rootElement.classList.add(theme)
}

if (!rootElement.innerHTML)
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
