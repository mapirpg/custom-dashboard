/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '@data/interfaces/user';
import User from '@data/models/user';
import Storage from '@data/storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  user?: IUser | null;
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

      Storage.setItem('user', user);

      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  },
);

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  const storedUser = Storage.getItem('user');

  if (!storedUser) {
    return rejectWithValue('No user found in storage');
  }

  try {
    const res = await User.revalidate(storedUser);

    if (!res) {
      throw new Error('User not found');
    }

    const user: IUser = {
      id: res.id,
      name: res.name,
      email: res.email,
      role: res.role || 'user',
    };

    Storage.setItem('user', user);

    return user;
  } catch (error) {
    rejectWithValue(error instanceof Error ? error.message : 'User revalidate failed');
  }
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

      Storage.setItem('user', newUser);
      return newUser;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Signup failed');
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      Storage.removeItem('user');
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
