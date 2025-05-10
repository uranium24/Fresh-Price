import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import os
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error, mean_absolute_percentage_error

def main():
    print("Loading data...")
    # Load the dataset
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, "Agriculture_commodities_dataset.csv")

    # Load the file
    df = pd.read_csv(csv_path)
    
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
    # Inside main():
    output_dir = script_dir  # Or use a subdirectory like "models/"
    joblib.dump(classifier, os.path.join(output_dir, 'model.pkl'))
    joblib.dump(le, os.path.join(output_dir, 'label_encoder.pkl'))
    joblib.dump(mn, os.path.join(output_dir, 'min_max_scaler.pkl'))
    print(f"Files saved to: {output_dir}")
    
    # Test prediction
    y_pred = classifier.predict(x_test)
    
    # Evaluation metrics
    r2 = r2_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    mape = mean_absolute_percentage_error(y_test, y_pred)
    rmse = np.sqrt(mse)

    # Print out the evaluation metrics
    print(f"Model saved successfully! R² Score: {r2:.4f}, MSE: {mse:.4f}, MAE: {mae:.4f}, RMSE: {rmse:.4f}, MAPE: {mape:.4f}")

if __name__ == "__main__":
    main()
