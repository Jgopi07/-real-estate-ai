import { motion } from "framer-motion";

export default function Hero() {

  // 🔥 scroll to predictor section
  const scrollToPredictor = () => {
    const section = document.getElementById("predictor");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative text-center mt-32 px-6 overflow-hidden">

      {/* 🔥 BACKGROUND AURA (animated glow) */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[700px] h-[700px] bg-purple-600/20 blur-[200px] rounded-full animate-pulse"></div>
      </div>

      {/* ✨ BADGE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-md shadow-md"
      >
        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        Powered by Random Forest · v2.4
      </motion.div>

      {/* 🔥 MAIN HEADING */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[64px] md:text-[110px] leading-[1.05] font-extrabold tracking-tight"
      >
        <span className="text-gray-200">Power </span>

        <span className="relative bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
          AI
        </span>

        <br />

        <span className="text-gray-200">Real Estate</span>
      </motion.h1>

      {/* 🧠 SUBTEXT */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-gray-400 mt-8 text-lg max-w-2xl mx-auto leading-relaxed"
      >
        Predict real estate prices instantly using machine learning — calibrated
        on <span className="text-white font-semibold">12,540</span> transactions
        with{" "}
        <span className="text-white font-semibold">93.7%</span> accuracy.
      </motion.p>

      {/* 🚀 BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="mt-10 flex justify-center gap-4 flex-wrap"
      >

        {/* 🔥 PRIMARY BUTTON (SCROLL) */}
        <button
          onClick={scrollToPredictor}
          className="relative px-8 py-3 rounded-full font-semibold text-black overflow-hidden group active:scale-95 transition"
        >

          {/* gradient */}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400"></span>

          {/* glow */}
          <span className="absolute inset-0 blur-md opacity-40 bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400"></span>

          {/* hover shine */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/20"></span>

          {/* text */}
          <span className="relative z-10">
            Try Prediction →
          </span>

        </button>

        {/* 🔹 SECONDARY BUTTON */}
        <button
          onClick={() => window.open("#", "_blank")}
          className="px-8 py-3 rounded-full border border-white/20 text-gray-300 hover:border-purple-400 hover:text-white transition backdrop-blur-md hover:bg-white/5"
        >
          View Docs →
        </button>

      </motion.div>

      {/* 🔥 OPTIONAL FLOATING DOTS (premium feel) */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-ping"></div>
      <div className="absolute bottom-10 right-16 w-2 h-2 bg-pink-400 rounded-full opacity-30 animate-ping"></div>

    </section>
  );
}