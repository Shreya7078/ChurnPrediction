from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import joblib
import numpy as np
import os


app = Flask(__name__)
CORS(app, resources={
    r"/*": {"origins": [
        "http://localhost:5173",
        "https://churn-prediction-seven.vercel.app"
    ]}
})


try:
    model_path = "model/churn_model.pkl"
    if not os.path.exists(model_path):
        print(f"ERROR: Model file not found at {model_path}")
        print("Please run main.py first to train and save the model")
        model = None
    else:
        model = joblib.load(model_path)
        print(f"✓ Model loaded successfully from {model_path}")
except Exception as e:
    print(f"ERROR loading model: {e}")
    model = None

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "running",
        "message": "Churn Prediction API is running",
        "model_loaded": model is not None
    })

@app.route("/predict", methods=["POST", "OPTIONS"])
@cross_origin()
def predict():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    
    try:

        if model is None:
            return jsonify({
                "error": "Model not loaded. Please train the model first by running main.py"
            }), 500
      
        data = request.json
        print(f"Received prediction request: {data}")
        
        if not data:
            return jsonify({"error": "No data provided"}), 400

       
        required_fields = ["tenure", "monthlyCharges", "contract", "internetService", 
                          "paymentMethod", "paperlessBilling", "supportServices", 
                          "seniorCitizen", "family", "gender"]
        
        missing_fields = [field for field in required_fields if field not in data or data[field] == ""]
        if missing_fields:
            return jsonify({
                "error": f"Missing required fields: {', '.join(missing_fields)}"
            }), 400

        # Prepare features in the EXACT order expected by the model
        # The model expects 14 features in this order:
        # 0. SeniorCitizen
        # 1. tenure
        # 2. MonthlyCharges
        # 3. Family
        # 4. SupportServices
        # 5. gender_Male (1 if Male, 0 if Female - one-hot with drop_first=True)
        # 6. InternetService_Fiber optic (1 if Fiber optic, 0 otherwise)
        # 7. InternetService_No (1 if No, 0 otherwise)
        # 8. Contract_One year (1 if One year, 0 otherwise)
        # 9. Contract_Two year (1 if Two year, 0 otherwise)
        # 10. PaperlessBilling_Yes (1 if Yes, 0 if No)
        # 11. PaymentMethod_Credit card (automatic)
        # 12. PaymentMethod_Electronic check
        # 13. PaymentMethod_Mailed check
        
        yes_no = {"Yes": 1, "No": 0}
        
        # Prepare the 14 features
        features = [
            yes_no[data["seniorCitizen"]], 
            float(data["tenure"]),        
            float(data["monthlyCharges"]),  
            yes_no[data["family"]],          
            yes_no[data["supportServices"]],
            1 if data["gender"] == "Male" else 0, 
            1 if data["internetService"] == "Fiber optic" else 0,  
            1 if data["internetService"] == "No" else 0,           
            1 if data["contract"] == "One year" else 0,            
            1 if data["contract"] == "Two year" else 0,            
            yes_no[data["paperlessBilling"]],                      
            1 if data["paymentMethod"] == "Credit card (automatic)" else 0, 
            1 if data["paymentMethod"] == "Electronic check" else 0,        
            1 if data["paymentMethod"] == "Mailed check" else 0              
        ]
        
        features_array = np.array([features])
        
        print(f"Features prepared (shape {features_array.shape}): {features_array}")

        
        prob = model.predict_proba(features_array)[0][1]
        label = "High Risk" if prob >= 0.5 else "Low Risk"

        result = {
            "churn_probability": round(float(prob), 2),
            "churn_label": label
        }
        
        print(f"Prediction result: {result}")
        return jsonify(result), 200

    except KeyError as e:
        return jsonify({"error": f"Invalid value for field: {str(e)}"}), 400
    except ValueError as e:
        return jsonify({"error": f"Invalid data type: {str(e)}"}), 400
    except Exception as e:
        print(f"ERROR in prediction: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

if __name__ == "__main__":
    print("\n" + "="*50)
    print(" Starting Churn Prediction API Server")
    print("="*50)
    print(f"Server will run on: http://127.0.0.1:5000")
    print(f"Model loaded: {model is not None}")
    print("="*50 + "\n")
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
