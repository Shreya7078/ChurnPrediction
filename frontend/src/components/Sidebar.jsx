import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Home, BarChart2, Zap, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    gsap.from(sidebarRef.current, { x: -100, opacity: 0, duration: 1, ease: 'power3.out' });
  }, []);

  const navItems = [
    { icon: <Home size={20}/>, label: 'Landing', path: '/' },
    { icon: <BarChart2 size={20}/>, label: 'Dashboard', path: '/dashboard' },
    { icon: <Zap size={20}/>, label: 'Predict', path: '/predict' },
  ];

  return (
    <div ref={sidebarRef} className="h-screen w-64 bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col p-6 shadow-sm z-50">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">C</div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">ChurnGuard</h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-all text-slate-600">
            {item.icon} <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center gap-4 p-3 text-slate-500 hover:text-red-500 cursor-pointer transition-colors">
          <LogOut size={20}/> <span className="font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;