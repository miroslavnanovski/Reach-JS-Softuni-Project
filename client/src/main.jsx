import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/userContext.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
)
