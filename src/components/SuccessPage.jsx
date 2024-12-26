import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import PageTransition from './PageTransition';

const successTranslations = {
  tr: {
    title: "Başvurunuz Alındı!",
    description: "Form başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.",
    summary: "Başvuru Özeti",
    back: "Ana Sayfaya Dön",
    fields: {
      email: "Email",
      linkedin: "LinkedIn",
      experience: "Tecrübe",
      role: "Rol",
      english: "İngilizce Seviyesi",
      project: "Proje",
      additional: "Ek Bilgiler"
    }
  },
  en: {
    title: "Application Received!",
    description: "Your form has been successfully submitted. We will contact you soon.",
    summary: "Application Summary",
    back: "Back to Home",
    fields: {
      email: "Email",
      linkedin: "LinkedIn",
      experience: "Experience",
      role: "Role",
      english: "English Level",
      project: "Project",
      additional: "Additional Info"
    }
  }
};

const SuccessPage = ({ formData }) => {
  const { language } = useLanguage();
  const t = successTranslations[language];
  const [showContent, setShowContent] = useState(false);
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    // Component mount olduğunda animasyonu başlat
    setShowTransition(true);
  }, []);

  const handleTransitionMiddle = () => {
    setShowContent(true);
  };

  const handleTransitionEnd = () => {
    setShowTransition(false);
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-purple-50 dark:from-gray-900 dark:via-violet-950 dark:to-gray-900 flex items-center justify-center p-4">
        <Link
          to="/"
          className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
        >
          {t.back}
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageTransition 
        isActive={showTransition}
        onTransitionMiddle={handleTransitionMiddle}
        onTransitionEnd={handleTransitionEnd}
      />
      <div className={`min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-purple-50 dark:from-gray-900 dark:via-violet-950 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-violet-100 dark:border-violet-900 overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">{t.description}</p>
              </div>

              <div className="border-t border-violet-100 dark:border-violet-900 pt-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t.summary}</h3>
                <dl className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.fields.email}</dt>
                      <dd className="mt-1 text-base text-gray-900 dark:text-white">{formData.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.fields.linkedin}</dt>
                      <dd className="mt-1 text-base text-gray-900 dark:text-white break-all">
                        <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
                          {formData.linkedin}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.fields.experience}</dt>
                      <dd className="mt-1 text-base text-gray-900 dark:text-white capitalize">{formData.experience}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.fields.role}</dt>
                      <dd className="mt-1 text-base text-gray-900 dark:text-white capitalize">{formData.role}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.fields.english}</dt>
                      <dd className="mt-1 text-base text-gray-900 dark:text-white capitalize">{formData.english}</dd>
                    </div>
                  </div>

                  {formData.project && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.fields.project}</dt>
                      <dd className="mt-1 text-base text-gray-900 dark:text-white whitespace-pre-wrap">{formData.project}</dd>
                    </div>
                  )}

                  {formData.additional && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.fields.additional}</dt>
                      <dd className="mt-1 text-base text-gray-900 dark:text-white whitespace-pre-wrap">{formData.additional}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-gradient-to-r from-violet-400 to-indigo-400 dark:from-violet-500 dark:to-indigo-500 hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5"
                >
                  {t.back}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SuccessPage.propTypes = {
  formData: PropTypes.object,
};

export default SuccessPage; 