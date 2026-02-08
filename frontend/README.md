# Telco Churn Prediction – Frontend

This is the React-based user interface for the Telco Customer Churn Prediction System.  
It allows users to enter customer details and receive real-time churn probability from the backend API.


## Tech Stack

- React (Vite)
- Tailwind CSS
- Recharts (Visualization)


## Features

- Customer input form
- Real-time API integration with Flask backend
- Churn probability visualization using Pie Chart
- Error handling and loading state
- Responsive UI

## Folder Structure
frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx

## Setup & Run

### Install Dependencies

```bash
npm install
npm run dev
The application runs on: http://localhost:5173

## Backend Connection

This frontend communicates with the Flask backend API.

Default API Endpoint:

http://127.0.0.1:5000/predict

Make sure the backend server is running before triggering predictions.
