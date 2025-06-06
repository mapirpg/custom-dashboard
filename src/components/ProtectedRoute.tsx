import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useRedux';

interface ProtectedRouteProps {
  allowedRoles?: ('user' | 'admin')[];
  redirectPath?: string;
}

const ProtectedRoute = ({
  allowedRoles = ['user', 'admin'],
  redirectPath = '/auth/login',
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
