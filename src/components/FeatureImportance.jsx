import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

export default function FeatureImportance({ data }) {

  // 🔥 structured data
  const chartData = [
    { name: "Area", value: data?.[0] || 0.59, color: "#c084fc" },
    { name: "Location", value: data?.[3] || 0.17, color: "#818cf8" },
    { name: "Bedrooms", value: data?.[1] || 0.11, color: "#facc15" },
    { name: "Metro", value: data?.[6] || 0.06, color: "#a78bfa" },
    { name: "Bathrooms", value: data?.[2] || 0.04, color: "#60a5fa" },
  ];

  return (
    <div className="glass-card p-6">

      {/* TITLE */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-gray-400 text-sm">✨ FEATURE IMPORTANCE</p>
        <span className="text-xs text-gray-500">ML Insights</span>
      </div>

      {/* CHART */}
      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={chartData}>

            {/* GRID */}
            <CartesianGrid
              strokeDasharray="3 6"
              stroke="#7c3aed"
              opacity={0.15}
            />

            {/* AXES */}
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fontSize: 13 }}
            />

            {/* TOOLTIP */}
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              content={({ payload }) => {
                if (!payload?.length) return null;

                return (
                  <div className="bg-[#0f172a] px-4 py-3 rounded-xl border border-white/10 shadow-lg">
                    <p className="text-white font-medium mb-1">
                      {payload[0].payload.name}
                    </p>
                    <p className="text-purple-400 text-sm">
                      Contribution: {(payload[0].value * 100).toFixed(1)}%
                    </p>
                  </div>
                );
              }}
            />

            {/* BARS */}
            <Bar
              dataKey="value"
              radius={[10, 10, 10, 10]}
              animationDuration={1200}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  style={{
                    filter: "drop-shadow(0px 0px 6px rgba(168,85,247,0.3))",
                  }}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* LEGEND */}
      <div className="mt-6 space-y-2">
        {chartData.map((item, i) => (
          <div key={i} className="flex justify-between text-sm text-gray-400">

            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: item.color }}
              ></span>
              {item.name}
            </div>

            <span className="text-gray-300">
              {(item.value * 100).toFixed(0)}%
            </span>

          </div>
        ))}
      </div>

    </div>
  );
}