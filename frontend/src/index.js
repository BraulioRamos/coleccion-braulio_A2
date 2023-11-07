import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store/index';

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
    <CssBaseline/>
    <ThemeProvider theme={theme}></ThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();