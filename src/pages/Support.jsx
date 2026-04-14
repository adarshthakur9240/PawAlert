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
  { q: "How does PawAlert connect my report to authorities?", a: "When you submit a report, it is instantly sent to your nearest Government of India rescue team and registered NGOs in the area. Our system uses your GPS coordinates to auto-assign the closest responder." },
  { q: "What does the AI Animal Scan feature do?", a: "Our Gemini-powered AI analyzes the photo you take of the stray animal. It identifies the species, assesses injury urgency, and provides immediate first-aid and medication advice within seconds." },
  { q: "Who can mark an animal as Rescued or Sheltered?", a: "Only verified Government (GOI) accounts can mark animals as Rescued. NGO accounts can then update shelter and adoption status. This ensures accountability at every stage of the rescue pipeline." },
  { q: "How do I earn a Government Recognition Certificate?", a: "Once any animal you reported gets marked as Rescued, you earn a downloadable GOI-branded PDF certificate with an Ashok Emblem, your name, rescue count, and a scannable QR verification code." },
  { q: "Is my location data stored or shared?", a: "Your GPS coordinates are stored only with the specific report you file. They are shared with assigned rescue personnel to locate the animal. We never sell or share your personal data with third parties." },
  { q: "Can I report animals that are not dogs or cats?", a: "Absolutely. PawAlert supports reporting for dogs, cats, cattle, birds, monkeys, snakes, lions, tigers, and more. The AI can identify and advise on wildlife cases too." },
  { q: "What happens after an animal is adopted or sent to a zoo?", a: "The report is marked complete and contributes to your rescue count and badge tier. You will see the status update live on your dashboard. Platinum Legend badge unlocks at 50 rescues!" },
  { q: "How do I apply for an NGO or GOI account?", a: "Reach out to us at support@pawalert.in with your organisation registration documents. Our team verifies credentials within 48 hours and upgrades your account role accordingly." },
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

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a00 0%, #1a1200 40%, #0d1a00 100%)", color: "var(--text-main)", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .doc-card:hover { transform: translateY(-8px) !important; box-shadow: 0 24px 48px rgba(0,0,0,0.3) !important; }
        .faq-item:hover { background: rgba(255,255,255,0.05) !important; }
        .stat-num { background: linear-gradient(90deg,#FF9933,#ffffff,#138808,#FF9933); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 3s linear infinite; }
        .hero-badge { animation: fadeUp 0.6s ease both; }
        .hero-h1 { animation: fadeUp 0.7s 0.1s ease both; opacity: 0; animation-fill-mode: forwards; }
        .hero-sub { animation: fadeUp 0.7s 0.2s ease both; opacity: 0; animation-fill-mode: forwards; }
        .hero-cta { animation: fadeUp 0.7s 0.3s ease both; opacity: 0; animation-fill-mode: forwards; }
        .hero-stats { animation: fadeUp 0.7s 0.5s ease both; opacity: 0; animation-fill-mode: forwards; }
      `}</style>

      <Navbar />

      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", background: "radial-gradient(ellipse at 20% 50%, rgba(255,153,51,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(19,136,8,0.12) 0%, transparent 60%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "50px", padding: "8px 20px", fontSize: "0.85rem", fontWeight: 600, color: "#f59e0b", marginBottom: "2rem" }}>
          🐾 Community Animal Rescue Network
        </div>

        <h1 className="hero-h1" style={{ fontSize: "clamp(2rem,5vw,4.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-2px", fontFamily: "'Outfit', sans-serif", maxWidth: "900px", margin: "0 0 1.5rem" }}>
          <AnimatedText />
          <br />
          <span style={{ color: "var(--text-main)", opacity: 0.9 }}>Make Cities Safer</span>
        </h1>

        <p className="hero-sub" style={{ fontSize: "1.15rem", opacity: 0.65, maxWidth: "580px", lineHeight: 1.7, margin: "0 0 2.5rem" }}>
          Spot a stray? Pin it on the map. We connect your report directly to local government authorities for vaccination, rescue, and proper care.
        </p>

        <div className="hero-cta" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="/dashboard" style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)", color: "#fff", padding: "16px 36px", borderRadius: "50px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            📍 Report a Stray Animal
          </a>
          <a href="/dashboard" style={{ background: "rgba(255,255,255,0.08)", color: "var(--text-main)", padding: "16px 36px", borderRadius: "50px", fontWeight: 700, fontSize: "1rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", gap: "8px" }}>
            🗺️ View Dashboard
          </a>
        </div>

        <div className="hero-stats" style={{ display: "flex", gap: "0", marginTop: "5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2.5rem" }}>
          {[{ val: "1,247+", label: "Animals Reported" }, { val: "389+", label: "Rescued & Vaccinated" }, { val: "52", label: "Cities Active" }].map((s, i) => (
            <div key={s.label} style={{ padding: "0 3rem", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none", textAlign: "center" }}>
              <div className="stat-num" style={{ fontSize: "2.4rem", fontWeight: 900 }}>{s.val}</div>
              <div style={{ fontSize: "0.75rem", letterSpacing: "2px", opacity: 0.5, textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ color: "#f59e0b", fontWeight: 700, letterSpacing: "3px", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "12px" }}>Verified Network</p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-1.5px", margin: "0 0 12px" }}>Expert Veterinary Support 🏥</h2>
          <p style={{ opacity: 0.55, fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>Immediate AI-assisted advice, backed by certified professionals on standby</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem" }}>
          {DOCTORS.map((doc) => (
            <div key={doc.name} className="doc-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "28px", padding: "2rem", transition: "transform 0.3s ease,box-shadow 0.3s ease", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: doc.color, borderRadius: "28px 28px 0 0" }} />
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: doc.color + "22", border: "2px solid " + doc.color + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 900, color: doc.color, marginBottom: "1.2rem" }}>{doc.avatar}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.05rem", margin: "0 0 4px" }}>{doc.name}</h3>
                  <p style={{ fontSize: "0.82rem", opacity: 0.6, margin: "0 0 2px" }}>{doc.title}</p>
                  <p style={{ fontSize: "0.78rem", opacity: 0.45, margin: 0 }}>{doc.org}</p>
                </div>
                <span style={{ fontSize: "1.4rem" }}>{doc.country}</span>
              </div>
              <div style={{ marginTop: "1.2rem", display: "inline-flex", alignItems: "center", gap: "6px", background: doc.color + "14", border: "1px solid " + doc.color + "30", borderRadius: "50px", padding: "5px 14px", fontSize: "0.73rem", fontWeight: 700, color: doc.color }}>
                ✦ {doc.spec}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px 24px 120px", maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ color: "#22c55e", fontWeight: 700, letterSpacing: "3px", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "12px" }}>Got Questions?</p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-1.5px", margin: 0 }}>Frequently Asked 🐾</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ background: "var(--bg-card)", border: "1px solid " + (openFaq === i ? "rgba(245,158,11,0.4)" : "var(--border)"), borderRadius: "18px", padding: "1.2rem 1.5rem", cursor: "pointer", transition: "all 0.2s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <span style={{ fontWeight: 700, fontSize: "0.95rem", color: openFaq === i ? "#f59e0b" : "var(--text-main)", transition: "color 0.2s" }}>{faq.q}</span>
                <span style={{ fontSize: "1.4rem", color: "#f59e0b", flexShrink: 0, transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block" }}>+</span>
              </div>
              <div style={{ display: "grid", gridTemplateRows: openFaq === i ? "1fr" : "0fr", transition: "grid-template-rows 0.3s ease" }}>
                <div style={{ overflow: "hidden" }}>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.7, opacity: 0.65, margin: "1rem 0 0", paddingRight: "2rem" }}>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default Support;
