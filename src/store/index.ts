import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './alertSlice';
import authReducer from './authSlice';
import languageReducer from './languageSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    language: languageReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
