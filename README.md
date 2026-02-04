#  Customer Churn Prediction – End to End Machine Learning Project

This project focuses on predicting customer churn using structured data analysis, feature engineering, and multiple machine learning models.  
The goal is to identify high-risk customers early to improve retention strategies.

---

##  Project Workflow

1. Exploratory Data Analysis (EDA)  
2. Data Cleaning & Feature Engineering  
3. Feature Selection using business insights  
4. Training multiple ML models  
5. Model comparison using Recall & F1-score  
6. Hyperparameter tuning of best model  
7. Final churn prediction model  

---

## How to Run the Project

- Clone the repository
- Navigate to project directory
- Create virtual environment
- Activate virtual environment
- Install required dependencies
- Run the main pipeline script
- View model performance results
- (Optional) Open EDA notebook


## Command reference
- git clone https://github.com/your-username/CustomerChurnPrediction.git
- cd CustomerChurnPrediction
- python -m venv venv
- venv\Scripts\activate
- pip install -r requirements.txt
- python main.py

##  Project Structure

CustomerChurnPrediction/
│
├── data/
│ └── clean_data.csv
  └── WA_Fn-UseC_-Telco-Customer-Churn.csv
│
├── notebooks/
│ └── EDA.ipynb
│
├── src/
│ ├── preprocessing.py
│ ├── modeling.py
│ ├── evaluation.py
│ └── hyperparameter_tuning.py
│
├── main.py
└── README.md


---

## Key Insights from EDA

- Month-to-month contract customers churn the most  
- Customers with low tenure are high churn risk  
- Higher monthly charges increase churn probability  
- Support services significantly reduce churn  
- Electronic check payment method has highest churn  
- Family presence improves retention  

---

##  Models Implemented

- Logistic Regression (Final Model)  
- Decision Tree  
- Random Forest  
- Gradient Boosting  
- XGBoost  
- Support Vector Machine  
- AdaBoost  

---

## Final Tuned Model Performance (Logistic Regression)

| Metric | Score |
|-------|------|
| Recall | 77% |
| Precision | 50% |
| F1-score | 61% |
| Accuracy | 74% |

---

## Why Recall was Prioritized

In churn prediction, missing customers who are likely to leave is more costly than contacting a few loyal customers.

Therefore:
- Recall was optimized to capture maximum churners  
- F1-score ensured balanced performance  

---

## Technologies Used

- Python  
- Pandas, NumPy  
- Scikit-learn  
- XGBoost  
- Matplotlib  

---



