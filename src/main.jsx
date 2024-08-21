import { StrictMode } from 'react'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
