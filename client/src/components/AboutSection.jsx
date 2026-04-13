import React from "react";
export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-[#050505] text-white">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1">
                    <h2 className="text-5xl font-black mb-6">Every life <span className="text-orange-500">matters.</span></h2>
                    <p className="text-zinc-500 text-lg">PawAlert connects saviors with strays in real-time.</p>
                </div>
                <div className="flex-1 rounded-[2.5rem] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" alt="Rescue" />
                </div>
            </div>
        </section>
    );
}
