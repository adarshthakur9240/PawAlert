import React from "react";

const testimonials = [
  { id: 1, name: "Priya Sharma", company: "Noida Resident", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200", desc: "Spotted an injured dog near my colony. Reported on PawAlert — within 4 hours municipal team arrived. Incredible response time!" },
  { id: 2, name: "Rahul Verma", company: "NGO Worker, Delhi", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", desc: "PawAlert transformed how we handle rescues. The AI scan feature is shockingly accurate and saves hours of manual assessment." },
  { id: 3, name: "Dr. Sneha Patel", company: "Veterinarian, Mumbai", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200", desc: "The AI medication advice is medically sound. It helps citizens stabilize animals before our team arrives — genuinely lifesaving." },
  { id: 4, name: "Amit Singh", company: "Municipal Officer, UP", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", desc: "As a government officer, PawAlert gives us a real-time priority dashboard. We respond faster and more efficiently than ever before." },
  { id: 5, name: "Kavya Nair", company: "Animal Activist, Kerala", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200", desc: "15 rescues and counting! The GOI recognition certificate I downloaded means everything. PawAlert makes every citizen a hero." },
  { id: 6, name: "Dr. Rajesh Kumar", company: "AWBI Member", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200", desc: "PawAlert is the bridge India needed. It aligns citizen action with government response — exactly what animal welfare policy demands." },
  { id: 7, name: "Meera Joshi", company: "Student, Pune", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200", desc: "Used PawAlert for the first time last month. 2 minutes to report with photo and GPS pin. The simplicity is its superpower." },
  { id: 8, name: "Arjun Mehta", company: "Software Engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200", desc: "Reported an injured peacock — AI identified it instantly and gave specific first-aid steps. Rescued same day. Mind blown." },
  { id: 9, name: "Sunita Devi", company: "Teacher, Jaipur", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200", desc: "My students use PawAlert as a civic education tool. It teaches empathy, responsibility and real impact — all in one app." },
];

export default function Testimonials() {
  const cols = [
    { items: testimonials.slice(0, 3), cls: "animate-scroll-up-1" },
    { items: testimonials.slice(3, 6), cls: "hidden md:block animate-scroll-up-2" },
    { items: testimonials.slice(6, 9), cls: "hidden lg:block animate-scroll-up-3" },
  ];

  return (
    <section className="bg-[#050505] py-20 px-4">
      <style>{`
        @keyframes scroll-up { 0%{transform:translateY(0)} 100%{transform:translateY(-50%)} }
        .animate-scroll-up-1{animation:scroll-up 25s linear infinite}
        .animate-scroll-up-2{animation:scroll-up 32s linear infinite}
        .animate-scroll-up-3{animation:scroll-up 20s linear infinite}
      `}</style>
      <div className="text-center mb-12">
        <p className="text-orange-500 font-bold text-xs uppercase tracking-[0.3em] mb-3">Community Stories</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Saviors speak <span className="text-orange-500">up.</span>
        </h2>
        <p className="text-zinc-500 max-w-md mx-auto text-sm leading-relaxed">
          Real stories from citizens, vets, NGO workers, and government officers across India.
        </p>
      </div>
      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[600px] overflow-hidden">
          {cols.map((col, ci) => (
            <div key={ci} className={col.cls}>
              {[...col.items, ...col.items].map((t, i) => (
                <div key={`${ci}-${i}`} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 mb-4 hover:border-orange-500/30 transition-all duration-300">
                  <svg className="mb-4" width="21" height="15" viewBox="0 0 21 15" fill="none">
                    <g stroke="#f97316" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 13.056c.464 0 .91-.131 1.237-.364.329-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88C7.91 6.97 7.464 6.838 7 6.838c-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.513-.879.328-.233.773-.364 1.237-.364.232 0 .455-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.619-.181c-1.392 0-2.728.393-3.712 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.513.88.328.233.773.364 1.237.364zm9.83 0c.465 0 .91-.131 1.238-.364.328-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88-.328-.233-.773-.364-1.237-.364-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.512-.879.329-.233.774-.364 1.238-.364.232 0 .454-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.62-.181c-1.391 0-2.727.393-3.711 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.512.88.329.233.774.364 1.238.364z"/>
                    </g>
                  </svg>
                  <p className="text-sm text-zinc-400 mb-5 leading-relaxed">{t.desc}</p>
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt={t.name} className="w-9 h-9 rounded-full border border-zinc-700 object-cover" />
                    <div>
                      <p className="text-sm text-white font-bold">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
