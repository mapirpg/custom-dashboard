// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumericValue = (value: any): boolean => {
  if (typeof value === 'number') return true;

  if (typeof value === 'string' && !isNaN(Number(value))) return true;

  return false;
};
