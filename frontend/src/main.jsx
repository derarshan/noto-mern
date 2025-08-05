import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes'
import { BrowserRouter } from "react-router"
import App from './App'
import { Toaster } from "react-hot-toast"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <ClerkProvider 
        appearance={{
          baseTheme: dark,
        }}
        publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </ClerkProvider>
  </StrictMode>
)
