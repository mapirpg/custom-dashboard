/* eslint-disable no-console */
import React, { useEffect, useMemo } from 'react';
import { useAuth, useLanguage, useTheme } from '@hooks';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import createAppTheme from '@theme';
import { useQuery } from '@tanstack/react-query';
import Instance from '@/data/models/instance';
import { LoadingScreen } from '@/components/Loading';
import { updateFavicon } from '@/utils/updateFavicon';
import { translationKeysVerify } from '@/utils/translatiosVerification';
import env from '../data/env';
import Container from '@/components/Container';

interface AppInitializerProps {
  children: React.ReactNode;
}

if (env.isDev) {
  translationKeysVerify();
  console.warn('AvaliableRoutes:', env.avaliableRouteIds);
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const theme = useTheme();
  const auth = useAuth();
  const language = useLanguage();

  const { data: instance, isLoading } = useQuery({
    queryKey: ['instance'],
    queryFn: Instance.getInstance,
  });

  const instanceTheme = useMemo(
    () => createAppTheme(theme?.mode, instance?.theme),
    [theme?.mode, instance],
  );

  useEffect(() => {
    auth.revalidate();
    language.initialize();
    theme.initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (instance?.theme?.logo) {
      updateFavicon(instance?.theme?.logo);
    }
  }, [instance]);

  return (
    <MuiThemeProvider theme={instanceTheme}>
      {isLoading ? (
        <Container>
          <LoadingScreen />
        </Container>
      ) : (
        children
      )}
    </MuiThemeProvider>
  );
};

export default AppInitializer;
