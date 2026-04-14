import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const words = ["second chance.", "safe future.", "new family.", "better life."];

export default function Hero() {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-6 pt-20">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-orange-500/3 blur-[150px] pointer-events-none" />

      <div className="text-center relative z-10 max-w-5xl">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 px-5 py-2.5 rounded-full text-sm font-bold mb-10 hover:border-orange-500/30 transition-all">
          🇮🇳 India's First Real-time Animal Rescue Network
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-6">
          Your one click,<br />
          their{" "}
          <span className="text-orange-500 inline-block min-w-[10px]">
            {words[wordIndex]}
          </span>
        </h1>

        <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Spot a stray. Report in 30 seconds. Our AI + Government network handles the rest — rescue, vaccinate, rehome.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button onClick={() => navigate("/register")}
            className="px-10 py-4 bg-orange-500 text-black font-black text-lg rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_40px_rgba(249,115,22,0.35)]">
            START RESCUE 🐾
          </button>
          <button onClick={() => navigate("/dashboard")}
            className="px-10 py-4 bg-zinc-900 text-white font-bold text-lg rounded-2xl border border-zinc-800 hover:border-zinc-600 transition-all">
            Live Map 🗺️
          </button>
        </div>

        <div className="flex justify-center gap-10 md:gap-16 flex-wrap">
          {[
            ["1,247+", "ANIMALS REPORTED"],
            ["389+", "RESCUED & VACCINATED"],
            ["52", "CITIES ACTIVE"],
          ].map(([num, label]) => (
            <div key={label} className="text-center border-l-2 border-orange-500 pl-5">
              <div className="text-4xl font-black text-white">{num}</div>
              <div className="text-zinc-500 text-xs uppercase tracking-[0.15em] mt-1 font-bold">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
