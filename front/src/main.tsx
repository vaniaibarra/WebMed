import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { DireccionProvider } from './context/DireccionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DireccionProvider>
      <UserProvider>
         <App />
      </UserProvider>
    </DireccionProvider>
  </StrictMode>,
)
