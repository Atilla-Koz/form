import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      toast.info(t.toast.darkMode, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-gray-800/90 backdrop-blur-sm border border-violet-900 text-gray-100',
        progressClassName: 'bg-violet-400',
      });
    } else {
      document.documentElement.classList.remove('dark');
      toast.info(t.toast.lightMode, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-white/90 backdrop-blur-sm border border-violet-100 text-gray-900',
        progressClassName: 'bg-violet-500',
      });
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-violet-100 dark:border-violet-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      aria-label={isDark ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
    >
      <div className="w-6 h-6 flex items-center justify-center text-gray-700 dark:text-gray-300">
        {isDark ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle; 