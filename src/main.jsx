import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { AppointmentProvider } from './contexts/AppointmentContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppointmentProvider>
        <App />
      </AppointmentProvider>
    </AuthProvider>
  </React.StrictMode>
);
