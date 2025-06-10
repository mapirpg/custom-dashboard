import { useAppDispatch, useAppSelector } from './useRedux';
import { auth } from '@/store';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (credentials: { email: string; password: string }) => {
    const res = await dispatch(auth.login(credentials));
    return res;
  };

  const logout = () => {
    dispatch(auth.logout());
    navigate('/auth/login');
  };

  const register = (userData: { name: string; email: string; password: string }) => {
    dispatch(auth.signup(userData));
  };

  const hasRole = (role: string | string[]) => {
    if (!user || !user.role) return false;

    if (Array.isArray(role)) {
      return role.some(r => user.role.includes(r));
    }

    return user.role.includes(role);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    hasRole,
  };
};
