# FreshPrice: Agricultural Price Prediction Platform

FreshPrice is a comprehensive web application designed to provide accurate price forecasts for agricultural commodities. It combines historical data analysis, machine learning predictions, and market insights to help farmers, traders, and buyers make informed decisions.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
  - [App Directory](#app-directory)
  - [Components Directory](#components-directory)
  - [Lib Directory](#lib-directory)
  - [Backend Directory](#backend-directory)
  - [Public Directory](#public-directory)
  - [Scripts Directory](#scripts-directory)
- [Data Flow](#data-flow)
- [Installation and Setup](#installation-and-setup)
- [Future Enhancements](#future-enhancements)

## Project Overview

FreshPrice provides three main features:
1. **Price Forecasting**: Time-series forecasting for agricultural commodity prices over the next 5 years
2. **ML Model Predictions**: Short-term price predictions with confidence scores and influencing factors
3. **Market Insights**: Analysis of top markets, price ranges, seasonality, and supply trends

The application uses historical price data from Indian agricultural markets (APMCs) to generate forecasts and insights.

## Technology Stack

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Next.js** | Frontend framework | Server-side rendering capabilities, file-based routing, and API routes in a single framework |
| **React** | UI library | Component-based architecture for reusable UI elements |
| **TypeScript** | Programming language | Type safety, better developer experience, and reduced runtime errors |
| **Tailwind CSS** | Styling | Utility-first approach for rapid UI development without leaving HTML |
| **shadcn/ui** | UI components | High-quality, accessible components that work with Tailwind CSS |
| **Python** | Backend ML processing | Rich ecosystem of data science and machine learning libraries |
| **CSV Parse** | Data processing | Efficient parsing of CSV files for data extraction |
| **Canvas API** | Data visualization | Lightweight solution for custom charts without heavy dependencies |
| **date-fns** | Date manipulation | Modular approach to date formatting and manipulation |

### Why This Stack Over Alternatives

- **Next.js vs. Create React App**: Next.js provides server-side rendering and API routes, crucial for data-heavy applications
- **Tailwind vs. Material UI/Bootstrap**: Tailwind offers more customization without opinionated design systems
- **Canvas API vs. Chart.js/D3**: Lower bundle size and more control for specific visualization needs
- **Python backend vs. Node.js only**: Python's data science ecosystem (NumPy, Pandas, scikit-learn) is more mature for ML tasks

## Project Structure

### App Directory

The `/app` directory uses Next.js App Router structure:

#### `/app/page.tsx`
- **Purpose**: Main landing page with the commodity selection form
- **Imports**: `HomeForm` component from `@/components/home-form`
- **Function**: Renders the main entry point with a gradient background and the form component

#### `/app/layout.tsx`
- **Purpose**: Root layout that wraps all pages
- **Imports**: `Inter` font, `ThemeProvider` for dark/light mode
- **Function**: Sets up the HTML structure, metadata, and theme provider for the entire application

#### `/app/forecast/[commodity]/page.tsx`
- **Purpose**: Dynamic route for displaying forecast results for a specific commodity
- **Imports**: `ForecastResults` component, `generateForecast` function
- **Function**: Server component that fetches forecast data and passes it to the client component

#### `/app/api/commodities/route.ts`
- **Purpose**: API endpoint to fetch available commodities
- **Imports**: `getCommoditiesFromCsv` from CSV parser utility
- **Function**: Returns a list of all commodities from the dataset

#### `/app/api/forecast/[commodity]/route.ts`
- **Purpose**: API endpoint to generate forecast for a specific commodity
- **Imports**: `generateForecast` function from forecast utility
- **Function**: Returns forecast data, historical data, and accuracy metrics

#### `/app/api/model-prediction/[commodity]/route.ts`
- **Purpose**: API endpoint for ML model predictions
- **Imports**: NextResponse for API handling
- **Function**: Simulates ML model predictions with realistic data (would connect to Python backend in production)

#### `/app/api/market-insights/[commodity]/route.ts`
- **Purpose**: API endpoint for market insights
- **Imports**: Market data utility functions from `@/lib/agriculture-data`
- **Function**: Returns market insights including top markets, price ranges, seasonality, and supply trends

### Components Directory

#### `/components/theme-provider.tsx`
- **Purpose**: Provides theme context for dark/light mode
- **Imports**: `next-themes` package
- **Function**: Client component that wraps the application with theme context

#### `/components/theme-toggle.tsx`
- **Purpose**: Button to toggle between dark and light modes
- **Imports**: `useTheme` hook, `Button` component, Lucide icons
- **Function**: Client component that toggles the theme and handles hydration

#### `/components/home-form.tsx`
- **Purpose**: Main form for selecting a commodity
- **Imports**: React hooks, Next.js router, UI components, API functions
- **Function**: Client component that fetches commodities and handles form submission

#### `/components/forecast-results.tsx`
- **Purpose**: Container for all forecast-related components
- **Imports**: Various forecast components, tabs component
- **Function**: Client component that organizes the forecast page with tabs for different sections

#### `/components/forecast-chart.tsx`
- **Purpose**: Visual chart of historical and forecast data
- **Imports**: `useTheme` hook, React refs
- **Function**: Client component that renders a custom Canvas chart with historical and forecast data

#### `/components/forecast-table.tsx`
- **Purpose**: Tabular display of forecast data
- **Imports**: Table components, `date-fns` for formatting
- **Function**: Client component that displays forecast data in a structured table

#### `/components/forecast-analysis.tsx`
- **Purpose**: Analysis of forecast trends and patterns
- **Imports**: Card components, Lucide icons
- **Function**: Client component that analyzes forecast data for trends, volatility, and seasonality

#### `/components/model-prediction.tsx`
- **Purpose**: Display ML model predictions
- **Imports**: React hooks, Card components, Lucide icons
- **Function**: Client component that fetches and displays ML model predictions

#### `/components/market-insights.tsx`
- **Purpose**: Display market insights and analysis
- **Imports**: Tabs components, API functions
- **Function**: Client component that fetches and displays market insights with tabs for different aspects

### Lib Directory

#### `/lib/csv-parser.ts`
- **Purpose**: Utilities for parsing CSV data files
- **Imports**: `fs`, `path`, `csv-parse/sync`
- **Function**: Reads and parses CSV files, extracts commodities and historical data

#### `/lib/forecast.ts`
- **Purpose**: Time-series forecasting algorithms
- **Imports**: CSV parser functions
- **Function**: Implements a simplified SARIMAX algorithm for time-series forecasting

#### `/lib/agriculture-data.ts`
- **Purpose**: Functions for agricultural market data analysis
- **Imports**: `fs`, `path`, `csv-parse/sync`
- **Function**: Provides functions to analyze market data, find top markets, price ranges, etc.

#### `/lib/api.ts`
- **Purpose**: Client-side API functions
- **Imports**: Not shown in the code snippet
- **Function**: Provides functions to call the application's API endpoints

### Backend Directory

#### `/backend/requirements.txt`
- **Purpose**: Python dependencies for the ML backend
- **Function**: Lists required Python packages for the ML model

#### `/backend/start.sh` and `/backend/start.bat`
- **Purpose**: Scripts to start the Python backend
- **Function**: Platform-specific scripts to launch the Python server

#### `/backend/main.py`
- **Purpose**: Main Python backend for ML models
- **Function**: Implements the ML model API for price predictions

### Public Directory

#### `/public/monthly_data.csv`
- **Purpose**: Historical price data for commodities
- **Function**: Provides the raw data for forecasting and analysis

### Scripts Directory

#### `/scripts/generate_model_pickle.py`
- **Purpose**: Script to generate serialized ML models
- **Function**: Trains and saves ML models for use in the application

#### `/scripts/monthly_data.csv` and `/scripts/Agriculture_commodities_dataset.csv`
- **Purpose**: Data files for script processing
- **Function**: Provides data for the model generation scripts

## Data Flow

The application follows this general data flow:

1. **User Selection**: User selects a commodity on the home page
2. **Data Fetching**: 
   - Historical data is fetched from CSV files
   - Forecast is generated using the SARIMAX algorithm
   - Market insights are calculated from agricultural datasets
3. **Visualization**: Data is displayed through charts, tables, and analysis cards
4. **ML Predictions**: For short-term predictions, the application would connect to the Python backend (simulated in the current version)

### Key Connections:

- **Home Form → Forecast Page**: User selection triggers navigation to the forecast page
- **Forecast Page → API Routes**: Server component fetches data from API routes
- **API Routes → Lib Functions**: API routes use utility functions to process data
- **Lib Functions → CSV Files**: Utility functions read and parse CSV data
- **Components → API Functions**: Client components fetch data using API functions

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/freshprice.git
   cd freshprice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Python environment (for ML backend)**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the Python backend (optional)**
   ```bash
   # In a separate terminal
   cd backend
   ./start.sh  # On Windows: start.bat
   ```

## Future Enhancements

1. **Real ML Integration**: Replace simulated ML predictions with actual model predictions
2. **Real-time Data**: Integrate with real-time agricultural market APIs
3. **User Accounts**: Allow users to save favorite commodities and receive alerts
4. **Mobile App**: Develop a companion mobile application for on-the-go access
5. **Regional Insights**: Add region-specific forecasts and recommendations

---

This project demonstrates the power of combining modern web technologies with data science to create practical solutions for agricultural stakeholders.
```

I've added the comprehensive README.md file to your project. This file provides detailed documentation about:

1. The overall project structure and purpose
2. The technology stack and why each technology was chosen
3. A detailed breakdown of each file in every directory
4. The data flow between components
5. Installation and setup instructions
6. Future enhancement possibilities

This README will be extremely helpful for:
- New developers joining the project
- Understanding the architecture at a glance
- Documentation for future reference
- Explaining the project to stakeholders or in a portfolio

<Actions>
  <Action name="Add project screenshots to README" description="Enhance the README with screenshots of the application" />
  <Action name="Create a contributing guide" description="Add a CONTRIBUTING.md file with guidelines for contributors" />
  <Action name="Add API documentation" description="Create detailed API documentation for the endpoints" />
  <Action name="Create a deployment guide" description="Add instructions for deploying the application" />
  <Action name="Add license information" description="Include license information in the README" />
</Actions>

```

