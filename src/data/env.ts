/* eslint-disable @typescript-eslint/no-explicit-any */
const isDev = import.meta.env.MODE === 'development';
const appRouteModules: Record<string, () => Promise<any>> = import.meta.glob(
  '../pages/**/*Route.tsx',
);

export const avaliableRouteIds = Object.keys(appRouteModules).reduce<string[]>((acc, path) => {
  const relativePath = path.replace('../pages/', '');
  const withoutRoute = relativePath.replace(/Route\.tsx$/, '');
  const parts = withoutRoute.split('/');

  if (parts.length > 1) {
    const lastPart = parts[parts.length - 1].toLowerCase();
    const secondLastPart = parts[parts.length - 2].toLowerCase();

    if (lastPart.includes(secondLastPart) || secondLastPart.includes(lastPart)) {
      parts.pop();
    }
  }

  const routePath = parts.map(part => part.toLowerCase()).join('/');

  acc.push(routePath);
  return acc;
}, []);

export default {
  isDev,
  avaliableRouteIds,
};
