import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import { enableMSW } from './libs/msw'

enableMSW().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
