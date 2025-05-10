from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
import pandas as pd
import numpy as np
from statsmodels.tsa.statespace.sarimax import SARIMAX
import joblib
import os
from datetime import datetime, timedelta
import uvicorn
from pydantic import BaseModel

app = FastAPI(title="FreshPrice API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SCRIPTS_DIR = os.path.join(BASE_DIR, "..", "scripts")

DATA_PATH = os.path.join(SCRIPTS_DIR, "monthly_data.csv")
MODEL_PATH = os.path.join(SCRIPTS_DIR, "model.pkl")
AGRICULTURE_DATA_PATH = os.path.join(SCRIPTS_DIR, "Agriculture_commodities_dataset.csv")

# Load model
try:
    model = joblib.load(MODEL_PATH)
    print("ML Model loaded successfully.")
except FileNotFoundError:
    print(f"ML model file not found at {MODEL_PATH}! Please run the generate_model_pickle.py script.")
    model = None
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Load data from CSV
try:
    df = pd.read_csv(DATA_PATH)
    print("Monthly data CSV loaded successfully.")
    
    # Data preprocessing for SARIMAX forecasting
    if df is not None:
        df_processed = df.copy()
        df_processed.set_index('Commodities', inplace=True)
        df_processed = df_processed.T
        df_processed.index = pd.date_range(start='2014-01', periods=len(df_processed), freq='M')
        df_processed = df_processed.ffill()  # Forward fill to handle missing data
    else:
        df_processed = None
except FileNotFoundError:
    print(f"CSV file not found: {DATA_PATH}")
    df = None
    df_processed = None
except Exception as e:
    print(f"Error loading CSV data: {e}")
    df = None
    df_processed = None

# Load agriculture dataset
try:
    agriculture_df = pd.read_csv(AGRICULTURE_DATA_PATH)
    print("Agriculture dataset CSV loaded successfully.")
except FileNotFoundError:
    print(f"Agriculture dataset file not found: {AGRICULTURE_DATA_PATH}")
    agriculture_df = None
except Exception as e:
    print(f"Error loading agriculture dataset: {e}")
    agriculture_df = None

# Pydantic models for response types
class PriceForecast(BaseModel):
    date: str
    forecast: float

class HistoricalPrice(BaseModel):
    date: str
    value: float

class ForecastResponse(BaseModel):
    historical: List[HistoricalPrice]
    forecast: List[PriceForecast]
    rmse: float

class Factor(BaseModel):
    factor: str
    impact: float

class ModelPrediction(BaseModel):
    commodity: str
    predicted_price: float
    confidence: float
    factors: List[Factor]
    trend: str
    trend_percentage: float

class Market(BaseModel):
    apmc: str
    state: str
    price: float
    arrivals: float

class PriceRange(BaseModel):
    min: float
    max: float
    avg: float

class Seasonality(BaseModel):
    bestMonth: str
    worstMonth: str
    volatilityScore: float

class MarketInsights(BaseModel):
    commodity: str
    topMarkets: List[Market]
    priceRange: PriceRange
    seasonality: Seasonality
    supplyTrend: str

@app.get("/")
def read_root():
    return {"message": "Welcome to FreshPrice API"}

@app.get("/commodities", response_model=List[str])
def get_commodities():
    if df is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    return df["Commodities"].tolist()

@app.get("/forecast/{commodity}", response_model=ForecastResponse)
def get_forecast(commodity: str):
    if df_processed is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    if commodity not in df_processed.columns:
        raise HTTPException(status_code=404, detail=f"Commodity {commodity} not found")
    
    try:
        # Get historical data
        data = df_processed[commodity]
        
        # Train SARIMAX model
        model_sarimax = SARIMAX(data, order=(1, 1, 1), seasonal_order=(1, 1, 0, 12))
        sarimax_model = model_sarimax.fit(disp=False)
        
        # Forecast for 5 years (60 months)
        forecast = sarimax_model.get_forecast(steps=12 * 5)  # 5 years forecast
        forecasted_values = forecast.predicted_mean
        
        # Create forecast dates
        forecast_years = pd.date_range(start='2025-01', periods=12 * 5, freq='M')
        
        # Calculate RMSE for training
        train_rmse = np.sqrt(((data - sarimax_model.fittedvalues) ** 2).mean())
        
        # Format historical data
        historical_data = [
            {"date": date.isoformat(), "value": float(value)}
            for date, value in zip(data.index, data.values)
        ]
        
        # Format forecast data
        forecast_data = [
            {"date": date.isoformat(), "forecast": float(value)}
            for date, value in zip(forecast_years, forecasted_values)
        ]
        
        return {
            "historical": historical_data,
            "forecast": forecast_data,
            "rmse": float(train_rmse)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating forecast: {str(e)}")

@app.get("/model-prediction/{commodity}", response_model=ModelPrediction)
def get_model_prediction(commodity: str):
    if model is None:
        raise HTTPException(status_code=500, detail="ML model not loaded")
    
    try:
        # In a real implementation, this would use the loaded ML model to make predictions
        # For now, we'll simulate the model prediction with realistic data
        
        # Use the model to predict price (simulated)
        predicted_price = 2000 + np.random.rand() * 3000
        confidence = 70 + np.random.rand() * 25
        
        # Determine trend
        trend_options = ["up", "down", "stable"]
        trend = np.random.choice(trend_options)
        trend_percentage = (
            np.random.rand() * 2 if trend == "stable"
            else (2 + np.random.rand() * 8) if trend == "up"
            else -(2 + np.random.rand() * 8)
        )
        
        # Identify factors affecting price
        factors = [
            {"factor": "Seasonal demand", "impact": np.random.rand() * 0.4},
            {"factor": "Supply chain disruptions", "impact": np.random.rand() * 0.3},
            {"factor": "Weather conditions", "impact": np.random.rand() * 0.5},
            {"factor": "Market speculation", "impact": np.random.rand() * 0.2}
        ]
        
        return {
            "commodity": commodity,
            "predicted_price": float(predicted_price),
            "confidence": float(confidence),
            "factors": factors,
            "trend": trend,
            "trend_percentage": float(trend_percentage)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating model prediction: {str(e)}")

@app.get("/market-insights/{commodity}", response_model=MarketInsights)
def get_market_insights(commodity: str):
    if agriculture_df is None:
        raise HTTPException(status_code=500, detail="Agriculture dataset not loaded")
    
    try:
        # In a real implementation, this would analyze the agriculture dataset
        # For now, we'll simulate market insights with realistic data
        
        # Generate top markets
        top_markets = [
            {"apmc": "Ahmednagar", "state": "Maharashtra", "price": 1800 + np.random.rand() * 500, "arrivals": 1000 + np.random.rand() * 3000},
            {"apmc": "Kota", "state": "Rajasthan", "price": 1700 + np.random.rand() * 500, "arrivals": 800 + np.random.rand() * 2000},
            {"apmc": "Indore", "state": "Madhya Pradesh", "price": 1750 + np.random.rand() * 500, "arrivals": 1200 + np.random.rand() * 2500}
        ]
        
        # Generate price range
        price_range = {
            "min": 1500 + np.random.rand() * 300,
            "max": 2200 + np.random.rand() * 500,
            "avg": 1800 + np.random.rand() * 400
        }
        
        # Generate seasonality data
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        seasonality = {
            "bestMonth": np.random.choice(months),
            "worstMonth": np.random.choice(months),
            "volatilityScore": np.random.rand() * 10
        }
        
        # Generate supply trend
        supply_trend = np.random.choice(["increasing", "decreasing", "stable"])
        
        return {
            "commodity": commodity,
            "topMarkets": top_markets,
            "priceRange": price_range,
            "seasonality": seasonality,
            "supplyTrend": supply_trend
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating market insights: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
