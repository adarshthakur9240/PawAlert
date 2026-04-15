import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Smartphone, Zap, Activity, Heart, Shield } from "lucide-react";

const Home = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      
      {/* 🚀 Hero Section - Image 1 Style Fixed */}
      <header style={{ paddingTop: "160px", paddingBottom: "100px", textAlign: "center", background: "radial-gradient(circle at center, #111 0%, #080808 100%)" }}>
        <div style={{ background: "rgba(245, 158, 11, 0.1)", display: "inline-block", padding: "8px 20px", borderRadius: "100px", border: "1px solid #f59e0b30", color: "#f59e0b", fontWeight: 800, fontSize: "0.85rem", marginBottom: "25px", letterSpacing: "1px" }}>
           🐾 COMMUNITY ANIMAL RESCUE NETWORK
        </div>
        <h1 style={{ fontSize: "5.5rem", fontWeight: 900, letterSpacing: "-4px", lineHeight: 0.9, marginBottom: "35px", fontFamily: "'Playfair Display', serif" }}>
          Spot a stray? <br /> <span style={{ color: "#f59e0b" }}>Be their voice.</span>
        </h1>
        <p style={{ fontSize: "1.35rem", opacity: 0.6, maxWidth: "750px", margin: "0 auto 45px", lineHeight: 1.6 }}>
          PawAlert transforms your smartphone into a lifesaving tool. We connect injured strays with immediate care across India.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "25px" }}>
          <Link to="/register" style={{ background: "#fff", color: "#000", padding: "20px 45px", borderRadius: "100px", fontWeight: 900, textDecoration: "none", fontSize: "1.1rem", boxShadow: "0 10px 30px rgba(255,255,255,0.1)" }}>START RESCUE 🚀</Link>
          <Link to="/dashboard" style={{ background: "rgba(255,255,255,0.03)", color: "#fff", padding: "20px 45px", borderRadius: "100px", fontWeight: 900, textDecoration: "none", border: "1px solid #333", fontSize: "1.1rem", backdropFilter: "blur(10px)" }}>Live Map •</Link>
        </div>
      </header>

      {/* 📊 Real Stats */}
      <div style={{ display: "flex", justifyContent: "center", gap: "120px", padding: "80px 0", borderTop: "1px solid #111", borderBottom: "1px solid #111", background: "#0a0a0a" }}>
        <div style={{ textAlign: "center" }}><h2 style={{ fontSize: "3.5rem", fontWeight: 900, margin: 0 }}>1,247+</h2><p style={{ opacity: 0.4, fontWeight: 700, textTransform: "uppercase", marginTop: "5px" }}>Animals Reported</p></div>
        <div style={{ textAlign: "center" }}><h2 style={{ fontSize: "3.5rem", fontWeight: 900, margin: 0 }}>389+</h2><p style={{ opacity: 0.4, fontWeight: 700, textTransform: "uppercase", marginTop: "5px" }}>Rescued & Vaccinated</p></div>
        <div style={{ textAlign: "center" }}><h2 style={{ fontSize: "3.5rem", fontWeight: 900, margin: 0 }}>52</h2><p style={{ opacity: 0.4, fontWeight: 700, textTransform: "uppercase", marginTop: "5px" }}>Cities Active</p></div>
      </div>

      {/* 📱 App Promotion (Original Restored) */}
      <section style={{ padding: "120px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(145deg, #111, #080808)", borderRadius: "45px", padding: "70px", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}>
          <div style={{ maxWidth: "550px" }}>
            <h2 style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "25px" }}>Download <span style={{ color: "#f59e0b" }}>PawAlert</span> App</h2>
            <p style={{ fontSize: "1.3rem", opacity: 0.6, marginBottom: "45px", lineHeight: 1.6 }}>Ab har rescue hoga aur bhi fast. Get real-time GPS tracking and instant notifications for injured animals in your area.</p>
            <div style={{ display: "flex", gap: "25px" }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" style={{ height: "60px", cursor: "pointer" }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" style={{ height: "60px", cursor: "pointer" }} />
            </div>
          </div>
          <div style={{ background: "#1a1a1a", padding: "40px", borderRadius: "40px", border: "1px solid #333" }}>
            <Smartphone size={280} color="#333" strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* 🇮�� Footer */}
      <footer style={{ padding: "80px 20px", textAlign: "center", background: "#050505", borderTop: "1px solid #111" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "50px", opacity: 0.2, marginBottom: "50px", fontWeight: 900, letterSpacing: "2px" }}>
          <span>#MYGOV</span><span>#SMARTCITIES</span><span>#DIGITALINDIA</span>
        </div>
        <p style={{ opacity: 0.3, fontSize: "1rem" }}>© 2026 PawAlert Network. Built with ❤️ for Every Life in India.</p>
      </footer>
    </div>
  );
};

export default Home;
