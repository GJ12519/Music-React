import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/assets/css/index.less'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import App from '@/App';
import store from './store'
import theme from './assets/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);