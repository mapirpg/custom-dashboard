import React, { useEffect, useMemo } from 'react';
import { checkAuth } from '@store/authSlice';
import { initializeLanguage } from '@store/languageSlice';
import { initializeTheme } from '@store/themeSlice';
import { useAppDispatch, useThemeMode } from '../hooks/useRedux';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import createAppTheme from '@theme';
import { useQuery } from '@tanstack/react-query';
import Instance from '@/data/models/instance';
import { LoadingScreen } from '@/components/Loading';
import { updateFavicon } from '@/utils/updateFavicon';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { mode } = useThemeMode();

  const { data: instance, isLoading } = useQuery({
    queryKey: ['instance'],
    queryFn: Instance.getInstance,
  });

  const theme = useMemo(() => createAppTheme(mode, instance?.theme), [mode, instance]);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(initializeLanguage());
    dispatch(initializeTheme());
  }, [dispatch]);

  useEffect(() => {
    if (instance?.theme?.logo) {
      updateFavicon(instance.theme.logo);
    }
  }, [instance]);

  return (
    <MuiThemeProvider theme={theme}>{isLoading ? <LoadingScreen /> : children}</MuiThemeProvider>
  );
};

export default AppInitializer;
