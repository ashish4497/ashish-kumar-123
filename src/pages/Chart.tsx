import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "Week 1", gmDollars: 200, gmPercent: 30 },
  { week: "Week 2", gmDollars: 250, gmPercent: 35 },
];

const Chart = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        GM Dollars & GM % Chart
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="week" className="text-gray-700" />
          <YAxis yAxisId="left" orientation="left" className="text-gray-700" />
          <YAxis
            yAxisId="right"
            orientation="right"
            className="text-gray-700"
          />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="gmDollars"
            fill="#4F46E5"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="gmPercent"
            fill="#16A34A"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
