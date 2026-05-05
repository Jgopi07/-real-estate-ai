import { motion } from "framer-motion";
import { Cpu, BarChart3, Zap, ShieldCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Cpu size={28} />,
      title: "Advanced ML Engine",
      desc: "Powered by Random Forest trained on 12,540+ real-world transactions.",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Feature Importance",
      desc: "Understand how each factor influences property valuation.",
    },
    {
      icon: <Zap size={28} />,
      title: "Instant Predictions",
      desc: "Get accurate predictions in under 50 milliseconds.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Reliable & Accurate",
      desc: "Achieves 93.7% accuracy across multiple property scenarios.",
    },
  ];

  return (
    <div className="min-h-screen px-6 pt-32 pb-20 max-w-7xl mx-auto">

      {/* 🔥 HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Powerful Features for{" "}
          <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Smart Decisions
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Built with modern machine learning techniques to deliver fast,
          explainable, and reliable real estate predictions.
        </p>
      </motion.div>

      {/* 🔥 FEATURES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">

        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 text-center hover:scale-105 transition"
          >

            <div className="mb-4 flex justify-center text-purple-400">
              {f.icon}
            </div>

            <h3 className="font-semibold text-lg mb-2">
              {f.title}
            </h3>

            <p className="text-gray-400 text-sm">
              {f.desc}
            </p>

          </motion.div>
        ))}

      </div>

      {/* 🔥 STATS SECTION */}
      <div className="grid md:grid-cols-3 gap-6 mb-20 text-center">

        <div className="glass-card p-6">
          <h2 className="text-4xl font-bold text-purple-400">12,540+</h2>
          <p className="text-gray-400 mt-2">Data Points</p>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-4xl font-bold text-purple-400">93.7%</h2>
          <p className="text-gray-400 mt-2">Accuracy</p>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-4xl font-bold text-purple-400">&lt;50ms</h2>
          <p className="text-gray-400 mt-2">Prediction Speed</p>
        </div>

      </div>

      {/* 🔥 HOW IT WORKS */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-400">
          Simple workflow powered by machine learning
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {[
          "Input property details",
          "Model analyzes features",
          "Instant price prediction",
        ].map((step, i) => (
          <div key={i} className="glass-card p-6 text-center">
            <div className="text-purple-400 text-2xl font-bold mb-2">
              {i + 1}
            </div>
            <p className="text-gray-300">{step}</p>
          </div>
        ))}

      </div>

    </div>
  );
}