import React from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { num: "96%", label: "Govt Response Rate", color: "text-orange-500" },
  { num: "4.2h", label: "Avg Response Time", color: "text-white" },
  { num: "12K+", label: "Active Saviors", color: "text-orange-500" },
  { num: "389+", label: "Animals Rescued", color: "text-white" },
];

const partners = [
  { name: "NITI Aayog", logo: "🏛️" },
  { name: "MoEFCC", logo: "🌿" },
  { name: "AWBI", logo: "🐾" },
  { name: "myGov", logo: "🇮🇳" },
  { name: "Smart Cities", logo: "🏙️" },
  { name: "PETA India", logo: "💚" },
];

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <>
      {/* STATS STRIP */}
      <section className="py-16 bg-[#050505] border-y border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className={`text-5xl font-black ${s.color} mb-2`}>{s.num}</div>
                <div className="text-zinc-500 text-sm uppercase tracking-widest font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOVT PARTNERS MARQUEE */}
      <section className="py-10 bg-[#050505] overflow-hidden">
        <p className="text-center text-zinc-600 text-xs uppercase tracking-[0.3em] font-bold mb-8">Aligned with Government of India Initiatives</p>
        <style>{`
          .marquee-track { animation: marquee 20s linear infinite; }
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}</style>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="marquee-track flex min-w-[200%]">
            {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
              <div key={i} className="flex items-center gap-3 mx-10 shrink-0 px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900/50 hover:border-orange-500/30 transition-all cursor-pointer">
                <span className="text-xl">{p.logo}</span>
                <span className="text-zinc-300 font-bold text-sm whitespace-nowrap">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-500/10">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop"
                alt="Rescued Dog"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md p-4 rounded-2xl border border-zinc-800">
                  <div className="flex -space-x-3">
                    {["photo-1633332755192-727a05c4013d", "photo-1535713875002-d1d0cf377fde", "photo-1438761681033-6461ffad8d80"].map((id, i) => (
                      <img key={i} src={`https://images.unsplash.com/${id}?q=80&w=200`} className="w-9 h-9 rounded-full border-2 border-black object-cover" />
                    ))}
                    <div className="w-9 h-9 rounded-full border-2 border-black bg-orange-500 flex items-center justify-center text-xs font-black text-black">50+</div>
                  </div>
                  <p className="text-white text-sm font-bold">Join 50+ Daily Saviors 🐾</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-orange-500 font-bold text-xs uppercase tracking-[0.3em] mb-4">What We Do</p>
            <h2 className="text-5xl font-black text-white leading-tight mb-2">
              Every life deserves<br />
              <span className="text-orange-500">a second chance.</span>
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded-full mb-8"></div>
            <p className="text-zinc-400 leading-relaxed mb-4">
              PawAlert transforms the way India handles animal emergencies. Our AI diagnostics and real-time GOI-aligned coordination ensure every report reaches verified NGOs and municipal bodies within minutes.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              From spotting a stray to tracking its rehabilitation — we close the loop between citizens, government, and NGOs, making India's streets safer for every living being.
            </p>

            {/* Impact bars */}
            {[
              { label: "Government Response", pct: 70, color: "bg-orange-500" },
              { label: "NGO Managed Cases", pct: 20, color: "bg-zinc-400" },
              { label: "Citizen Reported", pct: 10, color: "bg-zinc-600" },
            ].map((b) => (
              <div key={b.label} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400 text-sm font-bold">{b.label}</span>
                  <span className="text-zinc-300 text-sm font-black">{b.pct}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}

            <div className="flex gap-4 mt-8">
              <button onClick={() => navigate("/register")}
                className="px-6 py-3 bg-orange-500 text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_8px_30px_rgba(249,115,22,0.3)] flex items-center gap-2">
                Join the Mission 🐾
              </button>
              <button onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-transparent text-white font-bold rounded-2xl border border-zinc-700 hover:border-orange-500/50 transition-all">
                View Live Reports →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMAL GALLERY */}
      <section className="py-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-orange-500 font-bold text-xs uppercase tracking-[0.3em] text-center mb-3">Real Rescues</p>
          <h2 className="text-4xl font-black text-white text-center mb-3">Animals We've <span className="text-orange-500">Saved</span></h2>
          <p className="text-zinc-500 text-center mb-12 max-w-lg mx-auto">Every photo is a life changed forever. These are real rescues from our community.</p>
          <div className="flex items-center gap-2 h-[400px] w-full">
            {[
              { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800", label: "Street Dog", tag: "Rescued" },
              { src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800", label: "Stray Cat", tag: "Sheltered" },
              { src: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=800", label: "Rescued Pup", tag: "Adopted" },
              { src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=800", label: "Happy Pair", tag: "Rehomed" },
              { src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=800", label: "Safe Now", tag: "Vaccinated" },
              { src: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800", label: "New Home", tag: "Adopted" },
            ].map((item) => (
              <div key={item.label} className="relative group flex-grow transition-all w-14 rounded-2xl overflow-hidden h-[400px] duration-500 hover:w-full cursor-pointer">
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

      {/* FAQ */}
      <section className="py-20 bg-[#050505] px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-orange-500 font-bold text-xs uppercase tracking-[0.3em] text-center mb-3">Got Questions?</p>
          <h2 className="text-5xl font-black text-white text-center mb-4">FAQ<span className="text-orange-500">'s</span></h2>
          <p className="text-zinc-500 text-center max-w-lg mx-auto mb-12">Everything you need to know about PawAlert and how we work with Government, NGOs, and Citizens.</p>

          {(() => {
            const faqs = [
              { q: "How does PawAlert work?", a: "Citizens spot a stray, report it via app with photo & GPS. Our AI analyzes the animal's condition and automatically notifies the nearest municipal body and NGO partner." },
              { q: "Is PawAlert officially recognized by Government?", a: "Yes, PawAlert is aligned with AWBI (Animal Welfare Board of India) guidelines and works in coordination with municipal corporations across 52+ cities." },
              { q: "What happens after I report an animal?", a: "You get real-time status updates — from report submission to rescue, sheltering, vaccination, and final rehoming. The full lifecycle is tracked." },
              { q: "How accurate is the AI species detection?", a: "Our Gemini AI model achieves 94%+ accuracy in species identification and provides specific first-aid advice tailored to each animal's condition." },
              { q: "What is the GOI Recognition Certificate?", a: "After rescuing 1+ animals, you can download an official-style Certificate of Appreciation from PawAlert — a testament to your contribution to India's animal welfare." },
              { q: "Can NGOs and Government bodies use PawAlert?", a: "Yes! NGOs get a dedicated portal to manage shelter cases, track adoptions, and coordinate with government teams. Government officials get a priority dashboard." },
              { q: "Is my personal data safe?", a: "Absolutely. We use JWT authentication, encrypted connections, and never share your data with third parties. Your privacy is our commitment." },
              { q: "How can I upgrade my rescuer level?", a: "Your level upgrades automatically — Bronze (1+), Silver (5+), Gold (15+), Diamond (25+), Platinum (50+) — based on animals you help rescue." },
            ];
            const mid = Math.ceil(faqs.length / 2);
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[faqs.slice(0, mid), faqs.slice(mid)].map((col, ci) => (
                  <div key={ci} className="space-y-3">
                    {col.map((faq) => (
                      <details key={faq.q} className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-orange-500/30 transition-all duration-300">
                        <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 list-none [&::-webkit-details-marker]:hidden">
                          <span className="text-sm font-bold text-white">{faq.q}</span>
                          <div className="shrink-0 text-orange-500 transition-transform group-open:rotate-45">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                          </div>
                        </summary>
                        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-open:grid-rows-[1fr] group-open:opacity-100">
                          <div className="overflow-hidden">
                            <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>
    </>
  );
}
