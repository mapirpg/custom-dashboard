import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en_US/translation.json';
import translationPT from './locales/pt_BR/translation.json';

// Mapeamento de códigos de idioma com hífen para underscore
const languageMapping: Record<string, string> = {
  'en-US': 'en_US',
  'pt-BR': 'pt_BR',
};

const resources = {
  en_US: {
    translation: translationEN,
  },
  pt_BR: {
    translation: translationPT,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt_BR',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

const originalChangeLanguage = i18n.changeLanguage;
i18n.changeLanguage = (lng?: string, ...rest) => {
  if (lng && languageMapping[lng]) {
    return originalChangeLanguage.call(i18n, languageMapping[lng], ...rest);
  }

  return originalChangeLanguage.call(i18n, lng, ...rest);
};

export default i18n;
