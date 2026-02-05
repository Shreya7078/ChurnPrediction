import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import KPICard from '../components/KPICard';
import { Users, AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex bg-[#F1F5F9] min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <TopBar title="Executive Overview" />
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <KPICard title="Total Customers" value="12840" icon={<Users size={20}/>} trend={-2} />
          <KPICard title="Churn Risk" value="15" icon={<AlertTriangle size={20}/>} trend={5} />
          <KPICard title="Retention Rate" value="88" icon={<TrendingDown size={20}/>} trend={1.2} />
          <KPICard title="Revenue at Risk" value="45200" icon={<DollarSign size={20}/>} trend={8} />
        </div>

        {/* Chart Section Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-80 flex items-center justify-center text-slate-400">
             [ChurnAreaChart Component here]
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-80 flex items-center justify-center text-slate-400">
             [CategoryBreakdown Component here]
          </div>
        </div>

        {/* Customer Table Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h2 className="font-bold text-slate-800">High Risk Customers</h2>
          </div>
          <div className="p-6 h-64 flex items-center justify-center text-slate-400 italic">
            [CustomerTable Component will load here]
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;