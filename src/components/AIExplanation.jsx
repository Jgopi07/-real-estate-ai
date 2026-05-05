import { motion } from "framer-motion";

export default function AIExplanation({ data, confidence, similarCount }) {

  // =========================
  // 🔥 RAW FEATURE DATA (NO STATIC FALLBACK)
  // =========================
  const rawItems = [
    { label: "Area", value: data?.[0] ?? 0 },
    { label: "Bedrooms", value: data?.[1] ?? 0 },
    { label: "Bathrooms", value: data?.[2] ?? 0 },
    { label: "Location", value: data?.[3] ?? 0 },
    { label: "Metro", value: data?.[6] ?? 0 },
  ];

  // =========================
  // 🔥 NORMALIZE VALUES (TOTAL = 1)
  // =========================
  const total = rawItems.reduce((sum, item) => sum + item.value, 0);

  const items = rawItems.map(item => ({
    ...item,
    value: total ? item.value / total : 0
  }));

  // =========================
  // 🔥 TOP CONTRIBUTORS
  // =========================
  const sorted = [...items].sort((a, b) => b.value - a.value);

  const top1 = sorted[0];
  const top2 = sorted[1];

  // =========================
  // 🔥 DYNAMIC INSIGHT TEXT
  // =========================
  const getInsight = () => {
    if (!confidence) return "Run a prediction to see AI insights.";

    if (confidence > 85)
      return "High confidence prediction based on strong dataset similarity.";

    if (confidence > 70)
      return "Moderate confidence with reliable comparable properties.";

    if (confidence > 60)
      return "Limited comparable data, prediction uses broader heuristics.";

    return "Low confidence due to insufficient similar property data.";
  };

  // =========================
  // 🔥 CONFIDENCE COLOR
  // =========================
  const getConfidenceColor = () => {
    if (!confidence) return "text-gray-400";
    if (confidence > 85) return "text-green-400";
    if (confidence > 70) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6"
    >

      {/* ========================= */}
      {/* 🔥 HEADER */}
      {/* ========================= */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-400 text-sm">💡 AI EXPLANATION</p>
        <span className="text-xs text-gray-500">Insights</span>
      </div>

      {/* ========================= */}
      {/* 🧠 DYNAMIC TEXT */}
      {/* ========================= */}
      <p className="text-gray-300 mb-5 leading-relaxed">
        The predicted price is primarily influenced by{" "}
        <span className="text-white font-semibold">{top1.label}</span>{" "}
        ({Math.round(top1.value * 100)}%), followed by{" "}
        <span className="text-white font-semibold">{top2.label}</span>.
        These features have the highest impact on valuation.
      </p>

      {/* ========================= */}
      {/* 📊 CONFIDENCE + DATA */}
      {/* ========================= */}
      {confidence && (
        <div className="mb-5 flex justify-between text-sm">

          <span className="text-gray-400">
            Confidence:
            <span className={`ml-1 font-semibold ${getConfidenceColor()}`}>
              {confidence}%
            </span>
          </span>

          <span className="text-gray-400">
            Similar Homes:
            <span className="text-purple-400 ml-1 font-semibold">
              {similarCount}
            </span>
          </span>

        </div>
      )}

      {/* ========================= */}
      {/* 🔥 PROGRESS BARS */}
      {/* ========================= */}
      <div className="space-y-5">
        {items.map((item, i) => (
          <div key={i}>

            {/* LABEL */}
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{item.label}</span>
              <span className="text-gray-400">
                {Math.round(item.value * 100)}%
              </span>
            </div>

            {/* BAR */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #7c3aed, #a855f7, #f59e0b)",
                  boxShadow:
                    "0 0 10px rgba(168,85,247,0.4), 0 0 20px rgba(168,85,247,0.2)",
                }}
              />

            </div>

          </div>
        ))}
      </div>

      {/* ========================= */}
      {/* 🔍 EXTRA INSIGHT */}
      {/* ========================= */}
      <div className="mt-6 text-xs text-gray-500 leading-relaxed">
        {getInsight()} The model evaluates similar properties from the dataset
        and applies weighted feature contributions inspired by Random Forest logic.
      </div>

    </motion.div>
  );
}