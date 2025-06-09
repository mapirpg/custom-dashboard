export const updateFavicon = (faviconUrl: string): void => {
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
  existingFavicons.forEach(favicon => {
    document.head.removeChild(favicon);
  });

  const imageType =
    {
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
    }[faviconUrl.slice(faviconUrl.lastIndexOf('.'))] || 'image/png';

  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = faviconUrl;
  link.type = imageType;
  document.head.appendChild(link);

  const appleTouchIcon = document.createElement('link');
  appleTouchIcon.rel = 'apple-touch-icon';
  appleTouchIcon.href = faviconUrl;
  document.head.appendChild(appleTouchIcon);
};
