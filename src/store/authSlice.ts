import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    return JSON.parse(storedUser) as User;
  }

  return null;
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      if (email === 'user@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email: email,
          role: 'user',
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
      } else if (email === 'admin@example.com' && password === 'admin') {
        const mockAdmin: User = {
          id: '2',
          name: 'Admin User',
          email: email,
          role: 'admin',
        };

        localStorage.setItem('user', JSON.stringify(mockAdmin));
        return mockAdmin;
      } else {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email }: { name: string; email: string }, { rejectWithValue }) => {
    try {
      if (email === 'user@example.com') {
        return rejectWithValue('Email already in use');
      }

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user',
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkAuth.pending, state => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, state => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
