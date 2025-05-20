import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.jsx'
import { ProductsContextProvider } from './contexts/ProductsContext.jsx';
import { UserContextProvider } from './contexts/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserContextProvider>
        <ProductsContextProvider>
          <App />
        </ProductsContextProvider>
      </UserContextProvider>
    </Router>
  </StrictMode>,
)
