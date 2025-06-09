import { configureStore } from '@reduxjs/toolkit';
import alertReducer, { hideAlert, showAlert } from './alertSlice';
import authReducer from './authSlice';
import languageReducer from './languageSlice';
import themeReducer from './themeSlice';
import dialogReducer, { closeDialog, openDialog } from './dialogSlice';
import { changeLanguage, initializeLanguage, updateLanguageName } from './languageSlice';
import { initializeTheme, setMode, themeSlice, toggleMode } from './themeSlice';
import { login, logout, signup, checkAuth, authSlice, clearError } from './authSlice';

export type AuthState = ReturnType<typeof authReducer>;
export type LanguageState = ReturnType<typeof languageReducer>;
export type ThemeState = ReturnType<typeof themeReducer>;
export type AlertState = ReturnType<typeof alertReducer>;
export type DialogState = ReturnType<typeof dialogReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const auth = { login, logout, signup, checkAuth, authSlice, clearError };
export const alert = { showAlert, hideAlert };
export const dialog = { openDialog, closeDialog };
export const language = { changeLanguage, initializeLanguage, updateLanguageName };
export const theme = { initializeTheme, setMode, themeSlice, toggleMode };

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    theme: themeReducer,
    dialog: dialogReducer,
    language: languageReducer,
  },
});
