import React from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Features from "../components/Features";
import StatsRow from "../components/StatsRow";

const Home = () => {
  return (
    <div className="bg-[#050505] min-h-screen overflow-x-hidden">
      {/* 1. Hero Section (Pehle se hai) */}
      <Hero />

      {/* 2. Naya About Section (Jo abhi banaya) */}
      <AboutSection />

      {/* 3. Baaki Sections */}
      <StatsRow />
      <Features />
    </div>
  );
};

export default Home;
