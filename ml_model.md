## Machine Learning Algorithms

The FreshPrice platform leverages two powerful machine learning algorithms to provide accurate price forecasts and predictions: SARIMAX for time-series forecasting and Random Forest Regressor for feature-based price prediction.

### SARIMAX (Seasonal AutoRegressive Integrated Moving Average with eXogenous factors)

#### What is SARIMAX?
SARIMAX is an advanced time series forecasting algorithm that extends the ARIMA model by incorporating:
- **Seasonality (S)**: Accounts for recurring patterns at fixed intervals (e.g., monthly or yearly price cycles in agricultural commodities)
- **AutoRegressive (AR)**: Uses the relationship between an observation and a number of lagged observations
- **Integrated (I)**: Applies differencing to make the time series stationary
- **Moving Average (MA)**: Uses the dependency between an observation and residual errors from a moving average model
- **eXogenous factors (X)**: Incorporates external variables that influence the target variable (e.g., rainfall, temperature)

#### Implementation in FreshPrice
In `backend/main.py`, the SARIMAX model is implemented using the `statsmodels` library:

\`\`\`python
from statsmodels.tsa.statespace.sarimax import SARIMAX

# Model configuration
order = (p, d, q)  # AR, differencing, and MA parameters
seasonal_order = (P, D, Q, S)  # Seasonal AR, differencing, MA, and periodicity

# Model training
model = SARIMAX(
    historical_prices,
    order=order,
    seasonal_order=seasonal_order,
    exog=external_factors
)
model_fit = model.fit(disp=False)

# Forecasting
forecast = model_fit.forecast(steps=forecast_horizon, exog=future_external_factors)
\`\`\`

#### Benefits for Agricultural Price Forecasting
- **Captures Seasonality**: Agricultural commodities often follow seasonal patterns due to harvest cycles, which SARIMAX explicitly models
- **Handles Trends**: Can model long-term price trends in commodities markets
- **Incorporates External Factors**: Can include weather data, fuel prices, and other factors that influence agricultural prices
- **Provides Confidence Intervals**: Generates prediction intervals to quantify forecast uncertainty
- **Interpretable Components**: Allows decomposition of the forecast into trend, seasonal, and residual components

### Random Forest Regressor

#### What is Random Forest Regressor?
Random Forest Regressor is an ensemble learning method that:
- Constructs multiple decision trees during training
- Outputs the average prediction of individual trees for regression tasks
- Uses bootstrap aggregating (bagging) to improve stability and accuracy
- Reduces overfitting by averaging multiple decision trees

#### Implementation in FreshPrice
In `backend/main.py`, the Random Forest model is implemented using `scikit-learn`:

\`\`\`python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Feature engineering
X = feature_matrix  # Market data, weather, previous prices, etc.
y = target_prices    # Target commodity prices

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model training
model = RandomForestRegressor(
    n_estimators=100,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    random_state=42
)
model.fit(X_train, y_train)

# Prediction and evaluation
predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

# Feature importance
feature_importance = model.feature_importances_
\`\`\`

#### Benefits for Agricultural Price Prediction
- **Handles Non-Linear Relationships**: Captures complex relationships between factors affecting agricultural prices
- **Feature Importance**: Identifies which factors most strongly influence commodity prices
- **Robust to Outliers**: Less sensitive to extreme price fluctuations caused by unusual market events
- **Handles Mixed Data Types**: Can process both numerical and categorical features (e.g., market locations, commodity varieties)
- **Requires Less Data Preprocessing**: Does not require data normalization or assumption of normal distribution

### Complementary Approach

The FreshPrice platform strategically employs both algorithms to provide comprehensive price intelligence:

1. **SARIMAX for Long-Term Forecasting**:
   - Generates 5-year price forecasts based on historical patterns
   - Captures seasonal cycles in agricultural production
   - Provides structured time-series predictions with confidence intervals

2. **Random Forest for Short-Term Prediction**:
   - Predicts short-term price movements based on current market conditions
   - Identifies key factors influencing immediate price changes
   - Adapts quickly to changing market dynamics

3. **Hybrid Approach Benefits**:
   - **Complementary Strengths**: SARIMAX excels at capturing temporal patterns, while Random Forest excels at handling complex feature interactions
   - **Validation Mechanism**: Predictions from both models can be compared to increase confidence
   - **Different Time Horizons**: Provides both long-term planning insights and short-term tactical guidance
   - **Comprehensive Analysis**: Combines pattern-based forecasting with factor-based prediction

### Model Training and Evaluation

The models are trained and evaluated in `scripts/generate_model_pickle.py`:

1. **Data Preparation**:
   - Historical price data is cleaned and preprocessed
   - Features are engineered from raw agricultural data
   - Time-based train-test splits are created to simulate real forecasting scenarios

2. **Hyperparameter Tuning**:
   - Grid search is used to find optimal SARIMAX parameters (p, d, q, P, D, Q, S)
   - Random Forest hyperparameters are tuned using cross-validation

3. **Model Evaluation**:
   - Mean Absolute Percentage Error (MAPE) for accuracy assessment
   - Root Mean Squared Error (RMSE) for error magnitude
   - Directional Accuracy for trend prediction capability
   - R-squared for explained variance

4. **Model Serialization**:
   - Trained models are serialized using pickle
   - Models are stored for later use by the API endpoints

This dual-algorithm approach provides FreshPrice users with both statistical confidence in long-term trends and data-driven insights into immediate market factors, creating a powerful decision support system for agricultural stakeholders.

## Future Enhancements
