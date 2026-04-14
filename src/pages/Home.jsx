import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const PHRASES = [
  { text: "Spot a stray? Be their voice.", color: "#FF9933" },
  { text: "Every life deserves a second chance.", color: "#22c55e" },
  { text: "India's First Real-time Rescue Network.", color: "#3b82f6" },
];

const DOCTORS = [
  { name: "Dr. Priya Sharma", title: "Senior Veterinary Surgeon", org: "AIIMS Animal Care Unit, Delhi", country: "🇮🇳", spec: "Emergency Trauma & Surgery", avatar: "PS", color: "#FF9933" },
  { name: "Dr. Arjun Mehta", title: "Wildlife & Stray Specialist", org: "SPCA India, Mumbai", country: "🇮🇳", spec: "Rabies Control & Vaccination", avatar: "AM", color: "#138808" },
  { name: "Dr. Sarah Chen", title: "Animal Rescue Physician", org: "WHO Animal Health Division", country: "🇺🇸", spec: "Zoonotic Disease Prevention", avatar: "SC", color: "#3b82f6" },
  { name: "Dr. Ravi Nair", title: "Chief Veterinary Officer", org: "Blue Cross of India, Chennai", country: "🇮🇳", spec: "Rehabilitation & Adoption", avatar: "RN", color: "#8b5cf6" },
];

const FAQS = [
  { q: "How does PawAlert connect my report to authorities?", a: "When you submit a report, it is instantly sent to your nearest Government of India rescue team and registered NGOs. Our system uses GPS to auto-assign the closest responder." },
  { q: "What does the AI Animal Scan feature do?", a: "Our Gemini-powered AI analyzes your photo, identifies the species, assesses injury urgency, and provides immediate first-aid advice within seconds." },
  { q: "Who can mark an animal as Rescued or Sheltered?", a: "Only verified Government (GOI) accounts can mark animals as Rescued. NGO accounts update shelter and adoption status. This ensures full accountability." },
  { q: "How do I earn a Government Recognition Certificate?", a: "Once any animal you reported gets marked as Rescued, you earn a downloadable GOI-branded PDF certificate with Ashok Emblem and QR verification." },
  { q: "Can I report animals that are not dogs or cats?", a: "Absolutely. PawAlert supports dogs, cats, cattle, birds, monkeys, snakes, lions, tigers, and more. Our AI handles wildlife cases too." },
  { q: "How do I apply for an NGO or GOI account?", a: "Contact us at support@pawalert.in with your organisation documents. Our team verifies credentials within 48 hours." },
];

