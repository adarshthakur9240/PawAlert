import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const PHRASES = [
  "Spot a stray? Be their voice.",
  "Every life deserves a second chance.",
  "India's First Real-time Rescue Network."
];

const DOCTORS = [
  { name: "Dr. Priya Sharma", spec: "Emergency Surgeon", org: "AIIMS Animal Care", color: "#FF9933", avatar: "PS" },
  { name: "Dr. Arjun Mehta", spec: "Wildlife Specialist", org: "SPCA India", color: "#138808", avatar: "AM" },
  { name: "Dr. Sarah Chen", spec: "Rescue Physician", org: "WHO Animal Health", color: "#3b82f6", avatar: "SC" },
  { name: "Dr. Ravi Nair", spec: "Rehabilitation Expert", org: "Blue Cross", color: "#8b5cf6", avatar: "RN" }
];

const AnimatedText = () => {
  const [idx, setIdx] = useState(0);
  const [disp, setDisp] = useState("");
  const [del, setDel] = useState(false);
  const [char, setChar] = useState(0);

  useEffect(() => {
    const cur = PHRASES[idx];
    let tm;
    if (!del && char < cur.length) {
      tm = setTimeout(() => { setDisp(cur.slice(0, char + 1)); setChar(c => c + 1); }, 50);
    } else if (!del && char === cur.length) {
      tm = setTimeout(() => setDel(true), 2000);
    } else if (del && char > 0) {
      tm = setTimeout(() => { setDisp(cur.slice(0, char - 1)); setChar(c => c - 1); }, 30);
    } else if (del && char === 0) {
      setDel(false); setIdx(i => (i + 1) % PHRASES.length);
    }
    return () => clearTimeout(tm);
  }, [char, del, idx]);

  return <span className="text-orange-500">{disp}<span className="animate-pulse">|</span></span>;
};

const Home = () => {
  return (
    <div className="bg-[#050505] text-white font-['Outfit',sans-serif] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION - CLEANED */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="bg-orange-500/10 border border-orange-500/20 text-orange-500 px-6 py-2 rounded-full text-xs font-bold mb-8 uppercase tracking-widest">
          🇮🇳 Community Animal Rescue Network
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-10 leading-[1.1] tracking-tighter max-w-5xl">
          <AnimatedText />
        </h1>
        <div className="flex flex-col md:flex-row gap-5 mt-4">
          <a href="/dashboard" className="bg-orange-500 text-black px-12 py-5 rounded-2xl font-black uppercase tracking-tighter hover:scale-105 transition shadow-[0_20px_50px_rgba(249,115,22,0.2)] text-lg">Start Rescue</a>
          <a href="/dashboard" className="bg-zinc-900 border border-zinc-800 px-12 py-5 rounded-2xl font-bold hover:bg-zinc-800 transition text-lg">Live Map</a>
        </div>
      </section>

      {/* ABOUT SECTION - RE-STYLIZED */}
      <section className="py-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20 border-t border-zinc-900">
        <div className="flex-1 relative">
          <div className="absolute -inset-4 bg-orange-500/10 blur-3xl rounded-full"></div>
          <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000" className="relative rounded-[3rem] shadow-2xl border border-zinc-800 z-10" alt="What we do" />
          <div className="absolute bottom-10 left-10 bg-white p-5 rounded-2xl z-20 flex items-center gap-3 shadow-2xl">
            <div className="flex -space-x-3">
              <div className="size-10 rounded-full bg-orange-500 border-4 border-white"></div>
              <div className="size-10 rounded-full bg-zinc-800 border-4 border-white text-[8px] flex items-center justify-center font-bold text-white">50+</div>
            </div>
            <p className="text-black font-black text-xs uppercase italic">Active Saviors Today</p>
          </div>
        </div>
        <div className="flex-1 space-y-8">
          <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm">What we do?</h2>
          <h3 className="text-4xl md:text-6xl font-black leading-tight">Every Life Deserves <br/> <span className="text-zinc-600">A Second Chance.</span></h3>
          <p className="text-zinc-500 text-lg leading-relaxed font-medium">
            PawAlert transforms animal emergencies into immediate actions. Our AI diagnostics and real-time GOI-aligned coordination ensure help reaches strays within minutes, not hours.
          </p>
          <div className="flex gap-10 pt-4">
             <div><h4 className="text-3xl font-black">70%</h4><p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Govt Support</p></div>
             <div><h4 className="text-3xl font-black">20%</h4><p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">NGO Network</p></div>
          </div>
        </div>
      </section>

      {/* DOCTORS SECTION - 4 EXPERTS GRID */}
      <section className="py-32 bg-zinc-950/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Expert Support 🏥</h2>
             <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Certified Veterinary Network</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DOCTORS.map((doc, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-orange-500/50 transition duration-500 group">
                <div className="size-16 rounded-2xl mb-8 flex items-center justify-center font-black text-xl shadow-lg transition group-hover:scale-110" style={{ backgroundColor: doc.color + '22', color: doc.color, border: `2px solid ${doc.color}44` }}>
                  {doc.avatar}
                </div>
                <h4 className="text-xl font-black mb-2">{doc.name}</h4>
                <p className="text-zinc-500 text-sm font-bold mb-4">{doc.spec}</p>
                <div className="pt-4 border-t border-zinc-800">
                   <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{doc.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center opacity-30 text-xs font-bold uppercase tracking-widest">
        PawAlert 2026 · Adarsh Thakur · JSSATE Noida 🐾
      </footer>
    </div>
  );
};

export default Home;
