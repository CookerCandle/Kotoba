import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx'; 

import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/index.css'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HashRouter>
)
