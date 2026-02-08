import pandas as pd
from src.preprocessing import load_data, preprocess
import joblib

# Load and preprocess data to get feature names
df = load_data('data/clean_data.csv')
X, y = preprocess(df)

print("="*60)
print("FEATURE NAMES AFTER PREPROCESSING")
print("="*60)
for i, col in enumerate(X.columns):
    print(f"{i:2d}. {col}")

print(f"\nTotal features: {len(X.columns)}")

# Load model and check
model = joblib.load('model/churn_model.pkl')
print(f"\nModel expects: {model.n_features_in_} features")

# Save feature names for reference
with open('model/feature_names.txt', 'w') as f:
    f.write('\n'.join(X.columns.tolist()))
print("\nFeature names saved to model/feature_names.txt")
