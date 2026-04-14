import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const PHRASES = [
  { text: "Spot a stray? Be their voice.", color: "#FF9933", glow: "rgba(255,153,51,0.15)" },
  { text: "Every life deserves a second chance.", color: "#22c55e", glow: "rgba(34,197,94,0.15)" },
  { text: "India's First Real-time Rescue Network.", color: "#3b82f6", glow: "rgba(59,130,246,0.15)" }
];

const FAQS = [
    { question: "How does PawAlert connect my report to authorities?", answer: "When you submit a report, it is instantly sent to the nearest Government rescue team and registered NGOs. Our GPS system auto-assigns the closest responder." },
    { question: "Is my personal data safe?", answer: "Yes, your data is protected with secure infrastructure and encrypted connections. Location is only shared with assigned rescue personnel." },
    { question: "Can I report wildlife emergencies?", answer: "Absolutely. PawAlert supports reporting for dogs, cats, cattle, and wildlife. The AI analyzes the species to alert specific specialists." },
    { question: "What is the 'Citizen Savior' certificate?", answer: "Once your report leads to a successful rescue, you earn a downloadable recognition certificate with a scannable verification code." },
    { question: "How do NGOs join the platform?", answer: "NGOs can apply with their registration documents. Once verified, they get access to a dedicated dashboard to manage local rescues." },
    { question: "What makes PawAlert different?", answer: "We focus on real-time speed. By bridging the gap between citizens and GOI/NGO teams, we reduce the rescue lead time from hours to minutes." }
];

const AnimatedText = ({ setTheme }) => {
  const [idx, setIdx] = useState(0);
  const [disp, setDisp] = useState("");
  const [del, setDel] = useState(false);
  const [char, setChar] = useState(0);

  useEffect(() => {
    const cur = PHRASES[idx].text;
    setTheme(PHRASES[idx]);
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

  return <span style={{ color: PHRASES[idx].color, transition: "color 0.5s ease" }}>{disp}<span className="animate-pulse">|</span></span>;
};

const Home = () => {
  const [theme, setTheme] = useState(PHRASES[0]);
  const mid = Math.ceil(FAQS.length / 2);
  const columns = [FAQS.slice(0, mid), FAQS.slice(mid)];

  return (
    <div className="bg-[#050505] text-white font-['Geist',sans-serif] min-h-screen overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
      `}</style>

      {/* DYNAMIC BG GLOW */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-all duration-1000 opacity-20" style={{ backgroundColor: theme.color }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-all duration-1000 opacity-10" style={{ backgroundColor: theme.color }} />
      </div>

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-40 pb-20">
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 text-zinc-400 px-6 py-2 rounded-full text-[10px] md:text-xs font-bold mb-10 uppercase tracking-[0.3em] shadow-xl">
          🐾 Community Animal Rescue Network
        </div>
        <div className="max-w-6xl min-h-[160px] md:min-h-[280px] flex items-center justify-center mb-8">
          <h1 className="text-5xl md:text-9xl font-black leading-[1.05] tracking-tight drop-shadow-2xl">
            <AnimatedText setTheme={setTheme} />
          </h1>
        </div>
        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-12">
          From reporting injured strays to real-time NGO coordination, PawAlert is India's most advanced welfare tech platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a href="/dashboard" className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-xl text-lg">Start Rescue 🚀</a>
          <a href="/dashboard" className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800 px-12 py-5 rounded-2xl font-bold hover:bg-zinc-900 transition-all text-lg flex items-center gap-3">Live Map <div className="size-2 bg-green-500 rounded-full animate-pulse"></div></a>
        </div>
      </section>

      {/* MISSION SECTION (FIXED IMAGE) */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24 border-t border-zinc-900/50">
        <div className="flex-1 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-green-500 rounded-[3.1rem] blur opacity-25"></div>
          {/* CORRECTED IMAGE: Animal Rescue Focus */}
          <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000" className="relative rounded-[3rem] shadow-2xl border border-zinc-800 grayscale-[0.2] group-hover:grayscale-0 transition duration-700 h-[500px] w-full object-cover" alt="Animal Rescue Mission" />
        </div>
        <div className="flex-1 space-y-8">
          <h2 className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs">The Mission</h2>
          <h3 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">India&apos;s Strays <br/> <span className="text-zinc-700 italic font-serif text-5xl md:text-7xl leading-none">Are Calling.</span></h3>
          <p className="text-zinc-500 text-lg font-medium leading-relaxed">
            From the streets of Noida to the alleys of Lucknow, PawAlert is building a network of 1M+ saviors. We bridge the gap between injured animals and immediate aid.
          </p>
        </div>
      </section>

      {/* DUAL COLUMN PREMIUM FAQ */}
      <section className='relative z-10 bg-black w-full flex flex-col items-center justify-center py-32 px-4 border-t border-zinc-900/50'>
        <div className='w-full max-w-5xl'>
          <div className='mb-16 text-center'>
            <h2 className='text-5xl md:text-6xl font-black text-neutral-50 mb-6 tracking-tighter'>FAQ&apos;s</h2>
            <p className='text-neutral-500 max-w-[540px] text-lg mx-auto'>Find answers to how we coordinate rescues, protect your data, and work with local authorities.</p>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-y-0'>
            {columns.map((column, colIdx) => (
              <div key={colIdx} className='space-y-4 md:px-2'>
                {column.map((faq) => (
                  <details key={faq.question} className='group rounded-2xl border border-neutral-800 bg-neutral-950/50 transition-all duration-300 hover:bg-neutral-900'>
                    <summary className='flex cursor-pointer list-none items-center justify-between gap-4 p-5'>
                      <span className='text-sm font-bold text-neutral-200 uppercase tracking-wide'>{faq.question}</span>
                      <div className='shrink-0 text-orange-500 transition-transform group-open:rotate-45'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                      </div>
                    </summary>
                    <div className='grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-open:grid-rows-[1fr] group-open:opacity-100'>
                      <div className='overflow-hidden'>
                        <p className='px-5 pb-5 text-sm leading-relaxed text-neutral-400 font-medium'>{faq.answer}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 text-center opacity-20 text-[10px] font-black uppercase tracking-[0.5em]">
        © 2026 PawAlert · JSSATE Noida · Adarsh Thakur
      </footer>
    </div>
  );
};

export default Home;
