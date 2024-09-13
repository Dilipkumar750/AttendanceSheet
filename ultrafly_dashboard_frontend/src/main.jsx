
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';

import "aos/dist/aos.css";
import { Provider } from 'react-redux';
import './index.css'
import { store } from './store/store'; 
;

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

