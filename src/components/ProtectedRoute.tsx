import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: ('user' | 'admin')[];
  redirectPath?: string;
}

// Protected route component that checks authentication and optional role-based access
const ProtectedRoute = ({
  allowedRoles = ['user', 'admin'],
  redirectPath = '/auth/login',
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectPath} replace />;
  }

  // If roles are specified and user doesn't have required role, redirect to unauthorized
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;
