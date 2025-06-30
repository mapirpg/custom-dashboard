// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractKeys = (obj: any, prefix = ''): string[] => {
  if (!obj || typeof obj !== 'object') return [];

  return Object.entries(obj).flatMap(([key, value]) => {
    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object') {
        return [`${currentPath}.0`, ...extractKeys(value[0], `${currentPath}.0`)];
      } else {
        return [currentPath];
      }
    }

    if (value && typeof value === 'object' && Object.keys(value).length > 0) {
      return [currentPath, ...extractKeys(value, currentPath)];
    }

    return [currentPath];
  });
};
