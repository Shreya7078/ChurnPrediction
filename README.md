# Telco Customer Churn Prediction System

An end-to-end Machine Learning application designed to predict customer churn risk in telecom datasets. The system integrates a trained ML model with a Flask API backend and a React-based interactive dashboard.


## Project Overview

Customer churn is a major business problem in the telecom industry. This project predicts whether a customer is likely to leave based on service usage, contract type, billing preferences, and demographic features.

The application allows users to input customer details and receive real-time churn probability along with risk classification.


## Key Features

- End-to-End ML Deployment (Model → API → UI)
- Real-time Churn Prediction
- Probability-based Risk Scoring
- Interactive Visualization (Pie Chart)
- Robust Input Validation
- REST API Integration


## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Recharts

**Backend**
- Python
- Flask
- scikit-learn

**Machine Learning**
- Logistic Regression
- Feature Engineering
- One-Hot Encoding


## Dataset

- Telco Customer Churn Dataset
- Total Records: 7043


## System Architecture
- User → React Frontend → Flask API → ML Model → Prediction → UI

## Project Structure
Telco-Churn-Prediction/
│
├── frontend/ # React UI
├── backend/ # Flask API + Model
└── README.md

## How to Run the Project

  ### Backend Setup

  cd backend
  pip install -r requirements.txt
  python app.py

  Server runs on:
  http://127.0.0.1:5000

  ### Frontend Setup

  cd frontend
  npm install
  npm run dev

  Frontend runs on:
  http://localhost:5173

## Model Details

- Algorithm: Logistic Regression
- Evaluation Focus: Recall Optimization for Churn Class
- Encoded Features: 14

## Future Improvements

- Pipeline-based Automatic Encoding
- Feature Importance Visualization
- Model Monitoring
- Deployment (Docker / Cloud)
