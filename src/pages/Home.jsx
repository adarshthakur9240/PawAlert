import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Smartphone, Zap, Activity, Heart, Shield } from "lucide-react";

const Home = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      
      <header style={{ paddingTop: "150px", paddingBottom: "100px", textAlign: "center" }}>
        <h1 style={{ fontSize: "5rem", fontWeight: 900, letterSpacing: "-4px", lineHeight: 0.9, marginBottom: "30px" }}>
          Spot a stray? <br /> <span style={{ color: "#f59e0b" }}>Be their voice.</span>
        </h1>
        <p style={{ fontSize: "1.3rem", opacity: 0.6, maxWidth: "700px", margin: "0 auto 40px" }}>
          PawAlert transforms your smartphone into a lifesaving tool. Connect injured strays with immediate care across India.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Link to="/register" style={{ background: "#fff", color: "#000", padding: "18px 40px", borderRadius: "100px", fontWeight: 900, textDecoration: "none" }}>START RESCUE 🚀</Link>
          <Link to="/dashboard" style={{ background: "rgba(255,255,255,0.05)", color: "#fff", padding: "18px 40px", borderRadius: "100px", fontWeight: 900, textDecoration: "none", border: "1px solid #333" }}>Live Map •</Link>
        </div>
      </header>

      <div style={{ display: "flex", justifyContent: "center", gap: "100px", padding: "60px 0", borderTop: "1px solid #111", borderBottom: "1px solid #111", background: "#0a0a0a" }}>
        <div><h2 style={{ fontSize: "3rem", margin: 0 }}>1,247+</h2><p style={{ opacity: 0.4 }}>Animals Reported</p></div>
        <div><h2 style={{ fontSize: "3rem", margin: 0 }}>389+</h2><p style={{ opacity: 0.4 }}>Rescued & Vaccinated</p></div>
        <div><h2 style={{ fontSize: "3rem", margin: 0 }}>52</h2><p style={{ opacity: 0.4 }}>Cities Active</p></div>
      </div>

      <section style={{ padding: "100px 20px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(145deg, #111, #080808)", borderRadius: "40px", padding: "60px", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ maxWidth: "500px" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "20px" }}>Download <span style={{ color: "#f59e0b" }}>PawAlert</span> App</h2>
            <p style={{ fontSize: "1.2rem", opacity: 0.6, marginBottom: "40px" }}>Ab har rescue hoga aur bhi fast. Get real-time GPS tracking and instant notifications for injured animals.</p>
            <div style={{ display: "flex", gap: "20px" }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" style={{ height: "50px" }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" style={{ height: "50px" }} />
            </div>
          </div>
          <Smartphone size={250} color="#1a1a1a" />
        </div>
      </section>

      <footer style={{ padding: "60px 20px", textAlign: "center", borderTop: "1px solid #111" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", opacity: 0.3, marginBottom: "40px" }}>
          <span>#myGov</span><span>#SmartCities</span><span>#DigitalIndia</span>
        </div>
        <p style={{ opacity: 0.4 }}>© 2026 PawAlert Network. Built with ❤️ for Animals.</p>
      </footer>
    </div>
  );
};
export default Home;
