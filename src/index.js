import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';

import './styles/main.css'; 
import './styles/theme.css'; 
import './styles/mainLayout.css';
import './styles/homePage.css';
import './styles/filterButton.css';
import './styles/jsonReader.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

