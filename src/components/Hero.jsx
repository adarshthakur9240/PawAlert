import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-6">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 blur-[120px]"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/5 blur-[120px]"></div>
      <div className="text-center relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-bold mb-8">
          🐾 Community Animal Rescue Network
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-6">
          Report <span className="text-orange-500">Stray Animals,</span><br />Make Cities Safer
        </h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Spot a stray? Pin it on the map. We connect your report directly to local government authorities for vaccination, rescue, and proper care.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate("/register")}
            className="px-8 py-4 bg-orange-500 text-black font-black text-lg rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(249,115,22,0.3)]">
            📍 Report a Stray Animal
          </button>
          <button onClick={() => navigate("/login")}
            className="px-8 py-4 bg-zinc-900 text-white font-bold text-lg rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-all">
            🗺️ View Dashboard
          </button>
        </div>
        <div className="flex justify-center gap-12 mt-16 flex-wrap">
          {[["1,247+", "Animals Reported"], ["389+", "Rescued & Vaccinated"], ["52", "Cities Active"]].map(([num, label]) => (
            <div key={label} className="text-center border-l-2 border-orange-500 pl-4">
              <div className="text-3xl font-black text-white">{num}</div>
              <div className="text-zinc-500 text-sm uppercase tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
