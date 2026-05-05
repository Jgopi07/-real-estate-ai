import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Copy, Play } from "lucide-react";

export default function Docs() {
  const [form, setForm] = useState({
    area: 1200,
    bedrooms: 3,
    bathrooms: 2,
    location_score: 7,
    age_of_house: 5,
    floor: 2,
    near_metro: 1,
    parking: 1,
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  // 🔥 call API
  const runAPI = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4000/predict", form);
      setResponse(res.data);
    } catch (err) {
      setResponse({ error: "API request failed" });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 copy function
  const copyToClipboard = (data) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen px-6 pt-32 pb-20 max-w-6xl mx-auto">

      {/* 🔥 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl font-bold mb-4">
          Interactive{" "}
          <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Docs
          </span>
        </h1>

        <p className="text-gray-400">
          Test the ML API directly from the browser
        </p>
      </motion.div>

      {/* 🔥 API INFO */}
      <div className="glass-card p-5 mb-10">
        <p className="text-purple-400">POST /predict</p>
        <p className="text-gray-400 text-sm">
          Predict house prices using Random Forest model
        </p>
      </div>

      {/* 🔥 INPUT FORM */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">

        <div className="glass-card p-6">
          <h2 className="mb-4 font-semibold text-lg">Request Body</h2>

          <div className="space-y-4">
            {Object.keys(form).map((key) => (
              <div key={key}>
                <label className="text-sm text-gray-400">{key}</label>
                <input
                  type="number"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded bg-black/30 border border-white/10 text-white"
                />
              </div>
            ))}
          </div>

          <button
            onClick={runAPI}
            className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 text-black font-semibold flex items-center justify-center gap-2"
          >
            <Play size={16} />
            {loading ? "Running..." : "Run API"}
          </button>
        </div>

        {/* 🔥 RESPONSE */}
        <div className="glass-card p-6">
          <div className="flex justify-between mb-3">
            <h2 className="font-semibold text-lg">Response</h2>

            <button
              onClick={() => copyToClipboard(response)}
              className="text-gray-400 hover:text-white"
            >
              <Copy size={18} />
            </button>
          </div>

          <pre className="text-sm text-green-400 overflow-x-auto">
{response
  ? JSON.stringify(response, null, 2)
  : "// Run API to see response"}
          </pre>
        </div>

      </div>

      {/* 🔥 MODEL INFO */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-3">🧠 Model Info</h2>

        <p className="text-gray-300 mb-3">
          This system uses a <span className="text-purple-400">Random Forest Regressor</span>
          trained on 12,540 data points.
        </p>

        <ul className="text-gray-400 text-sm space-y-1">
          <li>✔ Ensemble learning (multiple trees)</li>
          <li>✔ Handles complex patterns</li>
          <li>✔ Provides feature importance</li>
        </ul>
      </div>

    </div>
  );
}