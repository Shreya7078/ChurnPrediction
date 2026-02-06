import { Link, useLocation } from "react-router-dom";
import { Activity, Home, Brain, Zap } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const nav = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18}/> },
    { name: "Predict", path: "/predict", icon: <Brain size={18}/> },
    { name: "Insights", path: "/insights", icon: <Zap size={18}/> }
  ];

  return (
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
        {nav.map(item => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="font-bold text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

    </aside>
  );
}
