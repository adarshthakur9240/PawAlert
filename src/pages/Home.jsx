import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const PHRASES = ["Report Stray Animals,", "Protect the Animals,", "Make Cities Safer,"];

const DOCTORS = [
  { name: "Dr. Priya Sharma", title: "Senior Veterinary Surgeon", org: "AIIMS Animal Care Unit, Delhi", country: "🇮🇳", spec: "Emergency Trauma & Surgery", avatar: "PS", color: "#FF9933" },
  { name: "Dr. Arjun Mehta", title: "Wildlife & Stray Specialist", org: "SPCA India, Mumbai", country: "🇮🇳", spec: "Rabies Control & Vaccination", avatar: "AM", color: "#138808" },
  { name: "Dr. Sarah Chen", title: "Animal Rescue Physician", org: "WHO Animal Health Division", country: "🇺🇸", spec: "Zoonotic Disease Prevention", avatar: "SC", color: "#3b82f6" },
  { name: "Dr. Ravi Nair", title: "Chief Veterinary Officer", org: "Blue Cross of India, Chennai", country: "🇮🇳", spec: "Rehabilitation & Adoption", avatar: "RN", color: "#8b5cf6" },
];

const FAQS = [
  { q: "How does PawAlert connect my report to authorities?", a: "When you submit a report, it is instantly sent to your nearest Government of India rescue team and registered NGOs in the area." },
  { q: "What does the AI Animal Scan feature do?", a: "Our Gemini-powered AI analyzes the photo you take of the stray animal. It identifies the species and provides immediate first-aid advice." },
  { q: "Who can mark an animal as Rescued?", a: "Only verified Government (GOI) accounts can mark animals as Rescued to ensure accountability." },
  { q: "How do I earn a Government Recognition Certificate?", a: "Once any animal you reported gets marked as Rescued, you earn a downloadable GOI-branded PDF certificate." },
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
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx((c) => c + 1); }, 55);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx((c) => c - 1); }, 28);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx]);

  const colors = ["#FF9933", "#ffffff", "#22c55e"];
  return (
    <span style={{ color: colors[phraseIdx], transition: "color 0.3s" }}>
      {displayed}
      <span style={{ display: "inline-block", width: "3px", height: "0.85em", background: colors[phraseIdx], marginLeft: "4px", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
    </span>
  );
};

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .stat-num { background: linear-gradient(90deg,#FF9933,#ffffff,#138808,#FF9933); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 3s linear infinite; }
      `}</style>

      <Navbar />

      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", background: "radial-gradient(ellipse at 20% 50%, rgba(255,153,51,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(19,136,8,0.1) 0%, transparent 60%)" }}>
        <div style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "50px", padding: "8px 20px", fontSize: "0.85rem", fontWeight: 600, color: "#f59e0b", marginBottom: "2rem" }}>
          🐾 Community Animal Rescue Network
        </div>

        <h1 style={{ fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "900px", margin: "0 0 1.5rem" }}>
          <AnimatedText />
          <br />
          <span style={{ opacity: 0.9 }}>Make Cities Safer</span>
        </h1>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginTop: "2rem" }}>
          <a href="/dashboard" style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)", color: "#fff", padding: "16px 36px", borderRadius: "50px", fontWeight: 800, textDecoration: "none" }}>📍 Report a Stray</a>
          <a href="/dashboard" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", padding: "16px 36px", borderRadius: "50px", fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}>🗺️ Dashboard</a>
        </div>

        <div style={{ display: "flex", gap: "0", marginTop: "5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2.5rem" }}>
          {[{ val: "1,247+", label: "Reports" }, { val: "389+", label: "Rescued" }, { val: "52", label: "Cities" }].map((s, i) => (
            <div key={s.label} style={{ padding: "0 2rem", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <div className="stat-num" style={{ fontSize: "2rem", fontWeight: 900 }}>{s.val}</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "2px", opacity: 0.5, textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORS & FAQ SECTIONS HERE */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
         <h2 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: 900, marginBottom: "3rem" }}>Expert Support 🏥</h2>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px" }}>
            {DOCTORS.map(doc => (
               <div key={doc.name} style={{ background: "#0a0a0a", padding: "2rem", borderRadius: "24px", border: "1px solid #1a1a1a" }}>
                  <div style={{ color: doc.color, fontWeight: 900, marginBottom: "10px" }}>{doc.avatar}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>{doc.name}</h3>
                  <p style={{ fontSize: "0.8rem", opacity: 0.5 }}>{doc.spec}</p>
               </div>
            ))}
         </div>
      </section>

      <footer style={{ padding: "40px", textAlign: "center", borderTop: "1px solid #1a1a1a", opacity: 0.5 }}>
        <p>PawAlert 2026 · Built by Adarsh Thakur</p>
      </footer>
    </div>
  );
};

export default Home;
