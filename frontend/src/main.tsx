import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>

    <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>
    </Provider>  
  </StrictMode>,
)
