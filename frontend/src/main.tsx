import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import "./utils/appkit.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
</StrictMode>
);