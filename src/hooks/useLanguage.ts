import { useState, useEffect } from 'react';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('marketplace-lang');
      return (saved as Language) || 'ar';
    }
    return 'ar';
  });

  const dir: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.setAttribute('lang', language);
    root.setAttribute('dir', dir);
    
    if (language === 'ar') {
      root.classList.add('rtl');
      root.classList.remove('ltr');
    } else {
      root.classList.add('ltr');
      root.classList.remove('rtl');
    }

    localStorage.setItem('marketplace-lang', language);
  }, [language, dir]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    localStorage.setItem('marketplace-lang', newLang);
    window.location.reload();
  };

  const t = (en: string, ar: string) => (language === 'en' ? en : ar);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ar-IL', {
      style: 'currency',
      currency: 'ILS',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
    dir,
    t,
    formatCurrency,
    isRTL: dir === 'rtl',
    isEnglish: language === 'en',
    isArabic: language === 'ar',
  };
};