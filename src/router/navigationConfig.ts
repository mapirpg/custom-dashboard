export interface RouteProps {
  id: string;
  title?: string;
  path: string;
  icon?: string;
  auth?: string[];
  layout?: 'auth' | 'main' | 'empty';
  component?: string;
  children?: RouteProps[];
  index?: boolean;
  redirect?: string;
}

export const getRouteConfig = (isAuthenticated?: boolean): RouteProps[] => {
  const authenticatedRoutes: RouteProps[] = [
    {
      id: 'main-layout',
      layout: 'main',
      path: '/',
      children: [
        {
          id: 'home',
          title: 'Home',
          path: '',
          index: true,
        },
      ],
    },
  ];

  const publicRoutes: RouteProps[] = [
    {
      id: 'public-layout',
      layout: 'auth',
      path: '/',
      children: [
        {
          id: 'login',
          title: 'Login',
          path: '',
          index: true,
        },
        {
          id: 'register',
          title: 'Register',
          path: 'register',
        },
        {
          id: 'notfound',
          title: '404',
          path: '*',
        },
      ],
    },
  ];

  return isAuthenticated ? authenticatedRoutes : publicRoutes;
};

export default (isAuthenticated?: boolean) => getRouteConfig(isAuthenticated);
