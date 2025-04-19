import React, { useState } from 'react';
import { Calendar, MapPin, Wheat, Sun } from 'lucide-react';

interface PredictionFormProps {
  onBack: () => void;
  onSubmit: (formData: {
    commodity: string;
    season: string;
    location: string;
    date: string;
  }) => void;
  darkMode: boolean;
}

export default function PredictionForm({ onBack, onSubmit, darkMode }: PredictionFormProps) {
  const [formData, setFormData] = useState({
    commodity: '',
    season: '',
    location: '',
    date: ''
  });

  const commodities = [
    'Rice',
    'Wheat',
    'Corn',
    'Soybeans',
    'Cotton',
    'Sugarcane',
    'Potatoes',
    'Tomatoes',
    'Onions',
    'Pulses'
  ];

  const locations = [
    'Maharashtra',
    'Punjab',
    'Haryana',
    'Uttar Pradesh',
    'Karnataka',
    'Gujarat',
    'Madhya Pradesh',
    'West Bengal',
    'Tamil Nadu',
    'Rajasthan'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={`max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 transition-colors duration-200`}>
      <h2 className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
        Crop Price Prediction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            <Wheat className="w-5 h-5 mr-2" />
            Commodity Name
          </label>
          <select
            value={formData.commodity}
            onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
            className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            required
          >
            <option value="">Select commodity</option>
            {commodities.map((commodity) => (
              <option key={commodity} value={commodity}>
                {commodity}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            <Sun className="w-5 h-5 mr-2" />
            Season
          </label>
          <select
            value={formData.season}
            onChange={(e) => setFormData({ ...formData, season: e.target.value })}
            className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            required
          >
            <option value="">Select season</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="monsoon">Monsoon</option>
          </select>
        </div>

        <div>
          <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            <MapPin className="w-5 h-5 mr-2" />
            Location
          </label>
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            required
          >
            <option value="">Select location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            <Calendar className="w-5 h-5 mr-2" />
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            required
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className={`flex-1 px-6 py-2 ${darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white rounded-lg transition-colors`}
          >
            Back
          </button>
          <button
            type="submit"
            className={`flex-1 px-6 py-2 ${darkMode ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg transition-colors`}
          >
            Generate Report
          </button>
        </div>
      </form>
    </div>
  );
}