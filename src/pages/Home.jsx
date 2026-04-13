import React from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="bg-[#050505] min-h-screen overflow-x-hidden">
      <Hero />
      <AboutSection />
      <Testimonials />
    </div>
  );
};

export default Home;
