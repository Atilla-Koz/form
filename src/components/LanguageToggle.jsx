import { useLanguage } from '../context/LanguageContext';
import { toast } from 'react-toastify';
import { translations } from '../translations';
import { useState, useCallback } from 'react';
import PageTransition from './PageTransition';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLanguageChange = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
  }, [isTransitioning]);

  const handleTransitionMiddle = useCallback(() => {
    const newLang = language === 'tr' ? 'en' : 'tr';
    toggleLanguage();
    
    toast.info(translations[newLang].toast.languageChanged, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: `${newLang === 'tr' ? 'bg-red-50' : 'bg-blue-50'} dark:bg-gray-800/90 backdrop-blur-sm border ${newLang === 'tr' ? 'border-red-200' : 'border-blue-200'} dark:border-violet-900`,
      bodyClassName: `${newLang === 'tr' ? 'text-red-800' : 'text-blue-800'} dark:text-gray-100`,
      progressClassName: `${newLang === 'tr' ? 'bg-red-500' : 'bg-blue-500'} dark:bg-violet-400`,
    });
  }, [language, toggleLanguage]);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <>
      <PageTransition 
        isActive={isTransitioning} 
        onTransitionMiddle={handleTransitionMiddle}
        onTransitionEnd={handleTransitionEnd} 
      />
      <button
        onClick={handleLanguageChange}
        disabled={isTransitioning}
        className={`fixed top-4 right-20 z-50 p-2 rounded-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-violet-100 dark:border-violet-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 
          ${isTransitioning ? 'opacity-50 cursor-not-allowed transform-none hover:transform-none' : ''}`}
        aria-label="Dili Değiştir"
      >
        <div className="w-6 h-6 flex items-center justify-center text-gray-700 dark:text-gray-300">
          {language === 'tr' ? 'EN' : 'TR'}
        </div>
      </button>
    </>
  );
};

export default LanguageToggle; 