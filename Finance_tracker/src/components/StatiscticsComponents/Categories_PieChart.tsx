import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import COLORS from "../../utils/chartColors";

interface CategoriesPieChartProps {
  data: { name: string; value: number }[];
  titleKey: string;
}

/**
 * A reusable component to display a percentage using a pie chart.
 * @param {object[]} data - The data to display. Each object should have 'name' and 'value'.
 * @param {string} titleKey - The title for the chart.
 */
const CategoriesPieChart = ({ data, titleKey }: CategoriesPieChartProps) => {
  const totalCategories = data.length;

  return (
    <div className="w-[100%] sm:w-[50%] h-96 p-4 flex flex-col items-center justify-center">
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
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-bold text-xl"
            style={{ fill: "#333333" }}
          >
            {totalCategories}
          </text>
          <text
            x="50%"
            y="57%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm w-6 "
            style={{ fill: "#6b7280" }}
          >
            {titleKey}
          </text>
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

export default CategoriesPieChart;
