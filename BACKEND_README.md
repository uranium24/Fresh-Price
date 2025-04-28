# FreshPrice Backend Architecture

## Overview

The FreshPrice backend is a Python-based system that provides agricultural commodity price forecasting and market insights through a FastAPI REST API. It uses statistical models and machine learning to predict future prices and analyze market trends.

## Architecture

The backend consists of the following components:

1. **FastAPI Server**: Provides RESTful API endpoints for the frontend
2. **Data Processing Pipeline**: Handles CSV data loading and preprocessing
3. **Forecasting Engine**: Uses SARIMAX time series models for price forecasting
4. **Machine Learning Model**: Random Forest regressor for price prediction
5. **Market Analysis Module**: Analyzes agricultural market data for insights

## Data Sources

The backend uses two primary data sources:

### 1. Monthly Price Data (`monthly_data.csv`)

This dataset contains historical monthly prices for various agricultural commodities from January 2014 to September 2024. The data is structured with:

- Commodity names as rows
- Monthly timestamps as columns (e.g., Jan-14, Feb-14)
- Price values in the cells

This dataset is used for time series forecasting using the SARIMAX model.

### 2. Agricultural Market Data (`Agriculture_commodities_dataset.csv`)

This dataset contains detailed market information with the following structure:

\`\`\`
APMC,Commodity,Year,Month,arrivals_in_qtl,min_price,max_price,modal_price,date,district_name,state_name
\`\`\`

Key fields:
- **APMC**: Agricultural Produce Market Committee (market name)
- **Commodity**: Name of the agricultural product
- **arrivals_in_qtl**: Supply quantity in quintals
- **min_price/max_price/modal_price**: Price information
- **district_name/state_name**: Location information

This dataset is used for market analysis and as training data for the machine learning model.

## Machine Learning Model

The backend uses a Random Forest regression model for price prediction:

- **Model Type**: Random Forest Regressor
- **Features**: APMC, Commodity, Month, district_name, state_name, and other numerical features
- **Target Variable**: modal_price
- **Training Process**: The model is trained on historical data with an 80/20 train/test split
- **Preprocessing**: Uses MinMaxScaler for numerical features and LabelEncoder for categorical features
- **Serialization**: The trained model is serialized using joblib and stored as `model.pkl`

The model provides:
- Price predictions
- Confidence scores
- Feature importance analysis
- Trend analysis

## Time Series Forecasting

For long-term price forecasting, the backend uses:

- **Model**: SARIMAX (Seasonal AutoRegressive Integrated Moving Average with eXogenous factors)
- **Configuration**: Order (1,1,1), Seasonal Order (1,1,0,12)
- **Forecast Horizon**: 5 years (60 months)
- **Evaluation Metric**: RMSE (Root Mean Square Error)

## API Endpoints

The backend exposes the following RESTful API endpoints:

### 1. `/commodities` (GET)
Returns a list of all available commodities.

**Response:**
\`\`\`json
["Rice", "Wheat", "Maize", ...]
\`\`\`

### 2. `/forecast/{commodity}` (GET)
Generates a 5-year price forecast for the specified commodity.

**Response:**
\`\`\`json
{
  "historical": [
    {"date": "2014-01-01T00:00:00", "value": 14.05},
    ...
  ],
  "forecast": [
    {"date": "2025-01-01T00:00:00", "forecast": 22.78},
    ...
  ],
  "rmse": 0.1234
}
\`\`\`

### 3. `/model-prediction/{commodity}` (GET)
Provides ML model predictions for the specified commodity.

**Response:**
\`\`\`json
{
  "commodity": "Rice",
  "predicted_price": 2345.67,
  "confidence": 87.5,
  "factors": [
    {"factor": "Seasonal demand", "impact": 0.32},
    ...
  ],
  "trend": "up",
  "trend_percentage": 4.2
}
\`\`\`

### 4. `/market-insights/{commodity}` (GET)
Provides market analysis for the specified commodity.

**Response:**
\`\`\`json
{
  "commodity": "Rice",
  "topMarkets": [
    {"apmc": "Ahmednagar", "state": "Maharashtra", "price": 2145.67, "arrivals": 2500},
    ...
  ],
  "priceRange": {"min": 1800, "max": 2400, "avg": 2100},
  "seasonality": {
    "bestMonth": "March",
    "worstMonth": "August",
    "volatilityScore": 6.7
  },
  "supplyTrend": "increasing"
}
\`\`\`

## Data Processing Pipeline

The backend implements the following data processing steps:

1. **Data Loading**: CSV files are loaded using pandas
2. **Data Cleaning**: Missing values are handled using forward fill
3. **Feature Engineering**: Date parsing, categorical encoding, and numerical scaling
4. **Time Series Preprocessing**: Conversion to time series format with proper indexing
5. **Model Input Preparation**: Data transformation for ML model input

## Error Handling

The backend implements robust error handling:

- **Data Validation**: Input validation using Pydantic models
- **Exception Handling**: Structured error responses with appropriate HTTP status codes
- **Logging**: Comprehensive logging for debugging and monitoring

## Deployment

The backend can be deployed as:

1. **Standalone Service**: Using uvicorn or gunicorn
2. **Docker Container**: Using the provided Dockerfile
3. **Serverless Function**: For cloud deployment (AWS Lambda, Azure Functions, etc.)

## Development Setup

To set up the backend for development:

1. Create a virtual environment:
   \`\`\`
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

2. Install dependencies:
   \`\`\`
   pip install -r backend/requirements.txt
   \`\`\`

3. Run the development server:
   \`\`\`
   cd backend
   python main.py
   \`\`\`

4. Access the API documentation at `http://localhost:8000/docs`

## Performance Considerations

- The backend caches commodity lists and frequently accessed data
- Heavy computations (model training) are performed offline
- API responses are optimized for size and speed
- The SARIMAX model fitting is computationally intensive and may take time for large datasets

## Future Enhancements

Planned backend enhancements include:

1. **Advanced Models**: Integration of deep learning models (LSTM, Transformer)
2. **Real-time Data**: Integration with real-time market data sources
3. **Automated Retraining**: Scheduled model retraining with new data
4. **Distributed Processing**: Scaling for larger datasets using distributed computing
5. **Weather Data Integration**: Incorporating weather forecasts for improved predictions

## Troubleshooting

Common issues and solutions:

1. **Missing Model File**: Run `python scripts/generate_model_pickle.py` to generate the model
2. **Data Loading Errors**: Ensure CSV files are in the correct location and format
3. **API Connection Issues**: Check network settings and CORS configuration
4. **Model Prediction Errors**: Verify input data format matches training data

## Technical Debt and Limitations

Current limitations to be addressed in future versions:

1. **Limited Historical Data**: The model accuracy is constrained by available historical data
2. **Simplified Market Factors**: The current model doesn't account for all market factors
3. **Mock Data Fallbacks**: Some endpoints use mock data when actual data is unavailable
4. **Limited Geographical Coverage**: The model focuses on specific regions and markets
