# Customer Churn Prediction - Frontend

React-based user interface for the Customer Churn Prediction System. Allows users to enter customer details and receive real-time churn probability predictions from the backend API.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Form Fields](#form-fields)
- [Troubleshooting](#troubleshooting)

## Tech Stack

- **React** - UI library (with Vite for fast development)
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Recharts** - Data visualization library for charts
- **React Router** - Client-side routing

## Features

- **Interactive Form** - User-friendly input form for customer details
- **Real-time Predictions** - Instant churn probability calculation
- **Visual Results** - Pie chart visualization of churn risk
- **Error Handling** - Clear error messages for validation and API issues
- **Loading States** - Visual feedback during API requests
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Clean, professional interface with Tailwind CSS

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChurnByContractChart.jsx
│   │   ├── KPICard.jsx
│   │   ├── Sidebar.jsx
│   │   └── TenureChurnChart.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Insights.jsx
│   │   ├── Landing.jsx
│   │   └── Predict.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Installation

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Steps

1. **Navigate to frontend directory**
   ```bash
   cd "d:\ML Practice\ChurnPrediction\frontend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   This will install all required packages including:
   - React and React DOM
   - Vite
   - Tailwind CSS
   - Recharts
   - React Router DOM

## Usage

### Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## API Integration

### Backend Connection

The frontend communicates with the Flask backend API running locally.

**Default API Endpoint:**
```
http://127.0.0.1:5000/predict
```

**Important:** Make sure the backend server is running before using the prediction feature.

To start the backend:
```bash
cd "d:\ML Practice\ChurnPrediction\backend"
python app.py
```

### API Request Format

The frontend sends POST requests to `/predict` with the following JSON structure:

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

### API Response Format

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

## Form Fields

The prediction form requires the following fields:

| Field | Type | Options | Description |
|-------|------|---------|-------------|
| **Tenure** | Number | 0-72 | Number of months the customer has been with the company |
| **Monthly Charges** | Number | Positive | Monthly charges in dollars |
| **Gender** | Dropdown | Male, Female | Customer gender |
| **Contract Type** | Dropdown | Month-to-month, One year, Two year | Type of contract |
| **Internet Service** | Dropdown | DSL, Fiber optic, No | Type of internet service |
| **Payment Method** | Dropdown | Electronic check, Mailed check, Bank transfer (automatic), Credit card (automatic) | Payment method |
| **Paperless Billing** | Dropdown | Yes, No | Whether customer uses paperless billing |
| **Support Services** | Dropdown | Yes, No | Whether customer has support services |
| **Senior Citizen** | Dropdown | Yes, No | Whether customer is a senior citizen |
| **Family** | Dropdown | Yes, No | Whether customer has family members on the plan |

**Note:** All fields are required. The form will show an error if any field is left empty.

## Troubleshooting

### Issue 1: "Cannot connect to backend server"

**Error Message:**
```
Cannot connect to backend server. Please make sure the Flask server is running on http://127.0.0.1:5000
```

**Solution:**
1. Open a terminal
2. Navigate to backend directory: `cd "d:\ML Practice\ChurnPrediction\backend"`
3. Start the Flask server: `python app.py`
4. Keep the terminal window open

### Issue 2: "Please fill in all fields before predicting"

**Cause:** One or more form fields are empty

**Solution:** Fill in all 10 fields before clicking "Predict Churn"

### Issue 3: Port Already in Use

**Error:**
```
Port 5173 is already in use
```

**Solution:**

Option 1 - Kill the existing process:
```bash
# Find the process using port 5173
netstat -ano | findstr :5173

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

Option 2 - Use a different port:
```bash
npm run dev -- --port 3000
```

### Issue 4: Module Not Found Errors

**Error:**
```
Cannot find module 'react' or its corresponding type declarations
```

**Solution:**
Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: Tailwind Styles Not Loading

**Solution:**
1. Make sure `tailwind.config.js` exists
2. Verify `index.css` imports Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Restart the dev server

## Pages

### Landing Page
- Introduction to the churn prediction system
- Navigation to other pages

### Dashboard
- Overview of churn statistics
- Key performance indicators (KPIs)
- Visual charts and metrics

### Insights
- Detailed analysis of churn patterns
- Charts showing churn by contract type and tenure

### Predict
- Main prediction form
- Real-time churn probability calculation
- Visual display of results with pie chart

## Development Notes

### Changing API Endpoint

If the backend runs on a different port, update the endpoint in `src/pages/Predict.jsx`:

```javascript
const res = await fetch("http://127.0.0.1:5001/predict", {
  // ... rest of the code
});
```

### Adding New Fields

If you add new fields to the prediction model:

1. Update the `formData` state in `Predict.jsx`
2. Add the new field to the form UI
3. Include it in the API request body
4. Update this README with the new field description

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Verify the backend server is running
3. Check the browser console for error messages
4. Review the network tab in browser DevTools

**Last Updated:** February 2026