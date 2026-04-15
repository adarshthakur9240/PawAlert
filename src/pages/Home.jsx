import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  Smartphone, Zap, Shield, Heart, MapPin, 
  ChevronRight, Star, Globe, ShieldCheck 
} from "lucide-react";

const Home = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      
      {/* �� Hero Section */}
      <header style={{ paddingTop: "150px", paddingBottom: "100px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", background: "rgba(245, 158, 11, 0.1)", padding: "8px 20px", borderRadius: "100px", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#f59e0b", fontWeight: 800, fontSize: "0.9rem" }}>
          🐾 PAWALERT INDIA
        </div>
        <h1 style={{ fontSize: "5rem", fontWeight: 900, letterSpacing: "-4px", lineHeight: 0.9, marginBottom: "30px", fontFamily: "'Playfair Display', serif" }}>
          Spot a stray? <br /> <span style={{ color: "#f59e0b" }}>Be their voice.</span>
        </h1>
        <p style={{ fontSize: "1.3rem", opacity: 0.6, maxWidth: "700px", margin: "0 auto 40px", lineHeight: 1.6 }}>
          PawAlert transforms your smartphone into a lifesaving tool. We connect injured strays with immediate care across India.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Link to="/register" style={{ background: "#fff", color: "#000", padding: "18px 40px", borderRadius: "100px", fontWeight: 900, textDecoration: "none", fontSize: "1.1rem" }}>START RESCUE 🚀</Link>
          <Link to="/dashboard" style={{ background: "rgba(255,255,255,0.05)", color: "#fff", padding: "18px 40px", borderRadius: "100px", fontWeight: 900, textDecoration: "none", border: "1px solid #333", fontSize: "1.1rem" }}>Live Map •</Link>
        </div>
      </header>

      {/* 📊 Stats Section */}
      <div style={{ display: "flex", justifyContent: "center", gap: "100px", padding: "60px 0", borderTop: "1px solid #111", borderBottom: "1px solid #111", background: "#0a0a0a" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "3rem", margin: 0 }}>1,247+</h2>
          <p style={{ opacity: 0.4, textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 800 }}>Animals Reported</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "3rem", margin: 0 }}>389+</h2>
          <p style={{ opacity: 0.4, textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 800 }}>Rescued & Vaccinated</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "3rem", margin: 0 }}>52</h2>
          <p style={{ opacity: 0.4, textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 800 }}>Cities Active</p>
        </div>
      </div>

      {/* 📱 Promotion Section (Apple/Google Icons) */}
      <section style={{ padding: "100px 20px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(145deg, #111, #080808)", borderRadius: "40px", padding: "60px", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ maxWidth: "500px" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "20px" }}>Download <span style={{ color: "#f59e0b" }}>PawAlert</span> App</h2>
            <p style={{ fontSize: "1.2rem", opacity: 0.6, marginBottom: "40px" }}>Ab har rescue hoga aur bhi fast. Get real-time GPS tracking and instant notifications for injured animals in your area.</p>
            <div style={{ display: "flex", gap: "20px" }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" style={{ height: "50px", cursor: "pointer" }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" style={{ height: "50px", cursor: "pointer" }} />
            </div>
          </div>
          <div style={{ position: "relative" }}>
             <Smartphone size={300} color="#1a1a1a" strokeWidth={1} />
             <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
               <img src="/logo.png" style={{ height: "80px", filter: "grayscale(1) opacity(0.2)" }} />
             </div>
          </div>
        </div>
      </section>

      {/* 🇮🇳 GOI Footer Banner */}
      <footer style={{ padding: "60px 20px", textAlign: "center", background: "#050505", borderTop: "1px solid #111" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", opacity: 0.3, marginBottom: "40px" }}>
          <span>#myGov</span>
          <span>#SmartCities</span>
          <span>#DigitalIndia</span>
        </div>
        <p style={{ opacity: 0.4, fontSize: "0.9rem" }}>© 2026 PawAlert Network. All Rights Reserved. Built with ❤️ for Animals.</p>
      </footer>
    </div>
  );
};

export default Home;
