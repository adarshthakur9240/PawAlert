import React from "react";
import { useNavigate } from "react-router-dom";

export default function AboutSection() {
  const navigate = useNavigate();
  return (
    <>
      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-[#050505] text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-4">What We Do</p>
            <h2 className="text-5xl font-black mb-6 leading-tight">Every life <span className="text-orange-500">matters.</span></h2>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 mb-6"></div>
            <p className="text-zinc-400 text-lg leading-relaxed mb-4">
              PawAlert connects citizens with local government authorities to rescue, vaccinate, and rehome stray animals across India.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Spot a stray? Report it in seconds. Our AI-powered system analyzes the animal's condition, provides first-aid advice, and automatically notifies the right authorities.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              From rescue to rehabilitation — we track every animal's journey and reward every savior with a Government of India recognition certificate.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => navigate("/register")}
                className="px-6 py-3 bg-orange-500 text-black font-bold rounded-2xl hover:scale-105 transition-all shadow-[0_8px_30px_rgba(249,115,22,0.3)]">
                Join the Mission 🐾
              </button>
              <button onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-all">
                View Live Reports
              </button>
            </div>
            <div className="flex gap-8 mt-10 flex-wrap">
              {[["500+", "Animals Rescued"], ["52", "Cities Active"], ["96%", "Govt Response Rate"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-black text-orange-500">{num}</div>
                  <div className="text-zinc-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative shadow-2xl shadow-orange-500/20 rounded-[2.5rem] overflow-hidden">
              <img
                className="w-full object-cover rounded-[2.5rem]"
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop"
                alt="Stray Dog Rescue"
              />
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm p-4 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-white font-bold text-sm">Live Rescue Reports Active</p>
                </div>
                <p className="text-zinc-400 text-xs mt-1">12 cases being handled right now</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMAL GALLERY - Hover Expand */}
      <section className="py-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-white text-center mb-4">Animals We've <span className="text-orange-500">Saved</span></h2>
          <p className="text-zinc-500 text-center mb-12 max-w-lg mx-auto">Real rescues from our community — every photo represents a life changed forever.</p>
          <div className="flex items-center gap-2 h-[380px] w-full">
            {[
              { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop", label: "Street Dog" },
              { src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop", label: "Stray Cat" },
              { src: "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?q=80&w=800&auto=format&fit=crop", label: "Injured Bird" },
              { src: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=800&auto=format&fit=crop", label: "Rescued Pup" },
              { src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=800&auto=format&fit=crop", label: "Happy Pair" },
              { src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=800&auto=format&fit=crop", label: "Safe Now" },
            ].map((item) => (
              <div key={item.label} className="relative group flex-grow transition-all w-14 rounded-2xl overflow-hidden h-[380px] duration-500 hover:w-full">
                <img className="h-full w-full object-cover object-center" src={item.src} alt={item.label} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-all">
                  <p className="text-white font-bold">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
