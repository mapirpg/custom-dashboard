export const normalizeLanguageCode = (code: string): string => {
  return code?.replace('-', '_');
};
