import { StrictMode } from 'react';
import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import '@i18n/i18n';

import App from './App';
import { store } from '@store';
import queryClient from '@data/queryClient';
import AppInitializer from './services/AppInitializer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppInitializer>
            <CssBaseline />
            <App />
          </AppInitializer>
        </QueryClientProvider>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>,
);
