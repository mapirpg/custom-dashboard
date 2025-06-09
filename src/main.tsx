import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import '@i18n/i18n';
import { store } from './store';
import ReduxInitializer from './services/ReduxInitializer.tsx';
import { translationKeysVerify } from './utils/translatiosVerification.ts';
import env from './data/env.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

if (env.isDev) {
  translationKeysVerify();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReduxInitializer>
            <CssBaseline />
            <App />
          </ReduxInitializer>
        </QueryClientProvider>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>,
);
