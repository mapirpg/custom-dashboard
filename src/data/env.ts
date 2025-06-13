/* eslint-disable @typescript-eslint/no-explicit-any */
const isDev = import.meta.env.MODE === 'development';
const appRouteModules: Record<string, () => Promise<any>> = import.meta.glob(
  '../pages/**/*Route.tsx',
);

export const avaliableRouteIds = Object.keys(appRouteModules).reduce<string[]>((acc, path) => {
  const match = path.match(/([^/]+)Route\.tsx$/);

  if (match) {
    const routeId = match[1].toLowerCase();
    acc.push(routeId);
  }

  return acc;
}, []);

export default {
  isDev,
  avaliableRouteIds,
};
