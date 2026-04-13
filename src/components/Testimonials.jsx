import React from "react";

const Testimonials = () => {
  const stories = [
    {
      id: 1,
      description:
        "PawAlert is a lifesaver! I reported an injured dog at 2 AM, and the local NGO reached the spot within 30 minutes. The AI scan for first aid was incredibly accurate.",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Rahul Sharma",
      role: "Verified Volunteer",
    },
    {
      id: 2,
      description:
        "As a government official, this platform helps us track stray vaccinations efficiently. The real-time mapping is a game-changer for urban safety.",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Dr. Amit Varma",
      role: "Municipal Officer",
    },
    {
      id: 3,
      description:
        "The appreciation badges actually motivate our team to rescue more animals. We've managed to shelter over 50 cats this month using PawAlert.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
      name: "Priya Das",
      role: "NGO Head",
    },
    {
      id: 4,
      description:
        "I never knew how to help stray animals before this app. Now, reporting an emergency is as easy as taking a photo. Truly empowering!",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200",
      name: "Jason Kim",
      role: "Local Resident",
    },
    {
      id: 5,
      description:
        "The transparency PawAlert provides is unmatched. You can actually see the status of the animal you reported—from pending to rescued.",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200",
      name: "Alex Johnson",
      role: "Animal Lover",
    },
    {
      id: 6,
      description:
        "Integrating AI into animal rescue is genius. The first-aid advice prevented a puppy's condition from worsening until the vet arrived.",
      image:
        "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
      name: "Emily Karter",
      role: "Vet Student",
    },
  ];

  const columns = [
    { items: stories.slice(0, 2), speed: "20s" },
    { items: stories.slice(2, 4), speed: "25s", hidden: "hidden md:block" },
    { items: stories.slice(4, 6), speed: "18s", hidden: "hidden lg:block" },
  ];

  return (
    <section className="bg-[#020617] pt-24 pb-20 px-6 relative overflow-hidden border-t border-white/5">
      {/* 🚀 ANIMATION CSS */}
      <style>{`
                @keyframes scroll-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                .animate-scroll { 
                    animation: scroll-up var(--speed) linear infinite; 
                }
                .animate-scroll:hover { 
                    animation-play-state: paused; 
                }
                
                .rescue-card {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
            `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
          People <span className="text-orange-500">Love Us</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
          Real stories from rescuers and officials using PawAlert to save lives.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="relative h-[600px] overflow-hidden max-w-6xl mx-auto">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020617] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] to-transparent z-20 pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {columns.map((col, i) => (
            <div
              key={i}
              className={`${col.hidden} flex flex-col gap-6 animate-scroll`}
              style={{ "--speed": col.speed }}
            >
              {/* Seamless loop logic */}
              {[...col.items, ...col.items, ...col.items].map((story, idx) => (
                <div
                  key={idx}
                  className="rescue-card p-8 rounded-3xl transition-all duration-300"
                >
                  <p className="text-gray-400 text-[15px] leading-relaxed mb-8 italic">
                    "{story.description}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={story.image}
                      className="size-11 rounded-2xl border border-white/10"
                      alt={story.name}
                    />
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide">
                        {story.name}
                      </h4>
                      <p className="text-xs text-orange-500/70 font-medium">
                        {story.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* 🛑 TRUST SECTION YA FOOTER YAHAN SE HATA DIYA HAI */}
    </section>
  );
};

export default Testimonials;
