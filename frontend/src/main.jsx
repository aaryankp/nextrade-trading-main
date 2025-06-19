import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import LoginProvider from './landing_page/signup/LoginContext.jsx'; // Import LoginProvider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <LoginProvider> {/* Wrap App with LoginProvider */}
        <App />
      </LoginProvider>
    </StrictMode>
  </BrowserRouter>
);