import React from "react";

const testimonials = [
  { id: 1, name: "Priya Sharma", company: "Noida Resident", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200", desc: "I spotted an injured dog near my colony. Reported on PawAlert and within 4 hours the municipal team arrived. Amazing response!" },
  { id: 2, name: "Rahul Verma", company: "NGO Worker, Delhi", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", desc: "PawAlert has transformed how we handle stray rescues. The AI scan feature is incredibly accurate and saves so much time." },
  { id: 3, name: "Sneha Patel", company: "Veterinarian, Mumbai", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200", desc: "The medication advice from AI is surprisingly accurate. It helps citizens provide basic first aid before our team arrives." },
  { id: 4, name: "Amit Singh", company: "Government Officer, UP", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", desc: "As a municipal officer, PawAlert gives us a real-time dashboard of all cases. We can prioritize and respond faster than ever." },
  { id: 5, name: "Kavya Nair", company: "Animal Activist, Kerala", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200", desc: "I've rescued 15 animals through PawAlert. The GOI recognition certificate I received means everything to me." },
  { id: 6, name: "Dr. Rajesh Kumar", company: "AWBI Member", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200", desc: "PawAlert is exactly the bridge India needed between citizens and animal welfare bodies. Proud to support this mission." },
  { id: 7, name: "Meera Joshi", company: "Student, Pune", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200", desc: "Used PawAlert for the first time last month. The app is so intuitive — took 2 minutes to report and pin the location." },
  { id: 8, name: "Arjun Mehta", company: "Software Engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200", desc: "Love the tech behind this! AI species detection is spot on. Reported a peacock with a broken wing — got rescued same day." },
  { id: 9, name: "Sunita Devi", company: "Teacher, Jaipur", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200", desc: "My students and I use PawAlert as a civic education tool. Teaching them responsibility towards street animals." },
];

const cols = [
  { items: testimonials.slice(0, 3), cls: "animate-scroll-up-1" },
  { items: testimonials.slice(3, 6), cls: "hidden md:block animate-scroll-up-2" },
  { items: testimonials.slice(6, 9), cls: "hidden lg:block animate-scroll-up-3" },
];

export default function Testimonials() {
  return (
    <section className="bg-[#050505] py-20 px-4">
      <style>{`
        @keyframes scroll-up { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .animate-scroll-up-1 { animation: scroll-up 25s linear infinite; }
        .animate-scroll-up-2 { animation: scroll-up 30s linear infinite; }
        .animate-scroll-up-3 { animation: scroll-up 20s linear infinite; }
      `}</style>
      <div className="text-center mb-12">
        <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Community Stories</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Saviors speak <span className="text-orange-500">up.</span></h2>
        <p className="text-zinc-500 max-w-md mx-auto">Real stories from citizens, NGOs, vets, and government officers using PawAlert to make India safer.</p>
      </div>
      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[600px] overflow-hidden">
          {cols.map((col, ci) => (
            <div key={ci} className={col.cls}>
              {[...col.items, ...col.items].map((t, i) => (
                <div key={`${ci}-${i}`} className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-4 hover:border-orange-500/30 transition-all">
                  <svg className="mb-4" width="21" height="15" viewBox="0 0 21 15" fill="none">
                    <g stroke="#f97316" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 13.056c.464 0 .91-.131 1.237-.364.329-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88C7.91 6.97 7.464 6.838 7 6.838c-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.513-.879.328-.233.773-.364 1.237-.364.232 0 .455-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.619-.181c-1.392 0-2.728.393-3.712 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.513.88.328.233.773.364 1.237.364zm9.83 0c.465 0 .91-.131 1.238-.364.328-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88-.328-.233-.773-.364-1.237-.364-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.512-.879.329-.233.774-.364 1.238-.364.232 0 .454-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.62-.181c-1.391 0-2.727.393-3.711 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.512.88.329.233.774.364 1.238.364z"/>
                    </g>
                  </svg>
                  <p className="text-sm text-zinc-400 mb-5 leading-relaxed">{t.desc}</p>
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt={t.name} className="w-9 h-9 rounded-full border border-zinc-700 object-cover" />
                    <div>
                      <p className="text-sm text-zinc-200 font-bold">{t.name}</p>
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
