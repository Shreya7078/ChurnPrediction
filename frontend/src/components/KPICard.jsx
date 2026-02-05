import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const KPICard = ({ title, value, icon, trend }) => {
  const numRef = useRef(null);

  useEffect(() => {
    gsap.from(numRef.current, {
      innerText: 0,
      duration: 2,
      snap: { innerText: 1 },
      ease: 'power1.out'
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">{icon}</div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
          {trend > 0 ? `+${trend}%` : `${trend}%`}
        </span>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-800" ref={numRef}>{value}</p>
    </div>
  );
};

export default KPICard;