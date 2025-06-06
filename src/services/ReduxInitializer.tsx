import React, { useEffect } from 'react';
import { checkAuth } from '@store/authSlice';
import { initializeLanguage } from '@store/languageSlice';
import { initializeTheme } from '@store/themeSlice';
import { useAppDispatch, useThemeMode } from '../hooks/useRedux';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import createAppTheme from '@theme';

interface ReduxInitializerProps {
  children: React.ReactNode;
}

const ReduxInitializer: React.FC<ReduxInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { mode } = useThemeMode();
  const theme = createAppTheme(mode);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(initializeLanguage());
    dispatch(initializeTheme());
  }, [dispatch]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ReduxInitializer;
