import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageTransition from "./PageTransition";
import ThemeToggle from "./ThemeToggle";
import PropTypes from 'prop-types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const JobApplicationForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", data);
      console.log("Başarılı!", response.data);
      
      // Form verilerini sakla
      setSubmittedData(data);
      
      toast.success(t.toast.success, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'toast-success',
        bodyClassName: 'toast-success-body',
        progressClassName: 'toast-success-progress'
      });

      reset();
      setShowTransition(true);
    } catch (error) {
      console.error("Hata:", error);
      toast.error(t.toast.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'toast-error',
        bodyClassName: 'toast-error-body',
        progressClassName: 'toast-error-progress'
      });
    }
  };

  const handleTransitionMiddle = () => {
    if (submittedData) {
      onSuccess(submittedData);
      navigate('/success');
    }
  };

  const handleTransitionEnd = () => {
    setShowTransition(false);
    setSubmittedData(null);
  };

  const onError = (errors) => {
    console.log(errors);
    toast.error(t.toast.validation, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'toast-error',
      bodyClassName: 'toast-error-body',
      progressClassName: 'toast-error-progress'
    });
  };

  return (
    <>
      <PageTransition 
        isActive={showTransition} 
        onTransitionMiddle={handleTransitionMiddle}
        onTransitionEnd={handleTransitionEnd}
      />
      <ThemeToggle />
      <div className="w-full min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-purple-50 dark:from-gray-900 dark:via-violet-950 dark:to-gray-900 transition-colors duration-300">
        <div className="w-full max-w-5xl mx-auto px-4 py-12 animate-fadeIn">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md border border-violet-100 dark:border-violet-900 overflow-hidden">
            <div className="relative h-48 md:h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-violet-900/70 via-violet-800/50 to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop"
                alt="AI ve Teknoloji"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg bg-gradient-to-r from-violet-100 to-white bg-clip-text">
                  {t.title}
                </h1>
              </div>
            </div>
            
            <div className="p-8 md:p-12 border-b border-violet-100 dark:border-violet-900">
              <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                {t.description}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onError)} className="p-8 md:p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-violet-500 dark:group-focus-within:text-violet-400">
                    {t.email} <span className="text-rose-400 dark:text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { 
                      required: t.validations.email.required,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t.validations.email.invalid
                      }
                    })}
                    className="mt-1 block w-full rounded-xl border border-violet-100 dark:border-violet-900 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white py-3 px-4 shadow-sm transition-all duration-200 ease-in-out focus:border-violet-300 dark:focus:border-violet-700 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800 focus:outline-none hover:border-violet-200 dark:hover:border-violet-800 transform hover:-translate-y-0.5"
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-rose-400 dark:text-rose-500 animate-shake">{errors.email.message}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-violet-500 dark:group-focus-within:text-violet-400">
                    {t.linkedin} <span className="text-rose-400 dark:text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    {...register("linkedin", { 
                      required: t.validations.linkedin.required,
                      pattern: {
                        value: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_%]+\/?.*$/,
                        message: t.validations.linkedin.invalid
                      }
                    })}
                    className="mt-1 block w-full rounded-xl border border-violet-100 dark:border-violet-900 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white py-3 px-4 shadow-sm transition-all duration-200 ease-in-out focus:border-violet-300 dark:focus:border-violet-700 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800 focus:outline-none hover:border-violet-200 dark:hover:border-violet-800 transform hover:-translate-y-0.5"
                    placeholder="https://linkedin.com/in/..."
                  />
                  {errors.linkedin && (
                    <p className="mt-2 text-sm text-rose-400 dark:text-rose-500 animate-shake">{errors.linkedin.message}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-violet-500 dark:group-focus-within:text-violet-400">
                    {t.experience.label} <span className="text-rose-400 dark:text-rose-500">*</span>
                  </label>
                  <select
                    {...register("experience", { required: t.validations.experience })}
                    className="mt-1 block w-full rounded-xl border border-violet-100 dark:border-violet-900 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white py-3 px-4 shadow-sm transition-all duration-200 ease-in-out focus:border-violet-300 dark:focus:border-violet-700 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800 focus:outline-none hover:border-violet-200 dark:hover:border-violet-800 transform hover:-translate-y-0.5"
                  >
                    <option value="">{t.experience.options.select}</option>
                    <option value="junior">{t.experience.options.junior}</option>
                    <option value="mid">{t.experience.options.mid}</option>
                    <option value="senior">{t.experience.options.senior}</option>
                  </select>
                  {errors.experience && (
                    <p className="mt-2 text-sm text-rose-400 dark:text-rose-500 animate-shake">{errors.experience.message}</p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-violet-500 dark:group-focus-within:text-violet-400">
                    {t.role.label} <span className="text-rose-400 dark:text-rose-500">*</span>
                  </label>
                  <select
                    {...register("role", { required: t.validations.role })}
                    className="mt-1 block w-full rounded-xl border border-violet-100 dark:border-violet-900 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white py-3 px-4 shadow-sm transition-all duration-200 ease-in-out focus:border-violet-300 dark:focus:border-violet-700 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800 focus:outline-none hover:border-violet-200 dark:hover:border-violet-800 transform hover:-translate-y-0.5"
                  >
                    <option value="">{t.role.options.select}</option>
                    <option value="fullstack">{t.role.options.fullstack}</option>
                    <option value="ai_ml">{t.role.options.ai_ml}</option>
                    <option value="frontend">{t.role.options.frontend}</option>
                    <option value="backend">{t.role.options.backend}</option>
                    <option value="mobile">{t.role.options.mobile}</option>
                    <option value="designer">{t.role.options.designer}</option>
                    <option value="product_manager">{t.role.options.product_manager}</option>
                    <option value="other">{t.role.options.other}</option>
                  </select>
                  {errors.role && (
                    <p className="mt-2 text-sm text-rose-400 dark:text-rose-500 animate-shake">{errors.role.message}</p>
                  )}
                </div>

                <div className="md:col-span-2 group">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-violet-500 dark:group-focus-within:text-violet-400">
                    {t.english.label} <span className="text-rose-400 dark:text-rose-500">*</span>
                  </label>
                  <select
                    {...register("english", { required: t.validations.english })}
                    className="mt-1 block w-full rounded-xl border border-violet-100 dark:border-violet-900 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white py-3 px-4 shadow-sm transition-all duration-200 ease-in-out focus:border-violet-300 dark:focus:border-violet-700 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800 focus:outline-none hover:border-violet-200 dark:hover:border-violet-800 transform hover:-translate-y-0.5"
                  >
                    <option value="">{t.english.options.select}</option>
                    <option value="native">{t.english.options.native}</option>
                    <option value="c2">{t.english.options.c2}</option>
                    <option value="c1">{t.english.options.c1}</option>
                    <option value="b2">{t.english.options.b2}</option>
                    <option value="b1">{t.english.options.b1}</option>
                    <option value="a2">{t.english.options.a2}</option>
                    <option value="a1">{t.english.options.a1}</option>
                    <option value="no">{t.english.options.no}</option>
                  </select>
                  {errors.english && (
                    <p className="mt-2 text-sm text-rose-400 dark:text-rose-500 animate-shake">{errors.english.message}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {t.english.note}
                  </p>
                </div>

                <div className="md:col-span-2 group">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-violet-500 dark:group-focus-within:text-violet-400">
                    {t.project.label}
                  </label>
                  <textarea
                    {...register("project")}
                    rows={4}
                    className="mt-1 block w-full rounded-xl border border-violet-100 dark:border-violet-900 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white py-3 px-4 shadow-sm transition-all duration-200 ease-in-out focus:border-violet-300 dark:focus:border-violet-700 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800 focus:outline-none hover:border-violet-200 dark:hover:border-violet-800 transform hover:-translate-y-0.5 resize-none"
                    placeholder={t.project.placeholder}
                  />
                </div>

                <div className="md:col-span-2 group">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-violet-500 dark:group-focus-within:text-violet-400">
                    {t.additional.label}
                  </label>
                  <textarea
                    {...register("additional")}
                    rows={4}
                    className="mt-1 block w-full rounded-xl border border-violet-100 dark:border-violet-900 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white py-3 px-4 shadow-sm transition-all duration-200 ease-in-out focus:border-violet-300 dark:focus:border-violet-700 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800 focus:outline-none hover:border-violet-200 dark:hover:border-violet-800 transform hover:-translate-y-0.5 resize-none"
                    placeholder={t.additional.placeholder}
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-400 to-indigo-400 dark:from-violet-500 dark:to-indigo-500 text-white py-3 px-6 rounded-xl font-medium text-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t.submitting}
                    </span>
                  ) : (
                    t.submit
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

JobApplicationForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default JobApplicationForm; 