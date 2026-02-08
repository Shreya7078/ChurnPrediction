from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}})

model = joblib.load("model/churn_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    contract_map = {
        "Month-to-month": 0,
        "One year": 1,
        "Two year": 2
    }

    internet_map = {
        "DSL": 0,
        "Fiber optic": 1,
        "No": 2
    }

    payment_map = {
        "Electronic check": 0,
        "Mailed check": 1,
        "Bank transfer (automatic)": 2,
        "Credit card (automatic)": 3
    }

    yes_no = {"Yes": 1, "No": 0}

    features = np.array([[
        data["tenure"],
        data["monthlyCharges"],
        contract_map[data["contract"]],
        internet_map[data["internetService"]],
        payment_map[data["paymentMethod"]],
        yes_no[data["paperlessBilling"]],
        yes_no[data["supportServices"]],
        yes_no[data["seniorCitizen"]],
        yes_no[data["family"]]
    ]])

    prob = model.predict_proba(features)[0][1]

    label = "High Risk" if prob >= 0.5 else "Low Risk"

    return jsonify({
        "churn_probability": round(float(prob), 2),
        "churn_label": label
    })

if __name__ == "__main__":
    app.run(debug=True)
