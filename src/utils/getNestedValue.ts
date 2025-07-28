/* eslint-disable @typescript-eslint/no-explicit-any */

type Primitive = string | number | boolean | null | undefined;

export type NestedPaths<T, Prefix extends string = ''> = T extends Primitive
  ? never
  : T extends any[]
    ? `${Prefix}[${0}]` | `${Prefix}[${0}].${string}`
    : T extends object
      ? {
          [K in keyof T & string]:
            | `${Prefix}${Prefix extends '' ? '' : '.'}${K}`
            | NestedPaths<T[K], `${Prefix}${Prefix extends '' ? '' : '.'}${K}`>;
        }[keyof T & string]
      : never;

export const getNestedValue = (obj: any, path?: string): any => {
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
