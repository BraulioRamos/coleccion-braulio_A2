import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';

const theme= {
  palette: {
    mode: 'dark',
    primary: {
      main: '#2975dc',
    },
    secondary: {
      main: '#830e49',
    },
    error: {
      main: '#ff0b0b',
    },
    warning: {
      main: '#f97407',
    },
    success: {
      main: '#1db924',
    },
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}></ThemeProvider>
    <App />
  </React.StrictMode>
);

reportWebVitals();