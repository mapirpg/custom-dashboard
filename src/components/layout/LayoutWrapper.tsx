import React, { Suspense } from 'react';
import { LoadingScreen } from '../Loading';
import { useDynamicComponent } from '@hooks';
import { RouteProps } from '@router/navigationConfig';

const LayoutWrapper = React.memo(({ routes }: { routes: RouteProps[] }) => {
  const layout = routes[0] ||
    routes.find(route => route.layout === 'empty') || { path: '/', children: [] };
  const path = `../components/layout/${layout.name}Layout`;
  const Layout = useDynamicComponent(path, layout.name);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Layout />
    </Suspense>
  );
});

LayoutWrapper.displayName = 'LayoutWrapper';

export default LayoutWrapper;
