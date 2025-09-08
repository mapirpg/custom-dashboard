import RouteComponent from './RouteComponent';
import { Route, Routes } from 'react-router-dom';
import LayoutWrapper from '@components/layout/LayoutWrapper';
import { RouteProps, useRouteConfig } from './navigationConfig';
import { useEffect } from 'react';
import { useAuth, useRouter } from '@hooks';

const AppRoutes = () => {
  const { setRoutes } = useRouter();
  const { isAuthenticated } = useAuth();
  const { routes } = useRouteConfig({ isAuthenticated });
  const layout = routes[0] ||
    routes.find(route => route.layout === 'empty') || { path: '/', children: [] };

  useEffect(() => {
    setRoutes(routes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const renderRoutes = (routes: RouteProps[]) => {
    return routes.map((route: RouteProps) => {
      if (route.children && route.children.length > 0) {
        return (
          <Route
            key={route.id}
            path={route.path}
            element={<RouteComponent routePath={route.routePath || ''} name={route.name} />}
          >
            {renderRoutes(route.children)}
          </Route>
        );
      } else {
        return (
          <Route
            key={route.id}
            path={route.path}
            index={route.index}
            element={<RouteComponent routePath={route.routePath || ''} name={route.name} />}
          />
        );
      }
    });
  };

  return (
    <Routes>
      <Route path={layout.path} element={<LayoutWrapper routes={routes} />}>
        {renderRoutes(layout.children || [])}
        <Route path="*" element={<RouteComponent routePath="public/notfound" name="NotFound" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
