import { StrictMode } from 'react';
import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './index.css';
import '@i18n/i18n';

import App from './App';
import { store } from '@store';
import queryClient from '@data/queryClient';
import AppInitializer from './services/AppInitializer';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppInitializer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CssBaseline />
              <App />
            </LocalizationProvider>
          </AppInitializer>
        </QueryClientProvider>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>,
);
