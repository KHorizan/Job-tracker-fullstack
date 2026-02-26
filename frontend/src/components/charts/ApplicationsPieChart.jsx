
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
const COLORS = [
  "#6366F1", // indigo
  "#22C55E", // green
  "#F59E0B", // amber
  "#EF4444", // red
];

const ApplicationsPieChart = ({ data }) => {
  return (
    <div className="chart-card">
      <h3>Applications Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
              outerRadius={95}
                innerRadius={55}
                paddingAngle={3}
                            
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationsPieChart;