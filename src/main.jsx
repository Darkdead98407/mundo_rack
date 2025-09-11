import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // 👈 Importa BrowserRouter aquí
import "./index.css"
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 👈 Envuelve <App /> con el router */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)