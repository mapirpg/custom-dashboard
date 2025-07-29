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

  return (
    <Routes>
      <Route path={layout.path} element={<LayoutWrapper routes={routes} />}>
        {layout.children?.map((child: RouteProps) => (
          <Route
            key={child.id}
            path={child.path}
            index={child.index}
            element={<RouteComponent routePath={child.routePath || ''} name={child.name} />}
          />
        ))}
        <Route path="*" element={<RouteComponent routePath="public/NotFound" name="NotFound" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
