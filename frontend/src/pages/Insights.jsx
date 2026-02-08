import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../components/Sidebar";

export default function Insights() {

  const featureImportance = [
    { feature: "Contract Type", importance: 32 },
    { feature: "Tenure", importance: 28 },
    { feature: "Monthly Charges", importance: 22 },
    { feature: "Support Services", importance: 12 },
    { feature: "Payment Method", importance: 6 }
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-10 ml-72">
      
        <h1 className="text-5xl font-black mb-12 text-black">
          Churn <span className="text-indigo-600">Insights</span>
        </h1>

        {/* FEATURE IMPORTANCE */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-14 border-2 border-indigo-200 hover:border-indigo-500 transition">
          <h2 className="text-2xl font-bold mb-8 text-black">
            Feature Impact on Churn
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={featureImportance} layout="vertical">
              <XAxis type="number" stroke="#000" />
              <YAxis dataKey="feature" type="category" width={160} stroke="#000" />
              <Tooltip />
              <Bar 
                dataKey="importance" 
                fill="#2563EB" 
                radius={[0,10,10,0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ MODEL METRICS HEADING */}

        <h2 className="text-2xl font-extrabold mb-6 text-black">
          Model Performance Metrics
        </h2>

        <div className="grid md:grid-cols-4 gap-8 mb-14">

          <Metric title="Accuracy" value="74%" />
          <Metric title="Recall" value="77%" />
          <Metric title="Precision" value="50%" />
          <Metric title="F1 Score" value="61%" />

        </div>

        {/* ✅ BUSINESS INSIGHTS HEADING */}

        <h2 className="text-2xl font-extrabold mb-6 text-black">
          Key Business Insights
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <Insight text="Month-to-month customers show the highest churn risk." />
          <Insight text="Customers with low tenure churn significantly more." />
          <Insight text="Higher monthly charges increase churn probability." />
          <Insight text="Support services reduce churn risk strongly." />

        </div>

      </main>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="bg-white p-7 rounded-2xl shadow-lg border-l-8 border-indigo-600 hover:shadow-xl transition">
      <p className="text-xs uppercase text-black mb-2 tracking-widest">{title}</p>
      <h3 className="text-3xl font-black text-black">{value}</h3>
    </div>
  );
}

function Insight({ text }) {
  return (
    <div className="bg-white p-7 rounded-2xl shadow-lg border-l-8 border-indigo-600 hover:shadow-xl transition">
      <p className="font-medium text-black leading-relaxed">{text}</p>
    </div>
  );
}
