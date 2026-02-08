# Customer Churn Prediction - Backend

Backend API for predicting customer churn using machine learning. Built with Flask and scikit-learn.


## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Model Details](#model-details)
- [Troubleshooting](#troubleshooting)



## Features

- **Machine Learning Model**: Logistic Regression model for churn prediction
- **RESTful API**: Flask-based API with CORS support
- **Data Preprocessing**: Automated feature engineering and one-hot encoding
- **Model Training**: Hyperparameter tuning with GridSearchCV
- **Comprehensive Error Handling**: Detailed error messages for debugging
- **Request Validation**: Field validation before processing


## 📁 Project Structure

```
backend/
├── app.py                      # Flask API server
├── main.py                     # Model training script
├── get_features.py             # Feature extraction utility
├── requirements.txt            # Python dependencies
├── data/
│   ├── clean_data.csv         # Preprocessed dataset
│   └── WA_Fn-UseC_-Telco-Customer-Churn.csv
├── model/
│   ├── churn_model.pkl        # Trained model (generated)
│   └── feature_names.txt      # Feature list (generated)
├── notebooks/
│   └── eda.ipynb              # Exploratory Data Analysis
└── src/
    ├── preprocessing.py        # Data preprocessing functions
    ├── modeling.py             # Model training functions
    ├── evaluation.py           # Model evaluation functions
    └── hyperparameter_tuning.py # Hyperparameter optimization
```


## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Steps

1. **Navigate to backend directory**
   ```bash
   cd "d:\ML Practice\ChurnPrediction\backend"
   ```

2. **Create virtual environment (recommended)**
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

### Dependencies

```
scikit-learn    # Machine learning library
pandas          # Data manipulation
numpy           # Numerical computing
seaborn         # Data visualization
matplotlib      # Plotting
flask           # Web framework
flask-cors      # CORS support
joblib          # Model serialization
```



## Usage

### 1. Train the Model (First Time Setup)

Before running the API, you need to train the model:

```bash
python main.py
```

**What this does:**
- Loads and preprocesses the data
- Trains multiple models (Logistic Regression, Random Forest, etc.)
- Performs hyperparameter tuning
- Saves the best model to `model/churn_model.pkl`
- Displays model performance metrics

**Expected Output:**
```
Best tuned parameters: {...}
Classification Report:
              precision    recall  f1-score   support
...
Model saved at backend/model/churn_model.pkl
```

### 2. Start the API Server

```bash
python app.py
```

**Expected Output:**
```
==================================================
 Starting Churn Prediction API Server
==================================================
Server will run on: http://127.0.0.1:5000
Model loaded: True
==================================================

 * Running on http://127.0.0.1:5000
```

**Keep this terminal window open!** The server must be running to accept requests.


## API Endpoints

### 1. Health Check

**Endpoint:** `GET /`

**Description:** Check if the server is running and model is loaded

**Response:**
```json
{
  "status": "running",
  "message": "Churn Prediction API is running",
  "model_loaded": true
}
```

--

### 2. Predict Churn

**Endpoint:** `POST /predict`

**Description:** Predict customer churn probability

**Request Headers:**
```
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

**Field Descriptions:**

| Field | Type | Required | Options |
|------|------|----------|---------|
| `tenure` | Number | Yes | 0-72 (months) |
| `monthlyCharges` | Number | Yes | Positive number |
| `gender` | String | Yes | "Male", "Female" |
| `contract` | String | Yes | "Month-to-month", "One year", "Two year" |
| `internetService` | String | Yes | "DSL", "Fiber optic", "No" |
| `paymentMethod` | String | Yes | "Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)" |
| `paperlessBilling` | String | Yes | "Yes", "No" |
| `supportServices` | String | Yes | "Yes", "No" |
| `seniorCitizen` | String | Yes | "Yes", "No" |
| `family` | String | Yes | "Yes", "No" |

**Success Response (200):**
```json
{
  "churn_probability": 0.73,
  "churn_label": "High Risk"
}
```

**Error Responses:**

**400 - Missing Fields:**
```json
{
  "error": "Missing required fields: gender, tenure"
}
```

**400 - Invalid Value:**
```json
{
  "error": "Invalid value for field: 'contract'"
}
```

**500 - Model Not Loaded:**
```json
{
  "error": "Model not loaded. Please train the model first by running main.py"
}
```

---

## Model Details

### Algorithm
**Logistic Regression** with hyperparameter tuning

### Features (14 Total)

The model expects exactly **14 features** in this order:

1. `SeniorCitizen` (0 or 1)
2. `tenure` (numeric)
3. `MonthlyCharges` (numeric)
4. `Family` (0 or 1)
5. `SupportServices` (0 or 1)
6. `gender_Male` (1 if Male, 0 if Female)
7. `InternetService_Fiber optic` (1 if Fiber optic, 0 otherwise)
8. `InternetService_No` (1 if No, 0 otherwise)
9. `Contract_One year` (1 if One year, 0 otherwise)
10. `Contract_Two year` (1 if Two year, 0 otherwise)
11. `PaperlessBilling_Yes` (1 if Yes, 0 otherwise)
12. `PaymentMethod_Credit card (automatic)` (1 if selected, 0 otherwise)
13. `PaymentMethod_Electronic check` (1 if selected, 0 otherwise)
14. `PaymentMethod_Mailed check` (1 if selected, 0 otherwise)

### Preprocessing

- **One-Hot Encoding**: Categorical variables are encoded using `pd.get_dummies()` with `drop_first=True`
- **Feature Scaling**: Not applied (Logistic Regression works well without it for this dataset)
- **Missing Values**: Already handled in `clean_data.csv`

### Training Process

1. Load data from `data/clean_data.csv`
2. Split features (X) and target (y)
3. Apply one-hot encoding to categorical variables
4. Split into train/test sets (80/20)
5. Train multiple models and compare
6. Perform hyperparameter tuning on best model
7. Save final model to `model/churn_model.pkl`

### Model Performance

Check the output of `main.py` for detailed metrics including:
- Precision
- Recall
- F1-Score
- Accuracy

---

## Troubleshooting

### Issue 1: Model File Not Found

**Error:**
```
ERROR: Model file not found at model/churn_model.pkl
```

**Solution:**
Run the training script first:
```bash
python main.py
```

---

### Issue 2: Feature Mismatch Error

**Error:**
```
X has 9 features, but LogisticRegression is expecting 14 features
```

**Cause:** Missing or incorrectly formatted input fields

**Solution:**
- Ensure all 10 fields are included in the request
- Check that field names match exactly (case-sensitive)
- Verify that the `gender` field is included (common mistake!)

---

### Issue 3: Port Already in Use

**Error:**
```
Address already in use
```

**Solution:**

Option 1 - Kill the existing process:
```bash
# Find the process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

Option 2 - Change the port in `app.py`:
```python
app.run(debug=True, host="127.0.0.1", port=5001)
```

---

### Issue 4: CORS Error from Frontend

**Error:**
```
Access to fetch at 'http://127.0.0.1:5000/predict' has been blocked by CORS policy
```

**Solution:**
This should already be handled by the CORS configuration in `app.py`. If you still see this error:

1. Check that `flask-cors` is installed:
   ```bash
   pip install flask-cors
   ```

2. Verify CORS configuration in `app.py`:
   ```python
   CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
   ```

---

### Issue 5: Import Errors

**Error:**
```
ModuleNotFoundError: No module named 'flask'
```

**Solution:**
Install all dependencies:
```bash
pip install -r requirements.txt
```

If using a virtual environment, make sure it's activated:
```bash
.\venv\Scripts\activate
```

---

## Utility Scripts

### `get_features.py`
Extracts and displays the feature names expected by the model.

**Usage:**
```bash
python get_features.py
```

**Output:**
- Lists all 14 features in order
- Saves feature names to `model/feature_names.txt`


## Security Notes

 **Current Configuration:**
- CORS is set to allow all origins (`"*"`)
- Debug mode is enabled
- No authentication required

 **For Production:**
1. Restrict CORS to specific origins
2. Disable debug mode
3. Add authentication/API keys
4. Use HTTPS
5. Add rate limiting
6. Validate and sanitize all inputs


## Development Notes

### Adding New Features

If you want to add new features to the model:

1. Update `data/clean_data.csv` with new columns
2. Modify `src/preprocessing.py` if needed
3. Retrain the model: `python main.py`
4. Update `app.py` to include new fields in the request
5. Update this README with new field descriptions

### Model Versioning

Consider saving models with version numbers:
```python
joblib.dump(best_model, f"model/churn_model_v{version}.pkl")
```


## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the error messages in the terminal
3. Check the Flask server logs for detailed error traces

