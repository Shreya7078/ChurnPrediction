# Customer Churn Prediction System

An end-to-end Machine Learning application designed to predict customer churn risk in the telecom industry. The system integrates a trained Logistic Regression model with a Flask REST API backend and a React-based interactive dashboard.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Dataset](#dataset)
- [Model Details](#model-details)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)

## Project Overview

Customer churn is a critical business challenge in the telecom industry. This project predicts whether a customer is likely to leave based on:
- Service usage patterns
- Contract type and tenure
- Billing preferences
- Demographic information

The application provides real-time churn probability predictions with risk classification (High Risk / Low Risk) through an intuitive web interface.

## Key Features

- **End-to-End ML Pipeline** - From data preprocessing to model deployment
- **Real-time Predictions** - Instant churn probability calculation via REST API
- **Interactive Dashboard** - Modern React UI with data visualization
- **Comprehensive Validation** - Input validation and error handling
- **Visual Results** - Pie chart visualization of churn risk
- **Responsive Design** - Works seamlessly on desktop and mobile
- **14-Feature Model** - Includes demographic and service usage features

## Tech Stack

### Frontend
- **React** - UI library with Vite for fast development
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **React Router** - Client-side routing

### Backend
- **Python 3.8+** - Programming language
- **Flask** - Lightweight web framework
- **Flask-CORS** - Cross-origin resource sharing
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **joblib** - Model serialization

### Machine Learning
- **Algorithm** - Logistic Regression with hyperparameter tuning
- **Preprocessing** - One-hot encoding with `pd.get_dummies()`
- **Features** - 14 engineered features
- **Evaluation** - Precision, Recall, F1-Score optimization

## Project Structure

```
ChurnPrediction/
├── backend/
│   ├── app.py                      # Flask API server
│   ├── main.py                     # Model training script
│   ├── get_features.py             # Feature extraction utility
│   ├── requirements.txt            # Python dependencies
│   ├── data/
│   │   └── clean_data.csv         # Preprocessed dataset
│   ├── model/
│   │   ├── churn_model.pkl        # Trained model
│   │   └── feature_names.txt      # Feature list
│   ├── notebooks/
│   │   └── eda.ipynb              # Exploratory Data Analysis
│   ├── src/
│   │   ├── preprocessing.py        # Data preprocessing
│   │   ├── modeling.py             # Model training
│   │   ├── evaluation.py           # Model evaluation
│   │   └── hyperparameter_tuning.py
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page components
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── README.md                       # This file
```

## Quick Start

### Prerequisites

- **Python 3.8+** with pip
- **Node.js 16+** with npm
- Git (optional)

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment (recommended):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   source venv/bin/activate  # Linux/Mac
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Train the model (first time only):
   ```bash
   python main.py
   ```
   This will create `model/churn_model.pkl`

5. Start the Flask server:
   ```bash
   python app.py
   ```
   Server runs on: **http://127.0.0.1:5000**

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend runs on: **http://localhost:5173**

### Using the Application

1. Ensure both backend and frontend servers are running
2. Open your browser to http://localhost:5173
3. Navigate to the "Predict" page
4. Fill in all customer details (10 required fields)
5. Click "Predict Churn" to get the prediction

## Dataset

- **Source**: Telco Customer Churn Dataset
- **Total Records**: 7,043 customers
- **Features**: 11 original features (10 input + 1 target)
- **Target Variable**: Churn (Yes/No)
- **After Preprocessing**: 14 features (one-hot encoded)

### Input Features

1. **Tenure** - Number of months with the company (0-72)
2. **Monthly Charges** - Monthly bill amount
3. **Gender** - Male or Female
4. **Contract** - Month-to-month, One year, Two year
5. **Internet Service** - DSL, Fiber optic, No
6. **Payment Method** - Electronic check, Mailed check, Bank transfer, Credit card
7. **Paperless Billing** - Yes or No
8. **Support Services** - Yes or No
9. **Senior Citizen** - Yes or No
10. **Family** - Yes or No (indicates dependents/partner)

## Model Details

### Algorithm
**Logistic Regression** with GridSearchCV hyperparameter tuning

### Feature Engineering
- One-hot encoding for categorical variables using `pd.get_dummies(drop_first=True)`
- Results in 14 binary/numeric features
- No feature scaling required for this dataset

### Model Performance
Run `python main.py` to see detailed metrics:
- Precision
- Recall
- F1-Score
- Accuracy
- Classification Report

### Feature Importance
The 14 features used by the model (in order):
1. SeniorCitizen
2. tenure
3. MonthlyCharges
4. Family
5. SupportServices
6. gender_Male
7. InternetService_Fiber optic
8. InternetService_No
9. Contract_One year
10. Contract_Two year
11. PaperlessBilling_Yes
12. PaymentMethod_Credit card (automatic)
13. PaymentMethod_Electronic check
14. PaymentMethod_Mailed check

## API Documentation

### Health Check
```
GET http://127.0.0.1:5000/
```

**Response:**
```json
{
  "status": "running",
  "message": "Churn Prediction API is running",
  "model_loaded": true
}
```

### Predict Churn
```
POST http://127.0.0.1:5000/predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "tenure": 12,
  "monthlyCharges": 65.50,
  "gender": "Male",
  "contract": "Month-to-month",
  "internetService": "Fiber optic",
  "paymentMethod": "Electronic check",
  "paperlessBilling": "Yes",
  "supportServices": "Yes",
  "seniorCitizen": "No",
  "family": "Yes"
}
```

**Success Response:**
```json
{
  "churn_probability": 0.73,
  "churn_label": "High Risk"
}
```

**Error Response:**
```json
{
  "error": "Missing required fields: gender"
}
```

## Screenshots

### Prediction Page
The main prediction interface where users input customer details and receive churn probability predictions with visual representation.

### Dashboard
Overview of churn statistics with KPIs and visualizations showing churn patterns by contract type and tenure.

## Troubleshooting

### Backend Issues

**Model not found:**
```bash
cd backend
python main.py  # Train the model first
```

**Port 5000 already in use:**
```bash
# Kill the process or change port in app.py
app.run(debug=True, host="127.0.0.1", port=5001)
```

### Frontend Issues

**Cannot connect to backend:**
- Ensure Flask server is running on http://127.0.0.1:5000
- Check browser console for CORS errors

**Port 5173 already in use:**
```bash
npm run dev -- --port 3000
```

## Future Improvements

- **Model Enhancements**
  - Try ensemble methods (Random Forest, XGBoost)
  - Feature importance visualization
  - SHAP values for model interpretability

- **Pipeline Automation**
  - Automated feature encoding pipeline
  - Model retraining scheduler
  - A/B testing framework

- **Deployment**
  - Docker containerization
  - Cloud deployment (AWS/Azure/GCP)
  - CI/CD pipeline

- **Monitoring**
  - Model performance tracking
  - Prediction logging
  - Data drift detection

- **UI/UX**
  - Batch prediction upload
  - Historical prediction tracking
  - Export results to CSV/PDF

## Contributing

This is an educational project. Feel free to fork and experiment with improvements.

## License

This project is for educational purposes.

## Contact

For questions or issues, please refer to the individual README files in the `backend/` and `frontend/` directories for detailed documentation.
