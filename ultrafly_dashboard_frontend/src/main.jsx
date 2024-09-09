
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';

import "aos/dist/aos.css";
import { Provider } from 'react-redux';
import './index.css'
import { store } from './store/store'; // replace with the path to your Redux store 
import ExcellApp from './ui/src/App';
import stores from './ui/src/redux/store/store';
import { ExcellData } from './Excell/components/excelTable';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
        <Provider store={stores}>
          <Routes>
            <Route path='/excel' element={<ExcellData />} />
          </Routes>
        </Provider>

      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

