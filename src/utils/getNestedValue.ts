// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedValue = (obj: any, path: string): any => {
  if (!path) return obj;

  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (current === null || current === undefined) return undefined;

    if (Array.isArray(current) && !isNaN(Number(part))) {
      current = current[Number(part)];
    } else {
      current = current[part];
    }
  }

  return current;
};
