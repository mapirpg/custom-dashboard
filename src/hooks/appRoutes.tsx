import AuthLayout from '@/components/layout/AuthLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoginPage from '@/pages/public/LoginPage';
import RegisterPage from '@/pages/public/RegisterPage';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout'; // Assumindo que existe este layout
import DashboardPage from '@/pages/app/DashboardPage';

export const appRoutes = (isAuthenticated: boolean) => [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: isAuthenticated ? <Navigate to="/" replace /> : <LoginPage /> },
      {
        path: 'register',
        element: isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />,
      },
      { path: '*', element: <Navigate to="/auth/login" replace /> },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '', element: <DashboardPage /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={isAuthenticated ? '/' : '/auth/login'} replace />,
  },
];
