import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';
import Storage from '@data/storage';

interface ThemeState {
  mode: PaletteMode;
}

export const initializeTheme = createAsyncThunk('theme/initialize', async () => {
  const storedMode = Storage.getItem('themeMode');

  if (storedMode === 'dark' || storedMode === 'light') {
    return storedMode as PaletteMode;
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark' as PaletteMode;
  }

  return 'light' as PaletteMode;
});

const initialState: ThemeState = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: state => {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = newMode;
      Storage.setItem('themeMode', newMode);
    },
    setMode: (state, action) => {
      state.mode = action.payload;
      Storage.setItem('themeMode', action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeTheme.fulfilled, (state, action) => {
      state.mode = action.payload;
    });
  },
});

export const { toggleMode, setMode } = themeSlice.actions;

export default themeSlice.reducer;
