import requests
import json

# Test data matching the frontend form
test_data = {
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

print("Testing prediction endpoint...")
print(f"Request data: {json.dumps(test_data, indent=2)}")
print("\nSending request to http://127.0.0.1:5000/predict...")

try:
    response = requests.post(
        "http://127.0.0.1:5000/predict",
        json=test_data,
        headers={"Content-Type": "application/json"}
    )
    
    print(f"\nResponse status: {response.status_code}")
    print(f"Response body: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        print("\n✅ SUCCESS! Prediction completed successfully!")
    else:
        print(f"\n❌ ERROR: {response.json().get('error', 'Unknown error')}")
        
except Exception as e:
    print(f"\n❌ Connection error: {e}")
    print("Make sure the Flask server is running!")
