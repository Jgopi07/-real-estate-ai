import { motion } from "framer-motion";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      desc: "Basic access for testing",
      features: [
        "5 predictions / day",
        "Basic feature insights",
        "Community support",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹499/mo",
      desc: "For serious users",
      features: [
        "Unlimited predictions",
        "Full feature importance",
        "AI explanations",
        "Priority support",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For businesses",
      features: [
        "Custom ML models",
        "API access",
        "Dedicated support",
        "Advanced analytics",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen px-6 pt-32 pb-20 max-w-7xl mx-auto">

      {/* 🔥 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Simple & Transparent{" "}
          <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Pricing
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Choose the perfect plan for your needs. Scale your real estate insights effortlessly.
        </p>
      </motion.div>

      {/* 🔥 PRICING CARDS */}
      <div className="grid md:grid-cols-3 gap-8">

        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-8 text-center relative transition ${
              plan.highlight
                ? "border-purple-400 scale-105 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                : ""
            }`}
          >

            {/* 🔥 MOST POPULAR */}
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-xs px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}

            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>

            <p className="text-gray-400 mb-6 text-sm">{plan.desc}</p>

            <h2 className="text-4xl font-bold mb-6 text-purple-400">
              {plan.price}
            </h2>

            {/* FEATURES */}
            <ul className="space-y-3 mb-8 text-gray-300 text-sm">
              {plan.features.map((f, idx) => (
                <li key={idx}>✔ {f}</li>
              ))}
            </ul>

            {/* BUTTON */}
            <button
              className={`w-full py-3 rounded-full font-semibold transition ${
                plan.highlight
                  ? "bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 text-black"
                  : "border border-white/20 text-gray-300 hover:border-purple-400 hover:text-white"
              }`}
            >
              Get Started
            </button>

          </motion.div>
        ))}

      </div>

      {/* 🔥 EXTRA SECTION */}
      <div className="text-center mt-20">
        <p className="text-gray-400 mb-4">
          Need something custom?
        </p>
        <button className="px-6 py-3 rounded-full border border-white/20 hover:border-purple-400 transition">
          Contact Sales
        </button>
      </div>

    </div>
  );
}