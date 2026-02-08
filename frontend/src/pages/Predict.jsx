import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { PieChart, Pie, Cell } from "recharts";
import { TrendingDown, TrendingUp, Database, AlertCircle } from "lucide-react";

export default function Predict() {

  const [formData, setFormData] = useState({
    tenure: "",
    monthlyCharges: "",
    contract: "",
    internetService: "",
    paymentMethod: "",
    paperlessBilling: "",
    supportServices: "",
    seniorCitizen: "",
    family: "",
    gender: ""
  });

  const [probability, setProbability] = useState(null);
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  }

  async function handlePredict() {
  
    const emptyFields = Object.entries(formData).filter(([key, value]) => value === "");
    if (emptyFields.length > 0) {
      setError("Please fill in all fields before predicting");
      return;
    }

    setLoading(true);
    setError("");
    setProbability(null);
    setLabel("");

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tenure: Number(formData.tenure),
          monthlyCharges: Number(formData.monthlyCharges),
          contract: formData.contract,
          internetService: formData.internetService,
          paymentMethod: formData.paymentMethod,
          paperlessBilling: formData.paperlessBilling,
          supportServices: formData.supportServices,
          seniorCitizen: formData.seniorCitizen,
          family: formData.family,
          gender: formData.gender
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      setProbability(data.churn_probability);
      setLabel(data.churn_label);

    } catch (err) {
      console.error("Prediction error:", err);

      if (err.message === "Failed to fetch") {
        setError(" Cannot connect to backend server. Please make sure the Flask server is running on http://127.0.0.1:5000");
      } else {
        setError(` Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  const chartData = probability !== null ? [
    { name: "Churn Risk", value: probability * 100 },
    { name: "Safe", value: 100 - probability * 100 }
  ] : [];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-10">

        {/* HEADER */}
        <div className="mb-12 pb-6 border-b-2 border-slate-300">
          <h1 className="text-5xl font-black text-slate-900 mb-3">
            Churn <span className="text-indigo-600">Prediction</span>
          </h1>
          <div className="flex items-center gap-3">
            <p className="text-base font-semibold text-slate-700">
              ML-powered customer churn risk analysis
            </p>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg">
              <Database size={16} />
              XGBoost Model
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* FORM SECTION */}
          <div className="bg-white p-10 rounded-2xl shadow-2xl border-4 border-slate-300">

            <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-slate-200">
              <div className="p-3 bg-indigo-600 rounded-2xl">
                <Database size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Customer Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Tenure (months)" name="tenure" value={formData.tenure} onChange={handleChange} />
              <Input label="Monthly Charges" name="monthlyCharges" value={formData.monthlyCharges} onChange={handleChange} />
            </div>

            <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange}
              options={["Male", "Female"]} />

            <Select label="Contract Type" name="contract" value={formData.contract} onChange={handleChange}
              options={["Month-to-month", "One year", "Two year"]} />

            <Select label="Internet Service" name="internetService" value={formData.internetService} onChange={handleChange}
              options={["DSL", "Fiber optic", "No"]} />

            <Select label="Payment Method" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}
              options={[
                "Electronic check",
                "Mailed check",
                "Bank transfer (automatic)",
                "Credit card (automatic)"
              ]} />

            <div className="grid md:grid-cols-2 gap-4">
              <Select label="Paperless Billing" name="paperlessBilling" value={formData.paperlessBilling} onChange={handleChange}
                options={["Yes", "No"]} />

              <Select label="Support Services" name="supportServices" value={formData.supportServices} onChange={handleChange}
                options={["Yes", "No"]} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Select label="Senior Citizen" name="seniorCitizen" value={formData.seniorCitizen} onChange={handleChange}
                options={["Yes", "No"]} />

              <Select label="Family" name="family" value={formData.family} onChange={handleChange}
                options={["Yes", "No"]} />
            </div>

            {error && (
              <div className="mt-6 p-5 bg-red-50 border-4 border-red-400 rounded-2xl flex items-start gap-3">
                <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm font-semibold">{error}</p>
              </div>
            )}

            <button
              onClick={handlePredict}
              disabled={loading}
              className={`w-full mt-8 py-4 rounded-2xl font-black text-base shadow-xl transition-all duration-300 ${loading
                ? "bg-slate-400 cursor-not-allowed text-white"
                : "bg-indigo-600 text-white hover:bg-slate-900 hover:scale-105 hover:shadow-2xl"
                }`}
            >
              {loading ? "Predicting..." : "Predict Churn"}
            </button>

          </div>

          {/* RESULT SECTION */}
          <div className="bg-white p-10 rounded-2xl shadow-2xl border-4 border-slate-300 flex flex-col">

            <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-slate-200">
              <div className="p-3 bg-indigo-600 rounded-2xl">
                <TrendingDown size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Churn Probability
              </h2>
            </div>

            {probability !== null ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative">
                  <PieChart width={280} height={280}>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={80}
                      outerRadius={120}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill={probability > 0.5 ? "#DC2626" : "#4F46E5"} />
                      <Cell fill="#E5E7EB" />
                    </Pie>
                  </PieChart>
                  
                  {/* Center Text */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-5xl font-black text-slate-900">
                      {(probability * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className={`mt-8 px-8 py-4 rounded-2xl border-4 ${
                  label === "Will Churn" 
                    ? "bg-red-50 border-red-400" 
                    : "bg-emerald-50 border-emerald-400"
                }`}>
                  <div className="flex items-center gap-3">
                    {label === "Will Churn" ? (
                      <TrendingDown size={28} className="text-red-600" />
                    ) : (
                      <TrendingUp size={28} className="text-emerald-600" />
                    )}
                    <p className={`text-xl font-black ${
                      label === "Will Churn" ? "text-red-700" : "text-emerald-700"
                    }`}>
                      {label}
                    </p>
                  </div>
                </div>

                {/* Risk Level Indicator */}
                <div className="mt-6 w-full">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">
                    Risk Level
                  </p>
                  <div className="flex gap-2">
                    <div className={`flex-1 h-3 rounded-full ${probability > 0 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                    <div className={`flex-1 h-3 rounded-full ${probability > 0.33 ? 'bg-yellow-500' : 'bg-slate-200'}`}></div>
                    <div className={`flex-1 h-3 rounded-full ${probability > 0.66 ? 'bg-red-500' : 'bg-slate-200'}`}></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs font-bold text-emerald-600">Low</span>
                    <span className="text-xs font-bold text-yellow-600">Medium</span>
                    <span className="text-xs font-bold text-red-600">High</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="p-6 bg-slate-100 rounded-full mb-6">
                  <Database size={64} className="text-slate-400" />
                </div>
                <p className="text-lg font-bold text-slate-600">
                  Enter customer details to get prediction
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Fill all fields in the form and click "Predict Churn"
                </p>
              </div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}


function Input({ label, name, onChange, value }) {
  return (
    <div className="mb-5">
      <label className="block mb-2 font-bold text-sm text-slate-700 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-2 border-slate-300 rounded-xl px-4 py-3 focus:border-indigo-600 focus:outline-none transition-colors font-semibold text-slate-900"
        placeholder="Enter value"
      />
    </div>
  );
}

function Select({ label, name, onChange, options, value }) {
  return (
    <div className="mb-5">
      <label className="block mb-2 font-bold text-sm text-slate-700 uppercase tracking-wider">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-2 border-slate-300 rounded-xl px-4 py-3 focus:border-indigo-600 focus:outline-none transition-colors font-semibold text-slate-900 bg-white"
      >
        <option value="">Select an option</option>
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}