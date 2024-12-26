import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import JobApplicationForm from './components/JobApplicationForm'
import SuccessPage from './components/SuccessPage'
import { useState, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import LanguageToggle from './components/LanguageToggle'

function App() {
  const [formData, setFormData] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Dark mode değişikliklerini dinle
    const darkModeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('dark')) {
          setIsDarkMode(true)
        } else {
          setIsDarkMode(false)
        }
      })
    })

    darkModeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Component unmount olduğunda observer'ı temizle
    return () => darkModeObserver.disconnect()
  }, [])

  return (
    <LanguageProvider>
      <Router>
        <div className="w-full min-h-screen bg-gray-50 antialiased text-gray-900">
          <LanguageToggle />
          <Routes>
            <Route path="/" element={<JobApplicationForm onSuccess={setFormData} />} />
            <Route path="/success" element={<SuccessPage formData={formData} />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={isDarkMode ? "dark" : "light"}
            toastStyle={{
              backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'white',
              color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)',
            }}
            progressStyle={{
              background: isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)',
            }}
          />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
