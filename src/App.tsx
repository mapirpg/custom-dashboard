import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from '@components/layout/MainLayout';
import AuthLayout from '@components/layout/AuthLayout';
import ProtectedRoute from '@components/ProtectedRoute';
import LoginPage from '@/pages/public/LoginPage';
import RegisterPage from '@/pages/public/RegisterPage';
import HomePage from '@/pages/app/HomePage';
import NotFoundPage from '@/pages/public/NotFoundPage';
import UnauthorizedPage from '@/pages/public/UnauthorizedPage';
import { useAuth } from '@hooks';
import ErrorBoundary from '@components/ErrorBoundary';
import { useTranslation } from 'react-i18next';
import AlertSnackbar from '@components/AlertSnackbar';
import SuspenseComponents from './components/Suspense';

function App() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  document.title = t('common.brandName');

  return (
    <ErrorBoundary>
      <AlertSnackbar />

      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="register"
            element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />}
          />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <SuspenseComponents />
    </ErrorBoundary>
  );
}

export default App;
