import { Link, useLocation } from "react-router-dom";
import { Activity, Home, Brain, Zap } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const nav = [
    { name: "Home", path: "/", icon: <Home size={18}/> },
    { name: "Dashboard", path: "/dashboard", icon: <Brain size={18}/> },
    { name: "Predict", path: "/predict", icon: <Zap size={18}/> },
    { name: "Insights", path: "/insights", icon: <Activity size={18}/> }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 text-white px-6 py-8 border-r-4 border-indigo-600 overflow-y-auto">

      <Link to="/" className="block mb-12 group">
        <div className="flex items-center gap-2 mb-2 transition-transform duration-300 group-hover:scale-105">
          <Activity size={28} className="text-indigo-500 group-hover:text-indigo-400 transition-colors" />
          <h2 className="text-2xl font-black group-hover:text-indigo-400 transition-colors">ChurnAI</h2>
        </div>
        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
          Enterprise AI Unit
        </p>
      </Link>

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