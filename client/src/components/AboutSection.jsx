import React from "react";

export default function AboutSection() {
    return (
        <section id="about" className="flex flex-col md:flex-row items-center justify-center gap-16 py-24 px-6 md:px-20 bg-[#050505]">
            <div className="relative shadow-2xl shadow-orange-600/20 rounded-[2.5rem] overflow-hidden shrink-0">
                <img className="max-w-md w-full h-[500px] object-cover rounded-[2.5rem] grayscale-[0.2]"
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
                    alt="Animal Rescue" />
                <div className="flex items-center gap-4 max-w-72 absolute bottom-8 left-8 bg-[#0a0a0a] border border-zinc-800 p-5 rounded-2xl shadow-2xl">
                    <div className="flex -space-x-3 shrink-0">
                        <div className="flex items-center justify-center text-[10px] font-black text-white size-10 rounded-full border-2 border-[#0a0a0a] bg-orange-500 z-[3]">
                            1K+
                        </div>
                    </div>
                    <p className="text-xs font-bold text-zinc-300 leading-tight">Join our tribe of local saviors</p>
                </div>
            </div>

            <div className="text-zinc-400 max-w-lg">
                <h1 className="text-xl uppercase font-black text-orange-500 tracking-widest mb-2">What we do?</h1>
                <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-800"></div>
                <h2 className="text-4xl md:text-5xl font-black text-white mt-8 leading-tight">
                    Every street life deserves a <span className="text-orange-500">savior.</span>
                </h2>
                <p className="mt-8 text-zinc-500 font-medium leading-relaxed">
                    PawAlert connects citizens with NGOs and government authorities in real-time to ensure fast rescue for stray animals.
                </p>
                <button className="flex items-center w-max gap-3 mt-10 hover:scale-105 transition-all bg-orange-500 py-4 px-10 rounded-2xl text-black font-black text-sm uppercase tracking-wider">
                    Our Mission
                </button>
            </div>
        </section>
    );
}
