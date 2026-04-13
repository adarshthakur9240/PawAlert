import React from "react";
import { useNavigate } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import RescuedGallery from "../components/RescuedGallery";
import { ArrowRight, Heart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#020617] scroll-smooth min-h-screen">
      {/* 🔥 GLOBAL STYLES FOR HOME PAGE */}
      <style>{`
          html {
              scroll-behavior: smooth;
          }
          .animate-gradient {
              background: radial-gradient(circle at 50% 50%, #064e3b 0%, #020617 100%);
              background-size: 200% 200%;
              animation: pulseBG 8s ease infinite;
          }
          @keyframes pulseBG {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
          }
          ::selection {
              background: #ea580c;
              color: white;
          }
        `}</style>

      {/* 🌪️ HERO SECTION - Adjusted padding to respect Fixed Navbar */}
      <section className="animate-gradient relative flex flex-col items-center pt-44 md:pt-56 pb-32 px-6 overflow-hidden min-h-screen justify-start">
        <div className="flex flex-col items-center text-center z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-extrabold mb-8 animate-pulse">
            <Heart size={14} fill="currentColor" /> Helping 1000+ Strays Daily
          </div>

          {/* Headline - Italic & Bold Combo */}
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter max-w-5xl leading-[1.1] text-white ">
            Empower Your Rescue <br /> with{" "}
            <span className="text-orange-500 drop-shadow-[0_0_30px_rgba(234,88,12,0.3)]">
              Next-Gen Tools
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl mt-8 max-w-2xl opacity-80 text-gray-300 leading-relaxed font-medium px-4">
            Transforming animal welfare through real-time GPS tracking, AI
            diagnostics, and instant government connectivity.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-5 mt-12 w-full md:w-auto px-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-4 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-orange-600/40"
            >
              Start Reporting <ArrowRight size={22} />
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-extrabold text-lg transition hover:bg-white/10 backdrop-blur-md">
              Watch Demo
            </button>
          </div>
        </div>

        {/* 🛡️ TRUST LOGOS - Professional Greyscale */}
        <div className="mt-32 w-full max-w-5xl flex flex-col items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700 text-white z-10 px-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] mb-12 text-orange-500/80 text-center">
            Trusted by authorities across India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24">
            <div className="text-xl font-extrabold tracking-tighter opacity-80">
              🏛️ GOI
            </div>
            <div className="text-xl font-extrabold  tracking-tighter underline decoration-orange-500 decoration-2 underline-offset-4">
              NGO Network
            </div>
            <div className="text-xl font-extrabold tracking-tighter opacity-80">
              🐾 PETA Support
            </div>
            <div className="text-xl font-extrabold tracking-tighter uppercase opacity-80">
              Municipal Corp.
            </div>
          </div>
        </div>

        {/* Decorative Background Glows - Z-Index -10 ensures they stay behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-orange-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 size-[300px] bg-green-600/10 rounded-full blur-[100px] -z-10"></div>
      </section>

      {/* ⭐ TESTIMONIALS (Stories Section) */}
      <section id="stories" className="relative z-10 bg-[#020617]">
        <Testimonials />
      </section>

      {/* 🐾 RESCUED GALLERY (Showcase Section) */}
      <section id="features" className="relative z-10 bg-[#020617] pb-20">
        <RescuedGallery />
      </section>
    </div>
  );
};

export default Home;