const testimonials = [
  { name: "Priya Sharma", company: "Noida Resident", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200", desc: "Spotted an injured dog near my colony. Reported on PawAlert — within 4 hours municipal team arrived. Incredible!" },
  { name: "Rahul Verma", company: "NGO Worker, Delhi", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", desc: "PawAlert transformed how we handle rescues. The AI scan feature is shockingly accurate and saves hours of work." },
  { name: "Dr. Sneha Patel", company: "Veterinarian, Mumbai", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200", desc: "The AI medication advice is medically sound. It helps citizens stabilize animals before our team arrives." },
  { name: "Amit Singh", company: "Municipal Officer, UP", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", desc: "PawAlert gives us a real-time priority dashboard. We respond faster and more efficiently than ever before." },
  { name: "Kavya Nair", company: "Animal Activist, Kerala", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200", desc: "15 rescues and counting! The GOI recognition certificate means everything. PawAlert makes every citizen a hero." },
  { name: "Dr. Rajesh Kumar", company: "AWBI Member", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200", desc: "PawAlert is the bridge India needed between citizens and government animal welfare bodies." },
  { name: "Meera Joshi", company: "Student, Pune", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200", desc: "Used PawAlert for the first time last month. 2 minutes to report with photo and GPS. The simplicity is its superpower." },
  { name: "Arjun Mehta", company: "Software Engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200", desc: "Reported an injured peacock — AI identified it instantly and gave specific first-aid steps. Rescued same day." },
  { name: "Sunita Devi", company: "Teacher, Jaipur", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200", desc: "My students use PawAlert as a civic education tool. It teaches empathy, responsibility and real impact." },
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
    if (!del && char < cur.length) tm = setTimeout(() => { setDisp(cur.slice(0, char + 1)); setChar(c => c + 1); }, 45);
    else if (!del && char === cur.length) tm = setTimeout(() => setDel(true), 2500);
    else if (del && char > 0) tm = setTimeout(() => { setDisp(cur.slice(0, char - 1)); setChar(c => c - 1); }, 25);
    else if (del && char === 0) { setDel(false); setIdx(i => (i + 1) % PHRASES.length); }
    return () => clearTimeout(tm);
  }, [char, del, idx, setTheme]);

  return (
    <span style={{ color: PHRASES[idx].color, transition: "color 0.6s" }}>
      {disp}<span className="animate-pulse">|</span>
    </span>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(PHRASES[0]);
  const [openFaq, setOpenFaq] = useState(null);

  const tcols = [
    { items: testimonials.slice(0, 3), cls: "animate-scroll-up-1" },
    { items: testimonials.slice(3, 6), cls: "hidden md:block animate-scroll-up-2" },
    { items: testimonials.slice(6, 9), cls: "hidden lg:block animate-scroll-up-3" },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen overflow-x-hidden relative">
      <style>{`
        @keyframes scroll-up { 0%{transform:translateY(0)} 100%{transform:translateY(-50%)} }
        .animate-scroll-up-1{animation:scroll-up 25s linear infinite}
        .animate-scroll-up-2{animation:scroll-up 32s linear infinite}
        .animate-scroll-up-3{animation:scroll-up 20s linear infinite}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .marquee-track{animation:marquee 20s linear infinite}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.7s ease both}
        .doc-card:hover{transform:translateY(-6px)!important;box-shadow:0 24px 48px rgba(0,0,0,0.4)!important}
      `}</style>

      {/* DYNAMIC BG GLOW */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] transition-all duration-1000 opacity-15" style={{ backgroundColor: theme.color }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[140px] transition-all duration-1000 opacity-8" style={{ backgroundColor: theme.color }} />
      </div>

      <Navbar />

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16">
        <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800/60 text-zinc-400 px-6 py-2.5 rounded-full text-[11px] font-black mb-10 uppercase tracking-[0.3em] fade-up">
          🐾 Community Animal Rescue Network
        </div>

        <div className="max-w-5xl w-full min-h-[140px] md:min-h-[220px] flex items-center justify-center mb-8 fade-up">
          <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tight">
            <AnimatedText setTheme={setTheme} />
          </h1>
        </div>

        <p className="text-zinc-500 text-lg max-w-xl font-medium leading-relaxed mb-10 fade-up">
          PawAlert transforms your smartphone into a lifesaving tool. We connect injured strays with immediate care across India.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 fade-up">
          <button onClick={() => navigate("/register")}
            className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-tight hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-2xl text-base">
            Start Rescue 🚀
          </button>
          <button onClick={() => navigate("/dashboard")}
            className="bg-zinc-950/60 backdrop-blur-xl border border-zinc-800 px-10 py-4 rounded-2xl font-bold hover:bg-zinc-900 transition-all text-base flex items-center justify-center gap-3">
            Live Map <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
          </button>
        </div>

        <div className="flex gap-0 border-t border-zinc-800/60 pt-10 fade-up">
          {[["1,247+", "Animals Reported"], ["389+", "Rescued & Vaccinated"], ["52", "Cities Active"]].map(([num, label], i) => (
            <div key={label} className={`px-8 md:px-14 text-center ${i < 2 ? "border-r border-zinc-800/60" : ""}`}>
              <div className="text-3xl md:text-4xl font-black text-white">{num}</div>
              <div className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 py-16 border-y border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["96%", "Govt Response Rate", "text-orange-500"], ["4.2h", "Avg Response Time", "text-white"], ["12K+", "Active Saviors", "text-orange-500"], ["389+", "Animals Rescued", "text-white"]].map(([n, l, c]) => (
            <div key={l}>
              <div className={`text-4xl font-black ${c} mb-1`}>{n}</div>
              <div className="text-zinc-600 text-xs uppercase tracking-widest font-bold">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="relative z-10 py-10 overflow-hidden">
        <p className="text-center text-zinc-700 text-[10px] uppercase tracking-[0.4em] font-black mb-8">Aligned with Government of India Initiatives</p>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="marquee-track flex min-w-[200%]">
            {[...["🏛️ NITI Aayog", "🌿 MoEFCC", "🐾 AWBI", "🇮🇳 myGov", "🏙️ Smart Cities", "💚 PETA India", "🏥 Animal Husbandry Dept", "⚖️ Prevention of Cruelty Act"], ...["🏛️ NITI Aayog", "🌿 MoEFCC", "🐾 AWBI", "🇮�� myGov", "🏙️ Smart Cities", "💚 PETA India", "🏥 Animal Husbandry Dept", "⚖️ Prevention of Cruelty Act"]].map((p, i) => (
              <div key={i} className="flex items-center gap-2 mx-6 shrink-0 px-5 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-400 font-bold text-sm whitespace-nowrap">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-500/10">
              <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop" alt="Rescued Dog" className="w-full h-[460px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-black/70 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {["photo-1633332755192-727a05c4013d", "photo-1535713875002-d1d0cf377fde", "photo-1438761681033-6461ffad8d80"].map((id, i) => (
                    <img key={i} src={`https://images.unsplash.com/${id}?q=80&w=200`} className="w-8 h-8 rounded-full border-2 border-black object-cover" />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-orange-500 flex items-center justify-center text-xs font-black text-black">50+</div>
                </div>
                <p className="text-white text-sm font-bold">Join 50+ Daily Saviors 🐾</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">What We Do</p>
            <h2 className="text-5xl font-black leading-tight mb-2">Every life deserves<br /><span className="text-orange-500">a second chance.</span></h2>
            <div className="w-14 h-1 bg-orange-500 rounded-full mb-8" />
            <p className="text-zinc-400 leading-relaxed mb-4">PawAlert transforms the way India handles animal emergencies. Our AI diagnostics and real-time GOI-aligned coordination ensure every report reaches verified NGOs and municipal bodies within minutes.</p>
            <p className="text-zinc-400 leading-relaxed mb-8">From spotting a stray to tracking its rehabilitation — we close the loop between citizens, government, and NGOs.</p>
            {[["Government Response", 70, "bg-orange-500"], ["NGO Managed Cases", 20, "bg-zinc-400"], ["Citizen Reported", 10, "bg-zinc-600"]].map(([l, p, c]) => (
              <div key={l} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400 text-sm font-bold">{l}</span>
                  <span className="text-zinc-300 text-sm font-black">{p}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full ${c} rounded-full`} style={{ width: `${p}%` }} />
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-8">
              <button onClick={() => navigate("/register")} className="px-6 py-3 bg-orange-500 text-black font-black rounded-2xl hover:scale-105 transition-all">Join the Mission 🐾</button>
              <button onClick={() => navigate("/dashboard")} className="px-6 py-3 bg-transparent text-white font-bold rounded-2xl border border-zinc-700 hover:border-orange-500/40 transition-all">View Live Reports →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMAL GALLERY */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] text-center mb-3">Real Rescues</p>
          <h2 className="text-4xl font-black text-center mb-3">Animals We've <span className="text-orange-500">Saved</span></h2>
          <p className="text-zinc-600 text-center mb-12 max-w-lg mx-auto text-sm">Every photo is a life changed forever.</p>
          <div className="flex items-center gap-2 h-[380px] w-full">
            {[
              { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800", label: "Street Dog", tag: "Rescued" },
              { src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800", label: "Stray Cat", tag: "Sheltered" },
              { src: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=800", label: "Rescued Pup", tag: "Adopted" },
              { src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=800", label: "Happy Pair", tag: "Rehomed" },
              { src: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800", label: "New Home", tag: "Adopted" },
            ].map((item) => (
              <div key={item.label} className="relative group flex-grow transition-all w-12 rounded-2xl overflow-hidden h-[380px] duration-500 hover:w-full cursor-pointer">
                <img className="h-full w-full object-cover" src={item.src} alt={item.label} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-orange-500 text-xs font-black uppercase tracking-widest">{item.tag}</span>
                  <p className="text-white font-black text-xl">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERT NETWORK */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] text-center mb-3">Verified Network</p>
          <h2 className="text-4xl font-black text-center mb-3">Expert Veterinary <span className="text-orange-500">Support</span></h2>
          <p className="text-zinc-600 text-center mb-12 max-w-md mx-auto text-sm">AI-assisted advice backed by certified professionals on standby</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCTORS.map((doc) => (
              <div key={doc.name} className="doc-card bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden cursor-pointer">
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl" style={{ background: doc.color }} />
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-black mb-4 border-2" style={{ background: doc.color + "18", borderColor: doc.color + "40", color: doc.color }}>{doc.avatar}</div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-sm mb-0.5">{doc.name}</h3>
                    <p className="text-zinc-500 text-xs mb-0.5">{doc.title}</p>
                    <p className="text-zinc-700 text-xs">{doc.org}</p>
                  </div>
                  <span className="text-xl">{doc.country}</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black border" style={{ background: doc.color + "12", borderColor: doc.color + "30", color: doc.color }}>
                  ✦ {doc.spec}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-20 px-6">
        <p className="text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] text-center mb-3">Community Stories</p>
        <h2 className="text-4xl font-black text-center mb-4">Saviors speak <span className="text-orange-500">up.</span></h2>
        <p className="text-zinc-600 text-center max-w-md mx-auto text-sm mb-12">Real stories from citizens, vets, NGO workers, and government officers across India.</p>
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[580px] overflow-hidden">
            {tcols.map((col, ci) => (
              <div key={ci} className={col.cls}>
                {[...col.items, ...col.items].map((t, i) => (
                  <div key={`${ci}-${i}`} className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 mb-4 hover:border-orange-500/20 transition-all">
                    <svg className="mb-3" width="18" height="13" viewBox="0 0 21 15" fill="none">
                      <g stroke="#f97316" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 13.056c.464 0 .91-.131 1.237-.364.329-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88C7.91 6.97 7.464 6.838 7 6.838c-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.513-.879.328-.233.773-.364 1.237-.364.232 0 .455-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.619-.181c-1.392 0-2.728.393-3.712 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.513.88.328.233.773.364 1.237.364zm9.83 0c.465 0 .91-.131 1.238-.364.328-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88-.328-.233-.773-.364-1.237-.364-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.512-.879.329-.233.774-.364 1.238-.364.232 0 .454-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.62-.181c-1.391 0-2.727.393-3.711 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.512.88.329.233.774.364 1.238.364z"/>
                      </g>
                    </svg>
                    <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{t.desc}</p>
                    <div className="flex items-center gap-3">
                      <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full border border-zinc-700 object-cover" />
                      <div>
                        <p className="text-xs text-white font-black">{t.name}</p>
                        <p className="text-[10px] text-zinc-600">{t.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] text-center mb-3">Got Questions?</p>
          <h2 className="text-4xl font-black text-center mb-12">Frequently <span className="text-orange-500">Asked</span> 🐾</h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="bg-zinc-900/60 border rounded-2xl px-6 py-5 cursor-pointer transition-all duration-200 hover:bg-zinc-900"
                style={{ borderColor: openFaq === i ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.06)" }}>
                <div className="flex justify-between items-center gap-4">
                  <span className="font-bold text-sm" style={{ color: openFaq === i ? "#f97316" : "white" }}>{faq.q}</span>
                  <span className="text-orange-500 text-xl shrink-0 transition-transform duration-300 inline-block" style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </div>
                <div style={{ display: "grid", gridTemplateRows: openFaq === i ? "1fr" : "0fr", transition: "grid-template-rows 0.3s ease" }}>
                  <div className="overflow-hidden">
                    <p className="text-zinc-500 text-sm leading-relaxed mt-4 pr-8">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 text-center border-t border-zinc-900/60">
        <div className="text-2xl font-black mb-2">🐾 PawAlert</div>
        <p className="text-zinc-700 text-xs uppercase tracking-[0.3em] font-black mb-1">Community Animal Rescue Network 🇮🇳</p>
        <p className="text-zinc-800 text-xs">Built with ❤️ by Adarsh Thakur · support@pawalert.in</p>
      </footer>
    </div>
  );
}
