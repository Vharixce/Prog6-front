import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../../../prog6-3/src/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
