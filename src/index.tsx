import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (!root) {
  throw new Error('Root element not found: expected <div id="root"></div> in index.html')
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
