import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { claims } from "@/data/dummyData";

export const ConfidenceChart = () => {
  // Group claims by source and calculate average confidence
  const sourceData = claims.reduce((acc, claim) => {
    if (!acc[claim.source]) {
      acc[claim.source] = { total: 0, count: 0 };
    }
    acc[claim.source].total += claim.confidence;
    acc[claim.source].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const chartData = Object.entries(sourceData).map(([source, data]) => ({
    source: source.replace(" Statement", "").replace(" Report", "").replace(" Invoice", ""),
    confidence: (data.total / data.count) * 100,
    claims: data.count,
  }));

  const getBarColor = (confidence: number) => {
    if (confidence >= 90) return "hsl(152, 69%, 45%)";
    if (confidence >= 80) return "hsl(173, 58%, 45%)";
    if (confidence >= 70) return "hsl(32, 95%, 55%)";
    return "hsl(0, 72%, 51%)";
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
            axisLine={{ stroke: "hsl(222, 30%, 16%)" }}
          />
          <YAxis
            type="category"
            dataKey="source"
            tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
            axisLine={{ stroke: "hsl(222, 30%, 16%)" }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 47%, 10%)",
              border: "1px solid hsl(222, 30%, 16%)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "hsl(210, 40%, 96%)" }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, "Avg Confidence"]}
          />
          <Bar dataKey="confidence" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.confidence)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
