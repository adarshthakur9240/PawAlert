import React from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Features from "../components/Features";

const Home = () => {
  return (
    <div className="bg-[#050505] min-h-screen overflow-x-hidden font-['Inter']">
      <Hero />
      <AboutSection />
      <Features />
    </div>
  );
};

export default Home;
