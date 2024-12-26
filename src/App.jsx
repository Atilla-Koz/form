import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import JobApplicationForm from './components/JobApplicationForm'
import SuccessPage from './components/SuccessPage'
import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import LanguageToggle from './components/LanguageToggle'
import ThemeToggle from './components/ThemeToggle'
import { useTheme } from './context/ThemeContext'

const ToastContainerWithTheme = () => {
  const { isDark } = useTheme();
  
  return (
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
      theme={isDark ? "dark" : "light"}
      toastStyle={{
        backgroundColor: isDark ? 'rgb(31, 41, 55)' : 'white',
        color: isDark ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)',
      }}
      progressStyle={{
        background: isDark ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)',
      }}
    />
  );
};

function App() {
  const [formData, setFormData] = useState(null)

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 antialiased text-gray-900 dark:text-gray-100">
            <LanguageToggle />
            <ThemeToggle />
            <Routes>
              <Route path="/" element={<JobApplicationForm onSuccess={setFormData} />} />
              <Route path="/success" element={<SuccessPage formData={formData} />} />
            </Routes>
            <ToastContainerWithTheme />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
