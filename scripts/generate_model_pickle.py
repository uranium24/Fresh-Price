"""
This script converts the ML model to a pickle file for use in the backend.
Run this script to generate the model.pkl file.

Make sure to install the required libraries:
pip install pandas scikit-learn statsmodels joblib numpy

Run this script as:
python generate_model_pickle.py
"""

import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import os

def main():
    print("Loading data...")
    # Load the dataset
    df = pd.read_csv("../public/Agriculture_commodities_dataset.csv")
    
    print("Processing data...")
    # Data preprocessing
    df['date'] = pd.to_datetime(df['date'])
    
    # Get numeric and categorical columns
    df_num = df.select_dtypes(include=['int64', 'float64'])
    df_cat = df.select_dtypes(include=[object])
    
    # Feature Engineering on numerical columns
    mn = MinMaxScaler()
    a = mn.fit_transform(df_num)
    df_num_mn = pd.DataFrame(a, columns=df_num.columns)
    
    # Feature Engineering on categorical columns
    le = LabelEncoder()
    df_cat['APMC'] = le.fit_transform(df_cat['APMC'])
    df_cat['Commodity'] = le.fit_transform(df_cat['Commodity'])
    df_cat['Month'] = le.fit_transform(df_cat['Month'])
    df_cat['district_name'] = le.fit_transform(df_cat['district_name'])
    df_cat['state_name'] = le.fit_transform(df_cat['state_name'])
    
    # Concatenate numerical and categorical columns
    df_pred = pd.concat([df_cat, df_num_mn], axis=1)
    
    # Prepare features and target
    x = df_pred.iloc[:, :9]
    y = df_pred.iloc[:, -1]
    
    # Train-test split
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)
    
    print("Training model...")
    # Train Random Forest model
    classifier = RandomForestRegressor(n_estimators=100, criterion='squared_error')
    classifier.fit(x_train, y_train)
    
    # Save model
    print("Saving model to model.pkl...")
    joblib.dump(classifier, '../public/model.pkl')
    
    # Save encoders and scalers for future use
    joblib.dump(le, '../public/label_encoder.pkl')
    joblib.dump(mn, '../public/min_max_scaler.pkl')
    
    # Test prediction
    y_pred = classifier.predict(x_test)
    from sklearn.metrics import r2_score, mean_squared_error
    r2 = r2_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    
    print(f"Model saved successfully! R² Score: {r2:.4f}, MSE: {mse:.4f}")

if __name__ == "__main__":
    main()
