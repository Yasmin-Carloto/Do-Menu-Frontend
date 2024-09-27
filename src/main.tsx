import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TokenProvider } from './contexts/TokenContext.tsx'
import { RestaurantProvider } from './contexts/RestaurantContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <RestaurantProvider>
        <App />
      </RestaurantProvider>
    </TokenProvider>
  </StrictMode>,
)
