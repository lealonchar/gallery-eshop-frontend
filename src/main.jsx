// src/index.jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './components/CartContext'; // Import CartProvider from the correct path

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* Wrap App component with CartProvider */}
      <App />
    </CartProvider>
  </StrictMode>,
);
