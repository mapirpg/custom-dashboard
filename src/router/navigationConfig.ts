import { IconName } from '@components/Icon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RouteProps {
  id: string;
  name: string;
  title?: string;
  path: string;
  icon?: IconName;
  auth?: string[];
  layout?: 'auth' | 'main' | 'empty';
  component?: string;
  children?: RouteProps[];
  index?: boolean;
  redirect?: string;
  hide?: boolean;
  routePath?: string;
}

export const useRouteConfig = ({
  isAuthenticated,
}: {
  isAuthenticated?: boolean;
}): { routes: RouteProps[] } => {
  const { t } = useTranslation();

  const routes = useMemo(() => {
    const authenticatedRoutes: RouteProps[] = [
      {
        id: 'main-layout',
        layout: 'main',
        path: '/',
        name: 'Main',
        children: [
          {
            id: 'home',
            name: 'Home',
            icon: 'home',
            title: t('home'),
            routePath: 'app/home',
            path: '',
            index: true,
          },
          {
            id: 'inputs',
            name: 'Inputs',
            icon: 'keyboard',
            title: t('form'),
            path: 'inputs',
            routePath: 'app/inputs',
          },
          {
            id: 'table',
            name: 'Table',
            icon: 'table',
            title: t('table'),
            path: 'table',
            routePath: 'app/table',
          },
          {
            id: 'areas',
            name: 'Areas',
            icon: 'eventCalendar',
            title: t('areas'),
            path: 'areas',
            routePath: 'app/areas',
            children: [
              {
                id: 'register-area',
                name: 'RegisterArea',
                title: t('register_area'),
                path: 'register',
                routePath: 'app/areas/register',
                hide: true,
              },
            ],
          },
        ],
      },
    ];

    const publicRoutes: RouteProps[] = [
      {
        id: 'public-layout',
        layout: 'auth',
        path: '/',
        name: 'Auth',
        children: [
          {
            routePath: 'public/login',
            name: 'Login',
            id: 'login',
            title: 'Login',
            path: '',
            index: true,
          },
          {
            name: 'Register',
            id: 'register',
            title: 'Register',
            path: 'register',
            routePath: 'public/register',
          },
          {
            name: 'NotFound',
            id: 'notfound',
            routePath: 'public/notfound',
            title: '404',
            path: '*',
          },
        ],
      },
    ];

    return isAuthenticated ? authenticatedRoutes : publicRoutes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return { routes };
};
