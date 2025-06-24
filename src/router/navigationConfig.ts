import { IconName } from '@components/Icon';

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

export const getRouteConfig = (isAuthenticated?: boolean): RouteProps[] => {
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
          title: 'Home',
          routePath: 'app/Home',
          path: '',
          index: true,
        },
        {
          id: 'demo',
          name: 'Demo',
          icon: 'home',
          title: 'Demo',
          path: 'demo',
          routePath: 'app/Demo',
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
          routePath: 'public/Login',
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
          routePath: 'public/Register',
        },
        {
          name: 'NotFound',
          id: 'notfound',
          routePath: 'public/NotFound',
          title: '404',
          path: '*',
        },
      ],
    },
  ];

  return isAuthenticated ? authenticatedRoutes : publicRoutes;
};

export default (isAuthenticated?: boolean) => getRouteConfig(isAuthenticated);
