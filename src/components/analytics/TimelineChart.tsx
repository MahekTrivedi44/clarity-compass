import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { claims } from "@/data/dummyData";

export const TimelineChart = () => {
  // Extract timeline claims and create a timeline view
  const timelineClaims = claims
    .filter((c) => c.temporal_reference)
    .map((c) => ({
      time: new Date(c.temporal_reference!).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: new Date(c.temporal_reference!).getTime(),
      source: c.source.replace(" Statement", "").replace(" Report", ""),
      content: c.content.substring(0, 30) + "...",
      confidence: c.confidence * 100,
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  // Add source index for visual separation
  const sources = [...new Set(timelineClaims.map((c) => c.source))];
  const dataWithIndex = timelineClaims.map((c) => ({
    ...c,
    sourceIndex: sources.indexOf(c.source) + 1,
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dataWithIndex}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
          <XAxis
            dataKey="time"
            tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
            axisLine={{ stroke: "hsl(222, 30%, 16%)" }}
          />
          <YAxis
            domain={[0, sources.length + 1]}
            ticks={sources.map((_, i) => i + 1)}
            tickFormatter={(value) => sources[value - 1] || ""}
            tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }}
            axisLine={{ stroke: "hsl(222, 30%, 16%)" }}
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 47%, 10%)",
              border: "1px solid hsl(222, 30%, 16%)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "hsl(210, 40%, 96%)" }}
            formatter={(value: number, name: string) => {
              if (name === "sourceIndex") return [sources[value - 1], "Source"];
              return [value, name];
            }}
          />
          <ReferenceLine
            x="6:27 PM"
            stroke="hsl(152, 69%, 45%)"
            strokeDasharray="5 5"
            label={{
              value: "Camera Time",
              fill: "hsl(152, 69%, 45%)",
              fontSize: 10,
            }}
          />
          <Line
            type="monotone"
            dataKey="sourceIndex"
            stroke="hsl(173, 58%, 45%)"
            strokeWidth={2}
            dot={{ fill: "hsl(173, 58%, 45%)", r: 6 }}
            activeDot={{ r: 8, fill: "hsl(173, 58%, 60%)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
