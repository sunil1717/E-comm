import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import ShopcontextProvider from './Context/Shopcontext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ShopcontextProvider> 

      <App />
      </ShopcontextProvider> 
  </BrowserRouter>,
)
