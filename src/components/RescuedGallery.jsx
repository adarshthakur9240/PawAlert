import React from "react";

const RescuedGallery = () => {
  const pets = [
    {
      title: "Bruno's Recovery",
      desc: "Found with a broken leg in Noida Sector 62. Now healthy and adopted.",
      img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Luna's New Home",
      desc: "Rescued from a construction site. Our AI scan helped identify her infection early.",
      img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Sheru the Brave",
      desc: "Survived a hit-and-run. Connected to a vet within 15 minutes through PawAlert.",
      img: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="bg-[#020617] py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight ">
          Our <span className="text-orange-500 font-outfit">Rescued Heroes</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Every image tells a story of survival and hope. Hover over them to see
          the full transformation.
        </p>
      </div>

      {/* 🚀 THE FIXED ACCORDION CONTAINER */}
      <div className="flex flex-row items-center gap-3 h-[500px] w-full max-w-6xl mx-auto overflow-hidden">
        {pets.map((pet, index) => (
          <div
            key={index}
            className={`relative group h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden rounded-3xl border border-white/10 
                        flex-[1] hover:flex-[5]`}
          >
            {/* Image logic to prevent stretching */}
            <img
              className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              src={pet.img}
              alt={pet.title}
            />

            {/* Text Overlay - Only visible when expanded */}
            <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <h3 className="text-3xl font-black text-white mb-2  tracking-tighter decoration-orange-500 underline decoration-2 underline-offset-8">
                {pet.title}
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed max-w-sm mt-4 font-medium backdrop-blur-md bg-black/30 p-4 rounded-2xl border border-white/5">
                {pet.desc}
              </p>
              <div className="mt-6 flex items-center gap-3 text-orange-500 font-black text-[10px] uppercase tracking-[0.3em]">
                <span>Mission Successful</span>
                <div className="h-[1px] w-12 bg-orange-500"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RescuedGallery;
