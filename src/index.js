// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { register } from './serviceWorkerRegistration';

 
register();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


 register();

// For more details on reportWebVitals, see https://bit.ly/CRA-vitals
reportWebVitals();
