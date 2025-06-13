import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProductsContextProvider } from './contexts/ProductsContext.jsx';
import { UserContextProvider } from './contexts/UserContext.jsx';
import { AdminContextProvider } from './contexts/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <UserContextProvider>
          <ProductsContextProvider>
            <AdminContextProvider>
              <App />
            </AdminContextProvider>
          </ProductsContextProvider>
        </UserContextProvider>
      </GoogleOAuthProvider>;
    </Router>
  </StrictMode>,
)
