import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage('language', 'tr');

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'tr' ? 'en' : 'tr');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 