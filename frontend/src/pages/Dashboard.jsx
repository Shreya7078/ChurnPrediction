import { useEffect, useState } from "react";
import { 
  Users, TrendingDown, DollarSign, Target, 
  ChevronRight, Activity,
  Home, Zap, Brain
} from "lucide-react";

import ChurnByContractChart from "../components/ChurnByContractChart";
import TenureChurnChart from "../components/TenureChurnChart";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [activeNav, setActiveNav] = useState("Dashboard");

  useEffect(() => {
    fetch("/data/clean_data.csv")
      .then(res => res.text())
      .then(text => {
        const rows = text.split("\n").slice(1);
        const parsed = rows.map(r => r.split(","));
        setData(parsed);
      });
  }, []);

  const total = data.length;

  const CHURN_INDEX = 8;
  const churned = data.filter(r => r[CHURN_INDEX] === "Yes").length;
  const churnRate = total ? ((churned / total) * 100).toFixed(2) : 0;

  const MONTHLY_INDEX = 7;
  const avgMonthly = total
    ? (
        data.reduce((s, r) => s + Number(r[MONTHLY_INDEX] || 0), 0) / total
      ).toFixed(2)
    : 0;

  /* -------- REAL CHART DATA -------- */

  const contractTypes = ["Month-to-month", "One year", "Two year"];

  const contractData = contractTypes.map(type => {
    const group = data.filter(r => r[4] === type);
    const churnGroup = group.filter(r => r[8] === "Yes").length;

    return {
      contract: type,
      churnRate: group.length
        ? ((churnGroup / group.length) * 100).toFixed(1)
        : 0
    };
  });

  const tenureBuckets = [
    { label: "0-1yr", min: 0, max: 12 },
    { label: "1-2yr", min: 12, max: 24 },
    { label: "2-3yr", min: 24, max: 36 },
    { label: "3-5yr", min: 36, max: 60 },
    { label: "5+yr", min: 60, max: 100 }
  ];

  const tenureData = tenureBuckets.map(g => {
    const group = data.filter(
      r => Number(r[2]) >= g.min && Number(r[2]) < g.max
    );
    const churnGroup = group.filter(r => r[8] === "Yes").length;

    return {
      tenure: g.label,
      churnRate: group.length
        ? ((churnGroup / group.length) * 100).toFixed(1)
        : 0
    };
  });

  /* -------------------------------- */

  return (
    <div className="flex min-h-screen bg-slate-100">

      <aside className="w-72 bg-slate-900 text-white px-6 py-8 border-r-4 border-indigo-600">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={28} className="text-indigo-500" />
            <h2 className="text-2xl font-black">ChurnAI</h2>
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
            Enterprise AI Unit
          </p>
        </div>

        <nav className="space-y-3">
          {[
            { name: "Dashboard", icon: <Home size={18} /> },
            { name: "Prediction", icon: <Brain size={18} /> },
            { name: "Insights", icon: <Zap size={18} /> }
          ].map(item => (
            <div
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                activeNav === item.name
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-bold text-sm">{item.name}</span>
              {activeNav === item.name && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">

        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            Customer Churn <span className="text-indigo-600">Dashboard</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card title="Total Customers" value={total} icon={<Users size={24} />} />
          <Card title="Churn Rate" value={`${churnRate}%`} icon={<TrendingDown size={24} />} />
          {/* <Card title="Avg Monthly Charges" value={`$${avgMonthly}`} icon={<DollarSign size={24} />} /> */}
          <Card title="Model Recall" value="77%" icon={<Target size={24} />} />
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl mb-12 border-l-4 border-indigo-600">
          <p className="text-lg font-bold">
            {churned.toLocaleString()} customers have churned
          </p>
        </div>

        

        <div className="grid md:grid-cols-2 gap-8">
          <ChurnByContractChart data={contractData} />
          <TenureChurnChart data={tenureData} />
        </div>

      </main>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-slate-200 hover:border-indigo-600 transition">
      <div className="mb-3 text-indigo-600">{icon}</div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">
        {title}
      </p>
      <h3 className="text-3xl font-black text-slate-900">
        {value.toLocaleString()}
      </h3>
    </div>
  );
}
