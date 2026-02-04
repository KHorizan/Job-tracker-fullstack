import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { AppliedProvider } from './context/AppliedContext.jsx';

const token = localStorage.getItem("token");

if (token) {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem("token");
    }
  } catch {
    localStorage.removeItem("token");
  }
}

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <AuthProvider>
    <AppliedProvider>
       <App />
    </AppliedProvider>
    </AuthProvider>
  </BrowserRouter>
);
