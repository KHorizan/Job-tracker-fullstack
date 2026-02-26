import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const JobsBarChart = ({ data }) => {
  return (
    <div className="chart-card">
      <h3>Jobs Posted Per Month</h3>

<ResponsiveContainer width="100%" height={260}>
  <BarChart
    data={data}
    margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
  >
    <CartesianGrid stroke="#f0f0f0" vertical={false} />
    <XAxis dataKey="month" tick={{ fill: "#666" }} />
    <YAxis domain={[0, "dataMax"]} tick={{ fill: "#666" }} />
    <Tooltip />
    <Bar
      dataKey="jobs"
      radius={[6, 6, 0, 0]}
      fill="#4F46E5"
      barSize={30}
    />
  </BarChart>
</ResponsiveContainer>
    </div>
  );
};

export default JobsBarChart;