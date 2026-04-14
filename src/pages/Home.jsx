import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Impactful Phrases for Startup Vibe
const PHRASES = [
  "Spot a stray? Be their voice.",
  "Every life deserves a savior.",
  "Your one click, their second chance.",
  "Changing the world, one rescue at a time."
];

const DOCTORS = [
  { name: "Dr. Priya Sharma", title: "Senior Veterinary Surgeon", org: "AIIMS Animal Care Unit, Delhi", country: "🇮🇳", spec: "Emergency Trauma & Surgery", avatar: "PS", color: "#FF9933" },
  { name: "Dr. Arjun Mehta", title: "Wildlife & Stray Specialist", org: "SPCA India, Mumbai", country: "🇮🇳", spec: "Rabies Control & Vaccination", avatar: "AM", color: "#138808" },
  { name: "Dr. Sarah Chen", title: "Animal Rescue Physician", org: "WHO Animal Health Division", country: "🇺🇸", spec: "Zoonotic Disease Prevention", avatar: "SC", color: "#3b82f6" },
  { name: "Dr. Ravi Nair", title: "Chief Veterinary Officer", org: "Blue Cross of India, Chennai", country: "🇮🇳", spec: "Rehabilitation & Adoption", avatar: "RN", color: "#8b5cf6" },
];

const AnimatedText = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = PHRASES[phraseIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx((c) => c + 1); }, 50);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx((c) => c - 1); }, 30);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx]);

  const colors = ["#FF9933", "#ffffff", "#22c55e", "#3b82f6"];
  return (
    <span style={{ color: colors[phraseIdx], transition: "color 0.3s" }}>
      {displayed}
      <span style={{ display: "inline-block", width: "4px", height: "0.9em", background: colors[phraseIdx], marginLeft: "8px", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
    </span>
  );
};

const Home = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", fontFamily: "'Outfit', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .stat-num { background: linear-gradient(90deg,#FF9933,#ffffff,#138808,#FF9933); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation: shimmer 3s linear infinite; }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .clickable-card:hover { transform: translateY(-10px); border-color: #FF9933 !important; cursor: pointer; }
      `}</style>

      <Navbar />

      {/* HERO SECTION */}
      <section style={{ minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px", background: "radial-gradient(circle at center, rgba(255,153,51,0.05) 0%, transparent 70%)" }}>
        <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "50px", padding: "10px 24px", fontSize: "0.9rem", color: "#f59e0b", marginBottom: "2rem" }}>
          🇮🇳 India's First Real-time Animal Rescue Network
        </div>

        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, maxWidth: "1000px", lineHeight: 1.2 }}>
          <AnimatedText />
        </h1>

        <p style={{ fontSize: "1.2rem", opacity: 0.6, maxWidth: "600px", margin: "2rem 0" }}>
          Every report saves a life. PawAlert bridges the gap between stray animals and the help they deserve.
        </p>

        <div style={{ display: "flex", gap: "20px" }}>
          <a href="/dashboard" style={{ background: "#FF9933", color: "#000", padding: "18px 40px", borderRadius: "15px", fontWeight: 900, textDecoration: "none" }}>🚀 Start Rescue</a>
          <a href="/dashboard" style={{ background: "#111", border: "1px solid #333", color: "#fff", padding: "18px 40px", borderRadius: "15px", fontWeight: 700, textDecoration: "none" }}>View Map</a>
        </div>

        <div style={{ display: "flex", gap: "4rem", marginTop: "5rem" }}>
           <div><div className="stat-num" style={{fontSize: "2.5rem", fontWeight: 900}}>1,247+</div><div style={{opacity: 0.4, fontSize: "0.8rem"}}>REPORTS</div></div>
           <div><div className="stat-num" style={{fontSize: "2.5rem", fontWeight: 900}}>389+</div><div style={{opacity: 0.4, fontSize: "0.8rem"}}>SAVED</div></div>
           <div><div className="stat-num" style={{fontSize: "2.5rem", fontWeight: 900}}>52</div><div style={{opacity: 0.4, fontSize: "0.8rem"}}>CITIES</div></div>
        </div>
      </section>

      {/* WHAT WE DO (REINSTATED) */}
      <section style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
         <h2 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "4rem", textAlign: "center" }}>What we do?</h2>
         <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center" }}>
            <div style={{ flex: "1 1 400px" }}>
               <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000" style={{ width: "100%", borderRadius: "30px" }} alt="Rescue" />
            </div>
            <div style={{ flex: "1 1 400px" }}>
               <h3 style={{ fontSize: "2rem", color: "#FF9933", marginBottom: "20px" }}>Empowering Local Saviors</h3>
               <p style={{ opacity: 0.7, lineHeight: 1.8 }}>We provide the tech for animal welfare. From GPS tracking to NGO alerts, we make sure help is just one click away.</p>
            </div>
         </div>
      </section>

      {/* EXPERT SUPPORT (CLICKABLE) */}
      <section style={{ padding: "100px 24px", background: "#080808" }}>
         <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, textAlign: "center", marginBottom: "4rem" }}>Expert Support 🏥</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
               {DOCTORS.map(doc => (
                  <div key={doc.name} className="clickable-card" onClick={() => window.location.href='/support'} style={{ background: "#111", border: "1px solid #222", borderRadius: "25px", padding: "2.5rem", transition: "all 0.4s" }}>
                     <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{doc.country}</div>
                     <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "10px" }}>{doc.name}</h3>
                     <p style={{ color: doc.color, fontWeight: 700, fontSize: "0.9rem" }}>{doc.spec}</p>
                     <p style={{ opacity: 0.4, fontSize: "0.8rem", marginTop: "10px" }}>{doc.org}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* REVIEWS (INFINITE SCROLL REINSTATED) */}
      <section style={{ padding: "100px 0", overflow: "hidden", background: "#050505" }}>
         <h2 style={{ textAlign: "center", marginBottom: "3rem", fontSize: "2rem", fontWeight: 900 }}>Community Love ❤️</h2>
         <div style={{ display: "flex", width: "200%", animation: "scroll 30s linear infinite" }}>
            {[1,2,3,4,5,6].map(i => (
               <div key={i} style={{ minWidth: "300px", background: "#111", margin: "0 20px", padding: "30px", borderRadius: "20px", border: "1px solid #222" }}>
                  <p style={{ opacity: 0.6 }}>"PawAlert saved a puppy in my lane. Best initiative in India!"</p>
                  <div style={{ marginTop: "20px", fontWeight: 800 }}>- Citizen Savior {i}</div>
               </div>
            ))}
         </div>
      </section>

      <footer style={{ padding: "60px 24px", textAlign: "center", borderTop: "1px solid #111" }}>
        <p style={{ opacity: 0.4 }}>PawAlert 2026 · Built with pride by Adarsh Thakur · JSSATE Noida</p>
      </footer>
    </div>
  );
};

export default Home;
