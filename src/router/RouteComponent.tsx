import { LoadingScreen } from '@components/Loading';
import { useDynamicComponent } from '@hooks';
import React, { Suspense } from 'react';
import AnimatedRouteContent from './RouteAnimation';

const RouteComponent = React.memo(({ routePath, name }: { routePath: string; name: string }) => {
  const key = `${routePath}/${name}`;
  const path = `../pages/${routePath}/${name}Route.tsx`;
  const Component = useDynamicComponent(path, key);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AnimatedRouteContent>
        <Component />
      </AnimatedRouteContent>
    </Suspense>
  );
});

RouteComponent.displayName = 'RouteComponent';

export default RouteComponent;
