/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// Define Auth Context state and actions
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Create the Auth Provider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if the user is already logged in (from localStorage or session)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Authentication check error:', err);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call to your authentication server
      if (email === 'user@example.com' && password === 'password') {
        // Mock successful login
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email: email,
          role: 'user',
        };

        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
      } else if (email === 'admin@example.com' && password === 'admin') {
        // Mock admin login
        const mockAdmin: User = {
          id: '2',
          name: 'Admin User',
          email: email,
          role: 'admin',
        };

        localStorage.setItem('user', JSON.stringify(mockAdmin));
        setUser(mockAdmin);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError((err as Error).message);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call to your registration endpoint
      // For demo purpose, we'll just simulate a successful registration
      if (email === 'user@example.com') {
        throw new Error('Email already in use');
      }

      // Mock successful registration
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user',
      };

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      setError((err as Error).message);
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Auth context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
