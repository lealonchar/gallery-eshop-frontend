import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './components/CartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> 
      <App />
    </CartProvider>
  </StrictMode>,
);
