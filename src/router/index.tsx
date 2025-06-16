/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/Loading';
import navigationConfig, { RouteProps } from './navigationConfig';
import { useAppDispatch } from '@/hooks';
import { setCurrentRoute, setRoutes } from '@/store/routerSlice';
import Container from '@/components/Container';

const routeComponentCache: Record<string, React.LazyExoticComponent<any>> = {};

const appRouteModules: Record<string, () => Promise<any>> = import.meta.glob(
  '../pages/**/*Route.tsx',
);

const getRouteComponent = (routeId: string) => {
  if (routeComponentCache[routeId]) {
    return routeComponentCache[routeId];
  }

  const routeName = routeId.charAt(0).toUpperCase() + routeId.slice(1);

  const routeFilePattern = new RegExp(`${routeName}Route\\.tsx$`, 'i');

  const matchingPaths = Object.keys(appRouteModules).filter(path => routeFilePattern.test(path));

  if (matchingPaths.length > 0) {
    const modulePath = matchingPaths[0];
    console.log(`Found route component for ${routeId} at: ${modulePath}`);

    routeComponentCache[routeId] = React.lazy(appRouteModules[modulePath]);
    return routeComponentCache[routeId];
  }

  console.error(`Could not find route component for ${routeId}`);
  return null;
};

const getNestedRoutes = (children: RouteProps[] = []) => {
  return children
    .map(route => {
      if (route.redirect) {
        return (
          <Route key={`redirect-${route.id}`} path={route.path} element={<React.Fragment />} />
        );
      }

      const Component = getRouteComponent(route.id);

      if (!Component) {
        console.error(`No component found for route: ${route.id}`);
        return null;
      }

      const WithTransition = React.lazy(() => import('@/components/WithPageTransition'));

      const routeElement = (
        <Suspense
          fallback={
            <Container>
              <LoadingScreen />
            </Container>
          }
        >
          <WithTransition>
            <Component />
          </WithTransition>
        </Suspense>
      );

      if (route.index) {
        return <Route key={route.id} index element={routeElement} />;
      }

      return (
        <Route key={route.id} path={route.path} element={routeElement}>
          {route.children && getNestedRoutes(route.children)}
        </Route>
      );
    })
    .filter(Boolean);
};

const generateRoutesStructure = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const routes = navigationConfig(isAuthenticated);
  const layoutType = routes[0]?.layout || 'auth';

  let LayoutComponent: React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>;

  switch (layoutType) {
    case 'main':
      LayoutComponent = React.lazy(() => import('@/components/layout/MainLayout'));
      break;
    case 'auth':
      LayoutComponent = React.lazy(() => import('@/components/layout/AuthLayout'));
      break;
    default:
      console.warn(`Unknown layout type: ${layoutType}. Defaulting to AuthLayout.`);
      LayoutComponent = React.lazy(() => import('@/components/layout/AuthLayout'));
      break;
  }

  const childRoutes = routes
    .flatMap(route => (route.children ? getNestedRoutes(route.children) : []))
    .filter(Boolean);

  return {
    layout: LayoutComponent,
    childRoutes,
  };
};

const AppRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { layout: LayoutComponent, childRoutes } = generateRoutesStructure({ isAuthenticated });

  useEffect(() => {
    dispatch(setRoutes(navigationConfig(isAuthenticated)));
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(
      setCurrentRoute({
        path: location.pathname,
        params: {},
      }),
    );
  }, [dispatch, location.pathname]);

  return (
    <AnimatePresence mode="popLayout">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/*"
          element={
            <Suspense>
              <LayoutComponent />
            </Suspense>
          }
        >
          {childRoutes}
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
