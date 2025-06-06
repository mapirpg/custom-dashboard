/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@i18n/i18n';
import PT_BR_FLAG from '@assets/flags/BR.svg';
import EN_US_FLAG from '@assets/flags/US.svg';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  languages: { code: string; name: string; default?: boolean; flag: string }[];
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }

  return context;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en_US');

  const languages = [
    { code: 'en_US', name: t('languages.en_US'), default: false, flag: EN_US_FLAG },
    { code: 'pt_BR', name: t('languages.pt_BR'), default: true, flag: PT_BR_FLAG },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');

    if (savedLanguage && savedLanguage !== currentLanguage) {
      changeLanguage(savedLanguage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    currentLanguage,
    changeLanguage,
    languages,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
