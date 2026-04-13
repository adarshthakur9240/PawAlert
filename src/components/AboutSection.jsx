import React from "react";

export default function AboutSection() {
    return (
        <section id="about" className="flex flex-col md:flex-row items-center justify-center gap-16 py-24 px-6 md:px-20 bg-[#050505]">
            {/* LEFT SIDE: Image with Floating Community Badge */}
            <div className="relative shadow-2xl shadow-orange-600/20 rounded-[2.5rem] overflow-hidden shrink-0">
                <img className="max-w-md w-full h-[500px] object-cover rounded-[2.5rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
                    alt="Animal Rescue" />
                
                {/* Floating Badge */}
                <div className="flex items-center gap-4 max-w-72 absolute bottom-8 left-8 bg-[#0a0a0a] border border-zinc-800 p-5 rounded-2xl shadow-2xl">
                    <div className="flex -space-x-3 shrink-0">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="savior"
                            className="size-10 rounded-full border-2 border-[#0a0a0a] z-10" />
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100" alt="savior"
                            className="size-10 rounded-full border-2 border-[#0a0a0a] z-[2]" />
                        <div className="flex items-center justify-center text-[10px] font-black text-white size-10 rounded-full border-2 border-[#0a0a0a] bg-orange-500 z-[3]">
                            1K+
                        </div>
                    </div>
                    <p className="text-xs font-bold text-zinc-300 leading-tight">Join our tribe of local saviors</p>
                </div>
            </div>

            {/* RIGHT SIDE: Content */}
            <div className="text-zinc-400 max-w-lg">
                <h1 className="text-xl uppercase font-black text-orange-500 tracking-widest mb-2 font-outfit">What we do?</h1>
                <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-800"></div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white mt-8 leading-tight font-outfit">
                    Every street life <br /> deserves a <span className="text-orange-500">savior.</span>
                </h2>

                <div className="space-y-6 mt-8">
                    <p className="text-zinc-500 font-medium leading-relaxed">
                        PawAlert is a next-gen emergency response system for stray animals. We bridge the gap between 
                        injured animals and help using real-time GPS tracking and AI-driven diagnostics.
                    </p>
                    
                    <p className="text-zinc-500 font-medium leading-relaxed">
                        Whether it's a medical emergency or a rescue mission, our platform connects 
                        citizens with local authorities and NGOs in seconds to ensure no life is left behind.
                    </p>
                </div>

                <button className="flex items-center w-max gap-3 mt-10 hover:scale-105 transition-all bg-orange-500 py-4 px-10 rounded-2xl text-black font-black text-sm uppercase tracking-wider shadow-[0_10px_40px_rgba(249,115,22,0.2)]">
                    <span>Our Mission</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
        </section>
    );
}
