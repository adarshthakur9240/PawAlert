import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// 1. IMPACTFUL PHRASES
const PHRASES = [
  "Spot a stray? Be their voice.",
  "Every life deserves a savior.",
  "Your one click, their second chance.",
  "India's First Real-time Rescue Network."
];

// 2. RESCUED ANIMALS (OUR LATEST CREATIONS STYLE)
const RESCUED_GALLERY = [
  { name: "Sheru", status: "Rescued", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800" },
  { name: "Bella", status: "In Recovery", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800" },
  { name: "Charlie", status: "Adopted", img: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=800" },
  { name: "Luna", status: "Vaccinated", img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=800" },
  { name: "Rocky", status: "Safe Now", img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800" }
];

// 3. FAQS
const FAQS = [
  { q: "How do we support the GOI?", a: "We provide real-time GPS coordinates of injured animals directly to municipal authorities, improving response speed by 80%." },
  { q: "What is the NGO role?", a: "NGOs act as primary medical responders and long-term shelters for critically injured strays." },
  { q: "Is the platform free?", a: "Yes, for citizens, it is 100% free to report. We are funded by community donations." }
];

// 4. TESTIMONIALS
const TESTIMONIALS = [
  { name: "Adarsh Singh", company: "Citizen Savior", desc: "Reported an injured cow at 2 AM, authorities reached within 30 mins.", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100" },
  { name: "Priya Sharma", company: "NGO Head", desc: "PawAlert removed the guesswork. We now know exactly where help is needed.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100" }
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

  return <span className="text-orange-500 font-black">{disp}<span>|</span></span>;
};

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-orange-500/30">
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="bg-orange-500/10 border border-orange-500/20 text-orange-500 px-6 py-2 rounded-full text-sm font-bold mb-8">
          🇮🇳 India's First Real-time Animal Rescue Network
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">
          <AnimatedText />
        </h1>
        <div className="flex gap-4 mt-8">
          <a href="/dashboard" className="bg-orange-500 text-black px-10 py-4 rounded-2xl font-black uppercase tracking-tighter hover:scale-105 transition">Start Rescue</a>
          <a href="/dashboard" className="bg-zinc-900 border border-zinc-800 px-10 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition">Live Map</a>
        </div>
      </section>

      {/* IMPACT STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto py-20 px-6 border-y border-zinc-900">
        <div className="text-center"><h3 className="text-5xl font-black text-orange-500">70%</h3><p className="text-zinc-500 font-bold uppercase text-xs mt-2">Govt Responded</p></div>
        <div className="text-center"><h3 className="text-5xl font-black text-white">20%</h3><p className="text-zinc-500 font-bold uppercase text-xs mt-2">NGO Managed</p></div>
        <div className="text-center"><h3 className="text-5xl font-black text-green-500">10%</h3><p className="text-zinc-500 font-bold uppercase text-xs mt-2">Citizen Support</p></div>
      </div>

      {/* WHAT WE DO (WITH RESCUE IMAGE) */}
      <section className="py-32 px-6 flex flex-col md:flex-row items-center justify-center gap-16 max-w-7xl mx-auto">
        <div className="relative group flex-1">
          <img className="max-w-md w-full rounded-[2.5rem] shadow-2xl border border-zinc-800 grayscale-[0.5] group-hover:grayscale-0 transition duration-700"
               src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000" alt="Rescue Operation" />
          <div className="absolute bottom-6 left-6 bg-white p-4 rounded-2xl flex items-center gap-3">
             <div className="flex -space-x-2"><div className="size-8 bg-orange-500 rounded-full border-2 border-white"></div><div className="size-8 bg-zinc-800 rounded-full border-2 border-white"></div></div>
             <p className="text-xs font-bold text-black italic">Join 50+ Daily Saviors</p>
          </div>
        </div>
        <div className="flex-1 max-w-lg">
          <h2 className="text-xl uppercase font-bold text-orange-500 tracking-widest">What we do?</h2>
          <div className="w-20 h-1.5 bg-orange-500 rounded-full mt-2"></div>
          <p className="mt-10 text-zinc-400 text-lg leading-relaxed italic">
            "Every life deserves a second chance."
          </p>
          <p className="mt-4 text-zinc-500 leading-relaxed">
            PawAlert transforms the way we handle animal emergencies. Our AI diagnostics and real-time GOI-aligned coordination ensure that every report is acted upon by verified NGOs and Municipalities.
          </p>
        </div>
      </section>

      {/* RESCUES GALLERY */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16">Latest Rescues 🐾</h2>
        <div className="flex gap-3 h-[450px]">
          {RESCUED_GALLERY.map((res, i) => (
            <div key={i} className="relative group flex-grow transition-all w-20 rounded-3xl overflow-hidden h-full duration-700 hover:w-full border border-zinc-900">
              <img src={res.img} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt="rescue" />
              <div className="absolute bottom-0 p-8 bg-gradient-to-t from-black to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity">
                <h4 className="text-2xl font-black">{res.name}</h4>
                <p className="text-orange-500 font-bold uppercase text-xs">{res.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS (AUTO-SCROLL) */}
      <section className="py-32 bg-zinc-950/30 overflow-hidden">
        <h2 className="text-4xl font-black text-center mb-20">Community Love ❤️</h2>
        <div className="flex gap-6 animate-scroll-marquee w-[200%]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="min-w-[400px] bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
              <p className="text-zinc-400 italic font-medium mb-6">"{t.desc}"</p>
              <div className="flex items-center gap-4">
                <img src={t.img} className="size-12 rounded-full border-2 border-orange-500" alt="user" />
                <div><h5 className="font-bold">{t.name}</h5><p className="text-xs text-zinc-600 uppercase font-black">{t.company}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16 italic font-serif leading-tight">Frequently Asked 🐾</h2>
        <div className="space-y-4">
          {FAQS.map((f, i) => (
            <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl cursor-pointer hover:border-orange-500/30 transition">
              <div className="flex justify-between items-center font-bold">{f.q} <span>{openFaq === i ? '-' : '+'}</span></div>
              {openFaq === i && <p className="mt-4 text-zinc-500 leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 text-center text-zinc-600 text-sm border-t border-zinc-900">
        <p>PawAlert 2026 · Adarsh Thakur · JSSATE Noida 🐾</p>
      </footer>

      <style>{`
        @keyframes scroll-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-scroll-marquee { animation: scroll-marquee 30s linear infinite; }
      `}</style>
    </div>
  );
};

export default Home;
