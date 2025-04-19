import React, { useState } from 'react';
import { Sprout, Moon, Sun } from 'lucide-react';
import PredictionForm from './components/PredictionForm';
import ReportPage from './components/ReportPage';

interface FormData {
  commodity: string;
  season: string;
  location: string;
  date: string;
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    commodity: '',
    season: '',
    location: '',
    date: ''
  });

  const handlePreferenceClick = (preference: 'wholesale' | 'retail') => {
    localStorage.setItem('preference', preference);
    setShowForm(true);
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setShowReport(true);
    setShowForm(false);
  };

  const handleBackToForm = () => {
    setShowReport(false);
    setShowForm(true);
  };

  const handleBackToHome = () => {
    setShowForm(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-green-50'} transition-colors duration-200`}>
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-opacity-20 backdrop-blur-sm bg-gray-800 dark:bg-white text-white dark:text-gray-800"
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      <div className="flex flex-col items-center justify-center p-4 min-h-screen">
        {!showForm && !showReport ? (
          <>
            <div className={`max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 transition-colors duration-200`}>
              <div className="flex items-center justify-center mb-6">
                <Sprout className={`h-12 w-12 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              
              <h1 className={`text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
                Fresh Price
              </h1>
              
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                Your trusted partner in crop price prediction and market intelligence
              </p>

              <div className="space-y-4">
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-6`}>
                  Please select your report type
                </p>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handlePreferenceClick('wholesale')}
                    className={`px-8 py-2 ${darkMode ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg transition-colors`}
                  >
                    Wholesale
                  </button>
                  
                  <button
                    onClick={() => handlePreferenceClick('retail')}
                    className={`px-8 py-2 ${darkMode ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg transition-colors`}
                  >
                    Retail
                  </button>
                </div>
              </div>
            </div>
            
            <div className={`mt-8 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p>report type &gt; select type &gt; report</p>
            </div>
          </>
        ) : showForm ? (
          <PredictionForm onBack={handleBackToHome} onSubmit={handleFormSubmit} darkMode={darkMode} />
        ) : (
          <ReportPage formData={formData} onBack={handleBackToForm} darkMode={darkMode} />
        )}
      </div>
    </div>
  );
}

export default App;