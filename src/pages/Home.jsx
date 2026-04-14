import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const PHRASES = [
  { text: "Spot a stray? Be their voice.", color: "#FF9933", glow: "rgba(255,153,51,0.15)" },
  { text: "Every life deserves a second chance.", color: "#22c55e", glow: "rgba(34,197,94,0.15)" },
  { text: "India's First Real-time Rescue Network.", color: "#3b82f6", glow: "rgba(59,130,246,0.15)" }
];

const AnimatedText = ({ setTheme }) => {
  const [idx, setIdx] = useState(0);
  const [disp, setDisp] = useState("");
  const [del, setDel] = useState(false);
  const [char, setChar] = useState(0);

  useEffect(() => {
    const cur = PHRASES[idx].text;
    setTheme(PHRASES[idx]); // Update theme for BG glow
    let tm;
    if (!del && char < cur.length) {
      tm = setTimeout(() => { setDisp(cur.slice(0, char + 1)); setChar(c => c + 1); }, 45);
    } else if (!del && char === cur.length) {
      tm = setTimeout(() => setDel(true), 2500);
    } else if (del && char > 0) {
      tm = setTimeout(() => { setDisp(cur.slice(0, char - 1)); setChar(c => c - 1); }, 25);
    } else if (del && char === 0) {
      setDel(false); setIdx(i => (i + 1) % PHRASES.length);
    }
    return () => clearTimeout(tm);
  }, [char, del, idx, setTheme]);

  return (
    <span style={{ color: PHRASES[idx].color, transition: "color 0.6s ease-in-out" }}>
      {disp}<span className="animate-pulse">|</span>
    </span>
  );
};

const Home = () => {
  const [theme, setTheme] = useState(PHRASES[0]);

  return (
    <div className="bg-[#050505] text-white font-['Outfit',sans-serif] min-h-screen overflow-x-hidden relative transition-all duration-1000">
      
      {/* DYNAMIC AMBIENT GLOW */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] transition-all duration-1000 opacity-20"
          style={{ backgroundColor: theme.color }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] transition-all duration-1000 opacity-10"
          style={{ backgroundColor: theme.color }}
        />
      </div>

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 text-zinc-400 px-6 py-2 rounded-full text-[10px] md:text-xs font-bold mb-10 uppercase tracking-[0.3em] shadow-xl">
          🐾 Community Animal Rescue Network
        </div>
        
        <div className="max-w-6xl min-h-[160px] md:min-h-[280px] flex items-center justify-center mb-8">
          <h1 className="text-5xl md:text-9xl font-black leading-[1.05] tracking-tight transition-all drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <AnimatedText setTheme={setTheme} />
          </h1>
        </div>

        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
          PawAlert transforms your smartphone into a lifesaving tool. We connect injured strays with immediate care across India.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <a href="/dashboard" className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-2xl text-lg">
            Start Rescue 🚀
          </a>
          <a href="/dashboard" className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800 px-12 py-5 rounded-2xl font-bold hover:bg-zinc-900 transition-all text-lg flex items-center gap-3">
            <span>Live Map</span>
            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
          </a>
        </div>
      </section>

      {/* FOOTER - CLEAN (NO TEXT OVERLAP) */}
      <footer className="relative z-10 py-12 text-center opacity-20 text-[10px] font-black uppercase tracking-[0.5em] border-t border-zinc-900/50">
        © 2026 PawAlert · JSSATE Noida
      </footer>
    </div>
  );
};

export default Home;
