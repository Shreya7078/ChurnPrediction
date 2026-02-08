import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { PieChart, Pie, Cell } from "recharts";

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
    family: ""
  });

  const [probability, setProbability] = useState(null);
  const [label, setLabel] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handlePredict() {
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tenure: Number(formData.tenure),
        monthlyCharges: Number(formData.monthlyCharges),
        contract: formData.contract,
        internetService: formData.internetService,
        paymentMethod: formData.paymentMethod,
        paperlessBilling: formData.paperlessBilling,
        supportServices: formData.supportServices,
        seniorCitizen: formData.seniorCitizen,
        family: formData.family
      })
    });

    const data = await res.json();
    setProbability(data.churn_probability);
    setLabel(data.churn_label);
  }

  const chartData = probability !== null ? [
    { name: "Churn Risk", value: probability * 100 },
    { name: "Safe", value: 100 - probability * 100 }
  ] : [];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-10">

        <h1 className="text-5xl font-black mb-12 text-black">
          Churn <span className="text-indigo-600">Prediction</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* INPUT */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-indigo-200">

            <h2 className="text-2xl font-bold mb-8 text-black">
              Customer Details
            </h2>

            <Input label="Tenure (months)" name="tenure" onChange={handleChange} />
            <Input label="Monthly Charges" name="monthlyCharges" onChange={handleChange} />

            <Select label="Contract Type" name="contract" onChange={handleChange}
              options={["Month-to-month", "One year", "Two year"]} />

            <Select label="Internet Service" name="internetService" onChange={handleChange}
              options={["DSL", "Fiber optic", "No"]} />

            <Select label="Payment Method" name="paymentMethod" onChange={handleChange}
              options={[
                "Electronic check",
                "Mailed check",
                "Bank transfer (automatic)",
                "Credit card (automatic)"
              ]} />

            <Select label="Paperless Billing" name="paperlessBilling" onChange={handleChange}
              options={["Yes", "No"]} />

            <Select label="Support Services" name="supportServices" onChange={handleChange}
              options={["Yes", "No"]} />

            <Select label="Senior Citizen" name="seniorCitizen" onChange={handleChange}
              options={["Yes", "No"]} />

            <Select label="Family" name="family" onChange={handleChange}
              options={["Yes", "No"]} />

            <button
              onClick={handlePredict}
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              Predict Churn
            </button>

          </div>

          {/* OUTPUT */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border-2 border-indigo-200 flex flex-col items-center justify-center">

            <h2 className="text-2xl font-bold mb-6 text-black">
              Churn Probability
            </h2>

            {probability !== null ? (
              <>
                <PieChart width={250} height={250}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={100}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="#2563EB" />
                    <Cell fill="#E5E7EB" />
                  </Pie>
                </PieChart>

                <p className="text-3xl font-black text-black mt-4">
                  {(probability * 100).toFixed(1)}%
                </p>

                <p className="mt-2 font-semibold text-black">
                  {label}
                </p>
              </>
            ) : (
              <p className="text-black">
                Enter details to get prediction
              </p>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}

/* ---------- INPUT COMPONENTS ---------- */

function Input({ label, name, onChange }) {
  return (
    <div className="mb-5">
      <label className="block mb-2 font-semibold text-black">{label}</label>
      <input
        type="number"
        name={name}
        onChange={onChange}
        className="w-full border-2 border-black rounded-lg px-4 py-2 focus:border-indigo-600"
      />
    </div>
  );
}

function Select({ label, name, onChange, options }) {
  return (
    <div className="mb-5">
      <label className="block mb-2 font-semibold text-black">{label}</label>
      <select
        name={name}
        onChange={onChange}
        className="w-full border-2 border-black rounded-lg px-4 py-2 focus:border-indigo-600"
      >
        <option value="">Select</option>
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
