import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface UseLanguageReturn {
  t: (key: string, options?: any) => string;
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
  languages: { code: string; name: string }[];
}

export const useLanguage = (): UseLanguageReturn => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const languages = [
    { code: 'en_US', name: t('languages.en_US') },
    { code: 'pt_BR', name: t('languages.pt_BR') },
  ];

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  return {
    t,
    currentLanguage,
    changeLanguage,
    languages,
  };
};

export default useLanguage;
