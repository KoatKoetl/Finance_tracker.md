import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Colors for the chart segments.
const COLORS = [
  "#bf6629", // Brownish-orange
  "#eab308", // Yellow
  "#22c55e", // Green
  "#3b82f6", // Blue
  "#f472b6", // Pink
  "#6b7280", // Gray
  "#ef4444", // Red
  "#14b8a6", // Teal/Cyan
  "#f97316", // Bright orange
  "#a855f7", // Purple
  "#457b9d", // Steel blue
];

interface PercentagePieChartProps {
  data: { name: string; value: number }[];
  titleKey: string;
}

/**
 * A reusable component to display a percentage using a pie chart.
 * @param {object[]} data - The data to display. Each object should have 'name' and 'value'.
 * @param {string} titleKey - The title for the chart.
 */
const PercentagePieChart = ({ data, titleKey }: PercentagePieChartProps) => {
  return (
    <div className="w-[100%] sm:w-[50%] h-96 p-4 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4 text-center">{titleKey}</h2>
      <ResponsiveContainer width="95%" height="80%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            labelLine={false}
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#4b5563",
              color: "#f3f4f6",
              borderRadius: "4px",
            }}
            labelStyle={{ color: "#9ca3af" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PercentagePieChart;
