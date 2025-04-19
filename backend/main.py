from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import pandas as pd
import numpy as np
from statsmodels.tsa.statespace.sarimax import SARIMAX
import joblib
import os
from datetime import datetime, timedelta
import uvicorn

app = FastAPI(title="FreshPrice API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, "..", "public")
DATA_PATH = os.path.join(PUBLIC_DIR, "../public/monthly_data.csv")
MODEL_PATH = os.path.join(PUBLIC_DIR, "model.pkl")

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
    print("CSV Data loaded successfully.")
    
    # Data preprocessing for SARIMAX forecasting
    if df is not None:
        df_processed = df.copy()
        df_processed.set_index('Commodities', inplace=True)
        df_processed = df_processed.T
        df_processed.index = pd.date_range(start='2014-01', periods=len(df_processed), freq='ME')
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

@app.get("/")
def read_root():
    return {"message": "Welcome to FreshPrice API"}

@app.get("/commodities", response_model=List[str])
def get_commodities():
    if df is None:
        raise HTTPException(status_code=500, detail="Data not loaded")
    
    return df["Commodities"].tolist()

@app.get("/forecast/{commodity}")
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

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
