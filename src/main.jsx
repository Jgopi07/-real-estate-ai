import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ ADD THIS
import App from "./App.jsx";
import "./index.css";

/* 🔥 Prevent layout shift (smooth load) */
document.body.style.backgroundColor = "#020617";

/* 🚀 Render App with Router */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>   {/* ✅ REQUIRED for routing */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);