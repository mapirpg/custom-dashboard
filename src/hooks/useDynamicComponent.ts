import React, { useMemo } from 'react';

const componentsCache = new Map();

export const useDynamicComponent = (path: string, key: string) => {
  return useMemo(() => {
    if (!componentsCache.has(key)) {
      const Component = React.lazy(() => import(/* @vite-ignore */ path));
      componentsCache.set(key, Component);
    }

    return componentsCache.get(key);
  }, [path, key]);
};
