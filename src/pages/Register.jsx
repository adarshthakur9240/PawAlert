import React, { useState } from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const USER_TYPES = [
  { id: "citizen", emoji: "🧑‍🤝‍🧑", label: "Citizen", desc: "Report & rescue stray animals", color: "#f97316" },
  { id: "ngo", emoji: "🏥", label: "NGO", desc: "Shelter, treat & adopt animals", color: "#8b5cf6" },
  { id: "goi", emoji: "🏛️", label: "Govt. of India", desc: "Official rescue & enforcement", color: "#22c55e" },
];

const Register = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationText, setLocationText] = useState("");
  const [showClerk, setShowClerk] = useState(false);

  const detectLocation = () => {
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || "Your City";
          const state = data.address?.state || "";
          setLocationText(`${city}${state ? ", " + state : ""}`);
          setLocationStatus("done");
        } catch {
          setLocationText(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
          setLocationStatus("done");
        }
      },
      () => setLocationStatus("denied")
    );
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "32px 20px", fontFamily: "Inter, sans-serif", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(249,115,22,0.055) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", width: "800px", height: "800px", pointerEvents: "none", background: "radial-gradient(circle, rgba(249,115,22,0.065) 0%, transparent 65%)" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .rw { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; width:100%; max-width:480px; display:flex; flex-direction:column; align-items:center; position:relative; z-index:1; }
        .paw-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(249,115,22,0.1); border:1px solid rgba(249,115,22,0.2); color:#f97316; font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:6px 18px; border-radius:100px; margin-bottom:22px; }
        .type-card { width:100%; background:#111; border:1.5px solid #1f1f1f; border-radius:18px; padding:16px 18px; cursor:pointer; display:flex; align-items:center; gap:14px; transition:all 0.2s ease; margin-bottom:10px; }
        .type-card.active { background:#161616; border-color: rgba(249,115,22,0.4); }
        .loc-btn { width:100%; padding:13px 18px; background:#161616; border:1.5px solid #2a2a2a; border-radius:14px; color:#a1a1aa; font-size:0.85rem; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:22px; }
        .loc-btn.done { border-color:rgba(34,197,94,0.4); color:#22c55e; }
        .continue-btn { width:100%; padding:16px; background:#f97316; border:none; border-radius:14px; color:#000; font-size:0.95rem; font-weight:900; text-transform:uppercase; cursor:pointer; transition: 0.2s; }
        .continue-btn:hover:not(:disabled) { background:#fb923c; transform:translateY(-1px); }
        .continue-btn:disabled { opacity:0.3; cursor:not-allowed; }
      `}</style>

      <div className="rw">
        <div className="paw-badge">🐾 PawAlert India</div>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", fontWeight: 900, color: "#fff", margin: "0 0 8px", textAlign: "center" }}>Join the Mission</h1>
        
        {!showClerk ? (
          <div style={{ width: "100%" }}>
            <p style={{ color: "#3f3f46", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", marginBottom: "12px" }}>Step 1 — Choose Profile Type</p>
            {USER_TYPES.map((t) => (
              <div key={t.id} className={`type-card ${selectedType === t.id ? 'active' : ''}`} onClick={() => setSelectedType(t.id)}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: selectedType === t.id ? t.color + "20" : "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{t.emoji}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 700, color: selectedType === t.id ? "#fff" : "#d4d4d8" }}>{t.label}</p>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#52525b" }}>{t.desc}</p>
                </div>
              </div>
            ))}

            <p style={{ color: "#3f3f46", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", margin: "20px 0 12px" }}>Step 2 — Location (Optional)</p>
            <button className={`loc-btn ${locationStatus === "done" ? "done" : ""}`} onClick={detectLocation}>
              {locationStatus === "idle" ? "📍 Auto-detect location" : locationStatus === "loading" ? "⏳ Detecting..." : `✅ ${locationText}`}
            </button>

            <button className="continue-btn" disabled={!selectedType} onClick={() => setShowClerk(true)}>
              Continue to Secure Sign Up →
            </button>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <button onClick={() => setShowClerk(false)} style={{ background: "none", border: "none", color: "#52525b", fontSize: "0.8rem", cursor: "pointer", marginBottom: "15px" }}>← Change Role</button>
            <SignUp 
              routing="path" path="/register" signInUrl="/login"
              fallbackRedirectUrl="/dashboard"
              unsafeMetadata={{ userType: selectedType, location: locationText }}
              appearance={{
                variables: { colorPrimary: "#f97316", colorBackground: "#111111", colorText: "#fff" },
                elements: { card: "shadow-none !border !border-[#1f1f1f] !rounded-[24px] !bg-[#111111]", header: "hidden", footer: "hidden" }
              }}
            />
          </div>
        )}
        
        <p style={{ color: "#3f3f46", fontSize: "0.8rem", marginTop: "24px" }}>
          Already a rescuer? <Link to="/login" style={{ color: "#f97316", fontWeight: 700, textDecoration: "none" }}>Sign In →</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
