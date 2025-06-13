import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useRouter } from './useRedux';

export type TransitionDirection = 'left' | 'right' | 'up' | 'down' | 'none';

export const usePageTransition = () => {
  const location = useLocation();
  const { routes } = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [direction, setDirection] = useState<TransitionDirection>('right');

  const calculateDirection = useCallback(
    (currentPath: string, prevPath: string | null): TransitionDirection => {
      if (!prevPath) return 'right';

      if (currentPath.split('/').length === prevPath.split('/').length) {
        const flatRoutes = routes.flatMap(r => r.children || []);
        const currentRouteIndex = flatRoutes.findIndex(r => r.path === currentPath);
        const prevRouteIndex = flatRoutes.findIndex(r => r.path === prevPath);

        if (currentRouteIndex > prevRouteIndex) {
          return 'left';
        } else {
          return 'right';
        }
      }

      if (currentPath.split('/').length > prevPath.split('/').length) {
        return 'up';
      }

      return 'down';
    },
    [routes],
  );

  useEffect(() => {
    setIsTransitioning(true);

    setPreviousPath(prev => {
      if (prev !== location.pathname) {
        setDirection(calculateDirection(location.pathname, prev));
        return location.pathname;
      }

      return null;
    });

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, calculateDirection]);

  return {
    isTransitioning,
    previousPath,
    currentPath: location.pathname,
    direction,
  };
};
