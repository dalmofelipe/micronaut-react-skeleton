import { createRoot } from 'react-dom/client'
import Router from './Router.tsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
