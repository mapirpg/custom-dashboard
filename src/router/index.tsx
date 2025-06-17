import RouteComponent from './RouteComponent';
import { Route, Routes } from 'react-router-dom';
import LayoutWrapper from '@components/layout/LayoutWrapper';
import navigationConfig, { RouteProps } from './navigationConfig';
import { useEffect } from 'react';
import { useRouter } from '@hooks';

const AppRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { setRoutes } = useRouter();
  const routes = navigationConfig(isAuthenticated);
  const layout = routes[0] || routes.find(route => route.layout === 'empty');

  useEffect(() => {
    setRoutes(routes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </Route>
    </Routes>
  );
};

export default AppRoutes;
