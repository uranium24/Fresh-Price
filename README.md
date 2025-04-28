# FreshPrice: Agricultural Commodity Price Prediction

![FreshPrice Logo](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=100&width=300)

## What is FreshPrice?

FreshPrice is an advanced agricultural commodity price prediction platform that helps farmers, traders, and policymakers make informed decisions about buying, selling, and storing agricultural products. Using machine learning and time series analysis, FreshPrice provides accurate price forecasts, market insights, and trend analysis for a wide range of agricultural commodities.

## Key Features

- **Long-term Price Forecasting**: 5-year price predictions using SARIMAX time series models
- **ML-based Price Prediction**: Next-month price predictions with confidence scores
- **Market Analysis**: Detailed insights into top markets, price ranges, and supply trends
- **Seasonal Pattern Detection**: Identification of best buying and selling months
- **Interactive Visualizations**: Charts and graphs for easy data interpretation
- **Comprehensive Commodity Coverage**: Support for various agricultural products

## Screenshots

![Dashboard](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=600)
![Forecast View](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=600)

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Python, FastAPI, pandas, scikit-learn, statsmodels
- **Data Processing**: NumPy, pandas
- **Machine Learning**: Random Forest, SARIMAX
- **Visualization**: Custom Canvas-based charts

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- Python (v3.8 or later)
- Git

### Frontend Setup

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/freshprice.git
   cd freshprice
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Access the application at `http://localhost:3000`

### Backend Setup

#### Windows

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Run the start script:
   \`\`\`bash
   start.bat
   \`\`\`

   This will:
   - Create a virtual environment
   - Install required dependencies
   - Start the FastAPI server

#### macOS/Linux

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Make the start script executable:
   \`\`\`bash
   chmod +x start.sh
   \`\`\`

3. Run the start script:
   \`\`\`bash
   ./start.sh
   \`\`\`

4. The backend API will be available at `http://localhost:8000`

### Docker Setup

1. Build the Docker image:
   \`\`\`bash
   docker build -t freshprice .
   \`\`\`

2. Run the container:
   \`\`\`bash
   docker run -p 3000:3000 -p 8000:8000 freshprice
   \`\`\`

3. Access the application at `http://localhost:3000`

## Data Sources

FreshPrice uses two primary data sources:

1. **monthly_data.csv**: Historical monthly prices for various commodities (2014-2024)
2. **Agriculture_commodities_dataset.csv**: Detailed market data including:
   - APMC (market) information
   - Commodity details
   - Arrival quantities
   - Price ranges (min, max, modal)
   - Location data (district, state)

If these files are not available, the application will use mock data for demonstration purposes.

## Usage Guide

### Generating Price Forecasts

1. From the home page, select a commodity from the dropdown menu
2. Click "Generate Forecast" to view the forecast results
3. Navigate between tabs to view different types of analysis:
   - **Price Forecast**: Long-term price predictions
   - **ML Model Prediction**: Next-month price prediction with factors
   - **Market Insights**: Market analysis and recommendations

### Interpreting Results

- **Price Trend**: Indicates whether prices are expected to increase, decrease, or remain stable
- **Price Volatility**: Shows how much prices are expected to fluctuate
- **Seasonal Patterns**: Identifies the best months for buying and selling
- **Market Recommendations**: Provides actionable insights based on the analysis

## Development

### Project Structure

\`\`\`
freshprice/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── forecast/         # Forecast pages
│   └── page.tsx          # Home page
├── backend/              # Python backend
│   ├── main.py           # FastAPI server
│   └── requirements.txt  # Python dependencies
├── components/           # React components
├── lib/                  # Utility functions
├── public/               # Static assets and data files
│   ├── monthly_data.csv
│   └── Agriculture_commodities_dataset.csv
└── scripts/              # Helper scripts
    └── generate_model_pickle.py
\`\`\`

### Adding New Features

To add new features to FreshPrice:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Submit a pull request

### Data Updates

To update the data sources:

1. Replace the CSV files in the `public` directory
2. Run the model generation script:
   \`\`\`bash
   python scripts/generate_model_pickle.py
   \`\`\`

## Troubleshooting

### Common Issues

1. **Missing Data Files**:
   - Ensure CSV files are in the `public` directory
   - If files are missing, the application will use mock data

2. **Backend Connection Issues**:
   - Verify the backend server is running
   - Check for any CORS or network issues

3. **Model Generation Errors**:
   - Ensure Python dependencies are installed
   - Check CSV file format and structure

### Getting Help

If you encounter any issues:

1. Check the [issues page](https://github.com/yourusername/freshprice/issues)
2. Submit a new issue with detailed information about the problem

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data sources: Agricultural Market Intelligence
- UI components: shadcn/ui
- Icons: Lucide React
