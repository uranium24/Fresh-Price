import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ArrowLeft } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ReportPageProps {
  formData: {
    commodity: string;
    season: string;
    location: string;
    date: string;
  };
  onBack: () => void;
  darkMode: boolean;
}

export default function ReportPage({ formData, onBack, darkMode }: ReportPageProps) {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Price Trends',
        data: [65000, 95000, 90000, 60000, 80000],
        backgroundColor: darkMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: darkMode ? 'rgba(74, 222, 128, 1)' : 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#fff' : '#000',
        },
      },
      title: {
        display: true,
        text: 'Past Price Trends',
        color: darkMode ? '#fff' : '#000',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#fff' : '#000',
        },
      },
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#fff' : '#000',
        },
      },
    },
  };

  return (
    <div className={`max-w-4xl w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 transition-colors duration-200`}>
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Price Prediction Report</h2>
        <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>Commodity: {formData.commodity}</p>
          <p>Season: {formData.season}</p>
          <p>Location: {formData.location}</p>
          <p>Date: {formData.date}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-center mb-6">
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            The predicted price considering these aspects is
          </h3>
          <p className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} mt-2`}>
            ₹ 92,183,913
          </p>
        </div>

        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg transition-colors duration-200`}>
          <Bar options={options} data={data} />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Key Insights:</h4>
        <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
          <li>Prices have shown an upward trend over the past 3 months</li>
          <li>Seasonal variations indicate higher prices during summer</li>
          <li>Location-based analysis shows strong market demand</li>
          <li>Historical data suggests favorable pricing conditions</li>
        </ul>
      </div>
    </div>
  );
}