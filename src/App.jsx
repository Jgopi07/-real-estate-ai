import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

/* PAGES */
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Docs from "./pages/Docs";

export default function App() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-[#020617]">

      {/* 🔥 PARALLAX MULTI-LAYER BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        {/* Layer 1 */}
        <div className="absolute top-[-250px] left-[10%] w-[700px] h-[700px] bg-purple-600/20 blur-[180px] animate-floatSlow" />

        {/* Layer 2 */}
        <div className="absolute top-[150px] right-[10%] w-[600px] h-[600px] bg-indigo-600/20 blur-[180px] animate-float" />

        {/* Layer 3 */}
        <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-pink-500/10 blur-[200px] animate-floatSlow" />

        {/* Extra glow */}
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-purple-500/10 blur-[140px]" />
      </div>

      {/* 🔥 NAVBAR (VISIBLE ON ALL PAGES) */}
      <Navbar />

      {/* 🔥 ROUTES */}
      <main className="relative z-10">

        <Routes>

          {/* 🏠 HOME PAGE */}
          <Route path="/" element={<Home />} />

          {/* ⭐ FEATURES */}
          <Route path="/features" element={<Features />} />

          {/* 💰 PRICING */}
          <Route path="/pricing" element={<Pricing />} />

          {/* 📄 DOCS */}
          <Route path="/docs" element={<Docs />} />

        </Routes>

      </main>

      {/* 🔥 FOOTER */}
      <footer className="relative z-10 text-center text-gray-500 py-12 text-sm border-t border-white/10 mt-16 backdrop-blur-md">
        <p className="mb-2">© 2026 Estatica.AI</p>
        <p className="text-gray-600 text-xs">
          Smart House Price Predictor · Powered by Machine Learning
        </p>
      </footer>

    </div>
  );
}