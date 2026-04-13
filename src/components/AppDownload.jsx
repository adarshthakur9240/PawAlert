import React from "react";
import { BellRing } from "lucide-react";

const AppDownload = () => {
  return (
    <section className="px-6 py-10 w-full overflow-hidden">
      <style>{`
                @keyframes floatAnimal {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .moving-animal {
                    animation: floatAnimal 4s ease-in-out infinite;
                }
            `}</style>

      <div className="max-w-7xl mx-auto bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl flex items-center min-h-[340px] relative overflow-hidden">
        {/* 📝 LEFT: Content Section */}
        <div className="w-full md:w-[65%] p-8 md:p-16 z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-500 text-[10px] font-extrabold uppercase tracking-widest mb-4 border border-orange-500/20">
            <BellRing size={12} /> Stay Alert, Save Lives
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight  tracking-tighter">
            Download <span className="text-orange-600">PawAlert</span> App
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-md text-sm md:text-base font-medium leading-relaxed">
            Ab har rescue hoga aur bhi fast. Get real-time GPS tracking and
            instant notifications for injured animals in your area.
          </p>

          <div className="flex items-center gap-4 mt-10">
            <img
              className="h-11 md:h-13 cursor-pointer hover:scale-105 transition-transform"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/googlePlayBtn.svg"
              alt="GP"
            />
            <img
              className="h-11 md:h-13 cursor-pointer hover:scale-105 transition-transform"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/appleStoreBtn.svg"
              alt="AS"
            />
          </div>
        </div>

        {/* 🐈 RIGHT: Animal Image (Perfectly Aligned to Right) */}
        <div className="absolute right-0 md:right-10 bottom-0 top-0 w-full md:w-[35%] flex items-center justify-end pointer-events-none pr-4 md:pr-0">
          {/* Background Glow */}
          <div className="absolute size-64 bg-orange-500/10 blur-[90px] rounded-full right-10"></div>

          <img
            className="moving-animal relative h-[85%] md:h-[110%] w-auto object-contain object-bottom translate-y-6 md:translate-y-10"
            src="https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-cat-on-white-background-png-image_7094927.png"
            alt="Moving Animal"
          />
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
