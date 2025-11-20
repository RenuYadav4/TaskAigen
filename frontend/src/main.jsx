import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TodoProvider from './context/TodoContext.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import AuthProvider from './context/AuthContext.jsx';
import { CategoryProvider } from './context/CategoryContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <AuthProvider>
        <TodoProvider>
          <CategoryProvider>
            <App />
          </CategoryProvider>
          </TodoProvider>
        </AuthProvider>
        <CustomCursor />
    </BrowserRouter>
  </StrictMode>,
) 
