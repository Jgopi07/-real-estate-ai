import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Star, AlertCircle, Grid, List, MapPin } from "lucide-react";

export default function Visualizations({ dataset, result, form }) {
  const [activeTab, setActiveTab] = useState("distribution");

  // ==========================================
  // 1. PRICE DISTRIBUTION HISTOGRAM BINS
  // ==========================================
  const histogramData = useMemo(() => {
    if (!dataset.length) return [];
    
    // Create 10 uniform bins from 1.5M to 10.5M
    const minPrice = 1500000;
    const maxPrice = 10500000;
    const step = (maxPrice - minPrice) / 10;
    
    const bins = Array.from({ length: 10 }, (_, idx) => {
      const start = minPrice + idx * step;
      const end = start + step;
      return {
        label: `${(start / 100000).toFixed(0)}L-${(end / 100000).toFixed(0)}L`,
        range: [start, end],
        count: 0,
      };
    });

    dataset.forEach((item) => {
      const price = item.price;
      for (let bin of bins) {
        if (price >= bin.range[0] && price < bin.range[1]) {
          bin.count++;
          break;
        }
      }
    });

    return bins.map((bin) => {
      const userPrice = result?.predicted_price || 0;
      const isUserBin = userPrice >= bin.range[0] && userPrice < bin.range[1];
      return {
        name: bin.label,
        count: bin.count,
        midPoint: (bin.range[0] + bin.range[1]) / 2,
        isUserBin,
      };
    });
  }, [dataset, result]);

  // ==========================================
  // 2. SUBSAMPLED SCATTER PLOT DATA (N = 100)
  // ==========================================
  const scatterData = useMemo(() => {
    if (!dataset.length) return [];
    
    // Subsample 100 listings to keep rendering super fast
    const sampled = [];
    const step = Math.max(1, Math.floor(dataset.length / 100));
    for (let i = 0; i < dataset.length && sampled.length < 100; i += step) {
      sampled.push({
        area: dataset[i].area,
        price: dataset[i].price,
        isUser: false,
      });
    }

    return sampled;
  }, [dataset]);

  const userScatterPoint = useMemo(() => {
    if (!result) return [];
    return [{
      area: form.area,
      price: result.predicted_price,
      isUser: true,
    }];
  }, [result, form]);

  // ==========================================
  // 3. NEAREST NEIGHBORS / SIMILAR LISTINGS
  // ==========================================
  const similarListings = useMemo(() => {
    if (!dataset.length) return [];
    
    return dataset
      .map((d) => {
        // Calculate normalized Euclidean distance based on features
        const dist = Math.sqrt(
          Math.pow((d.area - form.area) / 2500, 2) +
          Math.pow((d.bedrooms - form.bedrooms) / 4, 2) +
          Math.pow((d.bathrooms - form.bathrooms) / 3, 2) +
          Math.pow((d.parking - form.parking) / 2, 2)
        );
        // Convert to likeness score percentage (bound between 50% and 99%)
        const likeness = Math.max(50, Math.min(99, Math.round((1 - dist / 2) * 100)));
        return { ...d, likeness };
      })
      .sort((a, b) => b.likeness - a.likeness)
      .slice(0, 5);
  }, [dataset, form]);

  return (
    <div className="glass-card p-6 mt-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Grid className="text-purple-400" size={20} />
            Market Visualization & Analytics
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            Live interactive charting compiled directly from our {dataset.length.toLocaleString()} listing database
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 self-start">
          <button
            onClick={() => setActiveTab("distribution")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === "distribution"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Price Distribution
          </button>
          <button
            onClick={() => setActiveTab("scatter")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === "scatter"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Area vs Price
          </button>
          <button
            onClick={() => setActiveTab("similar")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === "similar"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Similar Listings
          </button>
        </div>
      </div>

      {/* VIEWPORT CONTROLLER */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === "distribution" && (
            <motion.div
              key="distribution"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-80"
            >
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-xs text-gray-500 font-semibold uppercase">Listing Count per Price Bracket</span>
                {result && (
                  <span className="text-xs text-purple-400 font-semibold flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-yellow-500 inline-block animate-pulse"></span>
                    Current Prediction Bracket
                  </span>
                )}
              </div>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={histogramData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke="#6b21a8" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const bin = payload[0].payload;
                        return (
                          <div className="bg-[#0f172a] p-3 rounded-xl border border-white/10 shadow-xl">
                            <p className="text-gray-400 text-xs font-medium">Price Range: {bin.name}</p>
                            <p className="text-purple-400 font-bold text-sm mt-0.5">
                              {bin.count.toLocaleString()} Listings
                            </p>
                            {bin.isUserBin && (
                              <p className="text-yellow-400 text-[10px] font-bold uppercase mt-1 flex items-center gap-1">
                                <Star size={10} fill="currentColor" /> Predicted House is Here
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} animationDuration={1000}>
                    {histogramData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isUserBin ? "#f59e0b" : "#7c3aed"}
                        fillOpacity={entry.isUserBin ? 0.95 : 0.4}
                        stroke={entry.isUserBin ? "#f59e0b" : "#a855f7"}
                        strokeWidth={entry.isUserBin ? 2 : 1}
                        style={{
                          filter: entry.isUserBin 
                            ? "drop-shadow(0px 0px 8px rgba(245,158,11,0.5))" 
                            : "none"
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {activeTab === "scatter" && (
            <motion.div
              key="scatter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-80"
            >
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-xs text-gray-500 font-semibold uppercase">Area (sqft) vs Price (₹) Distribution</span>
                {result && (
                  <span className="text-xs text-yellow-400 font-semibold flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block animate-ping"></span>
                    Your Valuation
                  </span>
                )}
              </div>
              <ResponsiveContainer width="100%" height="90%">
                <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6b21a8" opacity={0.1} />
                  <XAxis
                    type="number"
                    dataKey="area"
                    name="Area"
                    unit=" sqft"
                    domain={[500, 3000]}
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                  />
                  <YAxis
                    type="number"
                    dataKey="price"
                    name="Price"
                    domain={[1500000, 10500000]}
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    tickFormatter={(tick) => `₹${(tick / 100000).toFixed(0)}L`}
                  />
                  <ZAxis type="number" range={[40, 300]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3", stroke: "#a855f7", opacity: 0.3 }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const pt = payload[0].payload;
                        return (
                          <div className="bg-[#0f172a] p-3 rounded-xl border border-white/10 shadow-xl">
                            <p className="text-gray-400 text-xs font-semibold">
                              {pt.isUser ? "⭐ YOUR PROPOSED HOUSE" : "Listing Database"}
                            </p>
                            <p className="text-white text-xs mt-1">Area: <span className="font-bold">{pt.area.toLocaleString()} sqft</span></p>
                            <p className="text-purple-400 font-bold text-sm mt-0.5">
                              Price: ₹{pt.price.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {/* Database scatter dots */}
                  <Scatter name="Database" data={scatterData} fill="#38bdf8" fillOpacity={0.35} line={false}>
                    {scatterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#38bdf8" />
                    ))}
                  </Scatter>
                  {/* User highlighted pulsating prediction dot */}
                  {result && (
                    <Scatter name="User" data={userScatterPoint} fill="#f59e0b" line={false}>
                      <Cell
                        fill="#f59e0b"
                        stroke="#ffffff"
                        strokeWidth={2}
                        style={{
                          filter: "drop-shadow(0px 0px 12px rgba(245,158,11,0.9))",
                          cursor: "pointer",
                        }}
                      />
                    </Scatter>
                  )}
                </ScatterChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {activeTab === "similar" && (
            <motion.div
              key="similar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full overflow-x-auto"
            >
              <div className="flex justify-between items-center mb-4 px-1">
                <span className="text-xs text-gray-500 font-semibold uppercase">Top 5 Closest Matching Database Listings</span>
                <span className="text-xs text-gray-400">Match score calculated dynamically</span>
              </div>
              
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-xs font-semibold">
                    <th className="pb-3 pl-2">LIKENESS</th>
                    <th className="pb-3">AREA</th>
                    <th className="pb-3">BED/BATH</th>
                    <th className="pb-3">PARKING</th>
                    <th className="pb-3">SPECS</th>
                    <th className="pb-3 text-right pr-2">PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {similarListings.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 text-xs text-gray-300 hover:bg-white/5 transition duration-200"
                    >
                      <td className="py-3.5 pl-2">
                        <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-bold">
                          {item.likeness}% Match
                        </span>
                      </td>
                      <td className="py-3.5 font-semibold text-white">
                        {item.area.toLocaleString()} sqft
                      </td>
                      <td className="py-3.5">
                        {item.bedrooms} Bed / {item.bathrooms} Bath
                      </td>
                      <td className="py-3.5">
                        {item.parking} slots
                      </td>
                      <td className="py-3.5 text-[11px] text-gray-500">
                        Floor {item.floor} · {item.age_of_house} yrs · {item.near_metro ? "Near Metro" : "No Metro"}
                      </td>
                      <td className="py-3.5 text-right font-extrabold text-white pr-2">
                        ₹ {item.price.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}