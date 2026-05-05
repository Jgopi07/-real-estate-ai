import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Detect scroll (glass effect)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Smart scroll to predictor
  const goToPredictor = () => {
    if (location.pathname !== "/") {
      // go to home first, then scroll
      navigate("/#predictor");

      setTimeout(() => {
        document.getElementById("predictor")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);
    } else {
      document.getElementById("predictor")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // 🔥 Logo click (always go home)
  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex justify-center fixed top-0 z-50 transition-all duration-500">

      {/* 🔥 NAVBAR CONTAINER */}
      <div
        className={`
          w-[92%] max-w-7xl flex items-center justify-between px-6 py-3 rounded-full
          backdrop-blur-xl border transition-all duration-500

          ${
            scrolled
              ? "bg-white/10 border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              : "bg-white/5 border-white/10"
          }
        `}
      >

        {/* 🔥 LOGO */}
        <div
          onClick={goHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
            ✨
          </div>

          <span className="font-semibold text-lg tracking-wide group-hover:text-purple-400 transition duration-300">
            Estatica.AI
          </span>
        </div>

        {/* 🔥 MENU */}
        <div className="hidden md:flex gap-8 text-gray-300 text-sm font-medium">

          <Link
            to="/features"
            className="relative group hover:text-white transition"
          >
            Features
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/pricing"
            className="relative group hover:text-white transition"
          >
            Pricing
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/docs"
            className="relative group hover:text-white transition"
          >
            Docs
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

        </div>

        {/* 🔥 CTA BUTTON */}
        <button
          onClick={goToPredictor}
          className="relative px-6 py-2 rounded-full font-semibold text-black overflow-hidden group active:scale-95 transition"
        >

          {/* gradient */}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400"></span>

          {/* glow */}
          <span className="absolute inset-0 blur-md opacity-40 bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400"></span>

          {/* hover shine */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/20"></span>

          {/* text */}
          <span className="relative z-10">
            Get Started
          </span>

        </button>

      </div>
    </div>
  );
}