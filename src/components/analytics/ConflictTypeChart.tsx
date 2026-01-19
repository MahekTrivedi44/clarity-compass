import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { conflictRelations } from "@/data/dummyData";

export const ConflictTypeChart = () => {
  const typeCounts = conflictRelations.reduce((acc, rel) => {
    acc[rel.type] = (acc[rel.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(typeCounts).map(([type, count]) => ({
    name: type.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    value: count,
    type,
  }));

  const COLORS = {
    contradiction: "hsl(0, 72%, 51%)",
    partial_conflict: "hsl(32, 95%, 55%)",
    supports: "hsl(152, 69%, 45%)",
    ambiguous: "hsl(215, 20%, 55%)",
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.type as keyof typeof COLORS]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 47%, 10%)",
              border: "1px solid hsl(222, 30%, 16%)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "hsl(210, 40%, 96%)" }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: "hsl(215, 20%, 55%)", fontSize: 12 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
