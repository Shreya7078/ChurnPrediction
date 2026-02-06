import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function TenureChurnChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="font-bold mb-4">Tenure vs Churn (%)</h3>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <XAxis 
            dataKey="tenure" 
            tick={{ fontSize: 16 }} 
            padding={{ left: 10, right: 10 }} 
          />
          <YAxis  tick= {{fontSize : 16}} domain={[0, 'dataMax + 5']}/>
          <Tooltip />
          <Area 
            type="monotone"
            dataKey="churnRate"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.25}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
