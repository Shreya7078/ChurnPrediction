import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function ChurnByContractChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="font-bold mb-4">Churn by Contract (%)</h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="contract" />
          <YAxis />
          <Tooltip />
          <Bar 
            dataKey="churnRate" 
            fill="#4F46E5" 
            radius={[6,6,0,0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
