import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { 
  Zap, BarChart3, Activity, ArrowRight, Database, 
  Search, Target, Rocket, ShieldCheck, Cpu, ChevronRight 
} from "lucide-react";

export default function Landing() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.2 }
      );
      if (ref) observer.observe(ref);
      return observer;
    });
    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <div className="bg-slate-100 text-slate-900 overflow-hidden font-sans selection:bg-indigo-600 selection:text-white">

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/4 w-px h-full bg-slate-300"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-slate-300"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-slate-300"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-slate-300"></div>
        </div>

        <div className="relative z-10 space-y-6 animate-fade-in-up max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
            <Activity size={14} />
            Enterprise AI Unit
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
            TELCO CHURN <br /> 
            <span className="text-indigo-600">PREDICTION ENGINE</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            High-precision churn modeling for telecom datasets. Utilizing 7,043 subscriber samples with a focus on 77% Recall benchmarks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link to="/dashboard">
              <button className="bg-indigo-600 hover:bg-slate-900 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold text-sm flex items-center gap-2 group shadow-xl hover:shadow-2xl hover:scale-105">
                Go to Dashboard 
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/predict">
              <button className="bg-white border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105">
                Run Model
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <ChevronRight size={20} className="text-indigo-600 rotate-90" />
        </div>
      </section>

      {/* METRICS - Clean Grid */}
      <section ref={el => sectionRefs.current[2] = el} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {[
            { value: "77%", label: "Model Recall", icon: <Activity size={24} /> },
            { value: "7,043", label: "Dataset Size", icon: <Database size={24} /> },
            { value: "XGBoost", label: "Algorithm", icon: <Cpu size={24} /> },
            { value: "21", label: "Input Features", icon: <ShieldCheck size={24} /> }
          ].map((stat, i) => (
            <div 
              key={i} 
              className={`text-center p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-600 transition-all duration-500 hover:shadow-lg ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-indigo-600 mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES - Modern Cards */}
      <section ref={el => sectionRefs.current[0] = el} className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-slate-900">
          Core Capabilities
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Risk Scoring", desc: "Automated probability calculation per subscriber with ML-powered predictions.", icon: <Target size={32} /> },
            { title: "Churn Drivers", desc: "Identify top features causing customer exit through advanced analytics.", icon: <BarChart3 size={32} /> },
            { title: "API Ready", desc: "Ready for live integration with Telco CRM and enterprise systems.", icon: <Zap size={32} /> },
          ].map((feat, i) => (
            <div 
              key={i} 
              className={`group bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-indigo-600 transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-2 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 bg-slate-900 text-white flex items-center justify-center rounded-xl mb-6 group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-500">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">{feat.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PIPELINE - Dark Section */}
      <section ref={el => sectionRefs.current[1] = el} className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">Pipeline Infrastructure</h2>
          <p className="text-center text-slate-400 mb-12 text-sm">Streamlined ML workflow from data to deployment</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "Data Load", desc: "Raw CSV Ingestion", icon: <Database size={28} /> },
              { step: "Encoding", desc: "Feature Engineering", icon: <Search size={28} /> },
              { step: "Training", desc: "XGBoost Refinement", icon: <Cpu size={28} /> },
              { step: "Export", desc: "JSON Risk Reports", icon: <Rocket size={28} /> }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`bg-slate-800 p-8 rounded-2xl transition-all duration-500 hover:bg-slate-700 group border-2 border-slate-700 hover:border-indigo-600 ${isVisible[1] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-indigo-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="text-indigo-400 font-black text-3xl mb-3">0{i+1}</div>
                <h3 className="text-lg font-bold mb-2">{item.step}</h3>
                <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Final Call to Action */}
      <section className="py-24 text-center bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            System Deployment Ready
          </h2>
          <p className="text-slate-600 text-base mb-10 max-w-xl mx-auto">
            Validated on Telco Dataset v1.0 • Production-grade machine learning infrastructure
          </p>
          
          <Link to="/predict">
            <button className="bg-slate-900 text-white px-12 py-5 rounded-xl font-black text-base hover:bg-indigo-600 hover:scale-105 transition-all duration-300 uppercase tracking-wider shadow-2xl hover:shadow-indigo-500/50">
              Initialize Prediction Tool
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-900 text-center border-t-4 border-indigo-600">
        <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
          Core Engine v2.4 • 2026 Project
        </span>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { 
          animation: fade-in-up 1s ease-out forwards; 
        }
      `}</style>
    </div>
  );
}