import ErrorBoundary from '@components/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import AlertSnackbar from '@components/AlertSnackbar';
import SuspenseComponents from './components/Suspense';
import AppRoutes from './router';
import './App.css';

function App() {
  const { t } = useTranslation();
  document.title = t('common.brandName');

  return (
    <ErrorBoundary>
      <AlertSnackbar />
      <SuspenseComponents />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
