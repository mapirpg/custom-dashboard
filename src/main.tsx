import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import '@i18n/i18n';
import { store } from './store';
import AppInitializer from './services/AppInitializer';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

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
