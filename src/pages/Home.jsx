import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// IMPACTFUL PHRASES
const PHRASES = [
  "Spot a stray? Be their voice.",
  "Every life deserves a savior.",
  "Your one click, their second chance.",
  "India's First Real-time Rescue Network."
];

// RESCUED ANIMALS GALLERY (LATEST CREATIONS)
const RESCUED_GALLERY = [
  { name: "Sheru", status: "Rescued & Vaccinated", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800" },
  { name: "Bella", status: "Under Care - Blue Cross", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800" },
  { name: "Charlie", status: "Successfully Adopted", img: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=800" },
  { name: "Luna", status: "Medical Aid Provided", img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=800" },
  { name: "Rocky", status: "Emergency Surgery Done", img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800" },
  { name: "Simba", status: "Transferred to Shelter", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800" }
];

// FAQ DATA (ALIGNED WITH GOI & NGO)
const FAQS = [
  { q: "How do we support the Government of India?", a: "We provide real-time GPS data of injured animals directly to municipal authorities and government vet clinics, reducing response time by 80%." },
  { q: "What is the role of NGOs in PawAlert?", a: "NGOs act as primary responders for medical emergencies and long-term sheltering after the initial government first-aid." },
  { q: "How is my data protected?", a: "Your reports are encrypted. Only authorized GOI officials and verified NGO heads can access precise location data for rescue operations." },
  { q: "Can citizens earn recognition?", a: "Yes. Every verified rescue earns you a 'Citizen Savior' digital certificate recognized by our network partners." }
];

// TESTIMONIALS (REAL STORIES)
const TESTIMONIALS = [
  { name: "Adarsh Singh", company: "Student, JSSATE", desc: "Reported an injured cow at 2 AM, authorities reached within 30 mins. Mind-blowing!", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" },
  { name: "Priya Sharma", company: "NGO Head", desc: "PawAlert removed the guesswork. We now know exactly where help is needed most.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" },
  { name: "Rahul Verma", company: "Govt. Vet", desc: "This tech is revolutionary for India's stray animal management system.", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200" }
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

  return <span style={{ color: "#FF9933" }}>{disp}<span className="animate-pulse">|</span></span>;
};

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-[#050505] text-white font-['Poppins'] overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 bg-[radial-gradient(circle_at_center,rgba(255,153,51,0.08)_0%,transparent_70%)]">
        <div className="bg-orange-500/10 border border-orange-500/30 text-orange-500 px-6 py-2 rounded-full text-sm font-bold mb-8">
          🇮🇳 India's First Real-time Animal Rescue Network
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight max-w-5xl">
          <AnimatedText />
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl mb-10 font-medium leading-relaxed">
          Every report saves a life. PawAlert bridges the gap between stray animals and the help they deserve through AI and government coordination.
        </p>
        <div className="flex gap-4">
          <a href="/dashboard" className="bg-orange-500 text-black px-10 py-4 rounded-2xl font-black uppercase tracking-wider hover:scale-105 transition">Start Rescue</a>
          <a href="/dashboard" className="bg-zinc-900 border border-zinc-800 px-10 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition">Live Map</a>
        </div>
      </section>

      {/* STATS BREAKDOWN (GOVERNMENT ALIGNMENT) */}
      <section className="py-20 border-y border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
             <div className="text-5xl font-black text-orange-500 mb-2">70%</div>
             <p className="text-zinc-400 font-bold uppercase tracking-tighter">Government Responded</p>
          </div>
          <div className="text-center">
             <div className="text-5xl font-black text-white mb-2">20%</div>
             <p className="text-zinc-400 font-bold uppercase tracking-tighter">NGO Supported</p>
          </div>
          <div className="text-center">
             <div className="text-5xl font-black text-green-500 mb-2">10%</div>
             <p className="text-zinc-400 font-bold uppercase tracking-tighter">Citizen Direct Aid</p>
          </div>
        </div>
      </section>

      {/* LATEST RESCUES GALLERY (CARDS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-4">Our Latest Rescues</h2>
        <p className="text-center text-zinc-500 mb-12">Visual proof of our impact across the nation.</p>
        <div className="flex items-center gap-2 h-[450px] w-full">
           {RESCUED_GALLERY.map((res, i) => (
             <div key={i} className="relative group flex-grow transition-all w-24 rounded-3xl overflow-hidden h-full duration-700 hover:w-full border border-zinc-800">
                <img src={res.img} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt="animal" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                   <h3 className="text-2xl font-black">{res.name}</h3>
                   <p className="text-orange-500 font-bold">{res.status}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* WHAT WE DO (STARTUP STYLE) */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
           <div className="relative group flex-1">
              <div className="absolute -inset-4 bg-orange-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000" className="relative rounded-[2.5rem] shadow-2xl grayscale-[0.5] group-hover:grayscale-0 transition" alt="Impact" />
           </div>
           <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-black uppercase leading-tight">Empowering <br/><span className="text-orange-500">Local Saviors</span></h2>
              <div className="w-20 h-1.5 bg-orange-500 rounded-full"></div>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                 We provide the technical backbone for animal welfare in India. By integrating AI diagnostics with a direct line to Government Municipalities, we ensure that help is never more than a report away.
              </p>
              <button className="bg-orange-500 text-black px-10 py-4 rounded-2xl font-black uppercase">Read Full Roadmap</button>
           </div>
        </div>
      </section>

      {/* TESTIMONIALS (AUTO SCROLL) */}
      <section className="py-24 overflow-hidden">
        <h2 className="text-4xl font-black text-center mb-16 italic font-serif leading-tight">People Love Us <br/><span className="text-sm font-sans opacity-40 not-italic uppercase tracking-widest">Real Stories from Citizens</span></h2>
        <div className="flex animate-[scroll_40s_linear_infinite] w-[200%]">
           {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
             <div key={i} className="min-w-[400px] bg-zinc-900/50 border border-zinc-800 p-8 mx-4 rounded-3xl hover:border-orange-500 transition-colors">
                <p className="text-zinc-400 mb-6 font-medium italic">"{t.desc}"</p>
                <div className="flex items-center gap-4">
                   <img src={t.img} className="size-12 rounded-full border-2 border-orange-500" alt="user" />
                   <div>
                      <h4 className="font-bold text-white">{t.name}</h4>
                      <p className="text-xs text-zinc-600 font-bold">{t.company}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 cursor-pointer hover:border-zinc-700 transition">
                <div className="flex justify-between items-center font-bold text-lg">
                  {f.q} <span className="text-orange-500">{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <p className="mt-4 text-zinc-500 font-medium leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-zinc-900 text-center opacity-40 text-sm">
        <p>PawAlert 2026 · Built by Adarsh Thakur · JSSATE Noida IT Branch 🐾</p>
      </footer>

      <style>{\`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      \`}</style>
    </div>
  );
};

export default Home;
