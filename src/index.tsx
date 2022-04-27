import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "bootstrap/dist/js/bootstrap";
import "./bootstrap/bootstrap.scss";
import "react-toastify/scss/main.scss"
import {AuthProvider} from "./context/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </React.StrictMode>
);
