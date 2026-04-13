import React from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";

const Home = () => {
  return (
    <div className="bg-[#050505] min-h-screen overflow-x-hidden font-sans">
      <Hero />
      <AboutSection />
    </div>
  );
};

export default Home;
