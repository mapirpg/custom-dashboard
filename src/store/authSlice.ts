/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '@/data/interfaces/user';
import User from '@/data/models/user';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  user: IUser | null;
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

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: Partial<IUser>, { rejectWithValue }) => {
    if (!email || !password) {
      return rejectWithValue('Email and password are required');
    }

    try {
      const res = await User.signIn(email, password);

      if (!res) {
        return rejectWithValue('Invalid email or password');
      }

      const user: IUser = {
        id: res.id,
        name: res.name,
        email: res.email,
        role: res.role || 'user',
      };

      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const res = await User.revalidate();

  if (!res) {
    throw new Error('User not found');
  }

  const user: IUser = {
    id: res.id,
    name: res.name,
    email: res.email,
    role: res.role || 'user',
  };

  localStorage.setItem('user', JSON.stringify(user));

  return user;
});

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email }: { name: string; email: string }, { rejectWithValue }) => {
    try {
      if (email === 'user@example.com') {
        return rejectWithValue('Email already in use');
      }

      const newUser: IUser = {
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
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
