import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Phone, Mail, ChevronDown } from "lucide-react";

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: "How to report?", a: "Use the '+' button on your Dashboard." },
    { q: "Where is my certificate?", a: "It unlocks after 1 successful rescue." },
    { q: "Is this official?", a: "Yes, we are integrated with GOI and local NGOs." },
    { q: "How do I apply for an NGO or GOI account?", a: "Contact us at support@pawalert.in with your organisation documents. Our team verifies credentials within 48 hours." }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "120px auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 900, textAlign: "center", marginBottom: "8px" }}>Support Center</h1>
        <p style={{ textAlign: "center", opacity: 0.5, marginBottom: "40px" }}>We're here to help 🐾</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", margin: "40px 0" }}>
          <div style={{ background: "#111", padding: "20px", borderRadius: "20px", border: "1px solid #222", textAlign: "center" }}>
            <Phone color="#f59e0b" size={30} />
            <p style={{ fontWeight: 800, marginTop: "10px" }}>1800-PAW-SAFE</p>
          </div>
          <div style={{ background: "#111", padding: "20px", borderRadius: "20px", border: "1px solid #222", textAlign: "center" }}>
            <Mail color="#3b82f6" size={30} />
            <p style={{ fontWeight: 800, marginTop: "10px" }}>support@pawalert.in</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {faqs.map((f, i) => (
            <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ background: "#111", padding: "20px", borderRadius: "16px", cursor: "pointer", border: openFaq === i ? "1px solid #f59e0b44" : "1px solid #222", transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, color: openFaq === i ? "#f59e0b" : "#fff" }}>{f.q}</span>
                <ChevronDown size={18} style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: "#f59e0b" }} />
              </div>
              {openFaq === i && <p style={{ marginTop: "12px", opacity: 0.6, fontSize: "0.9rem", lineHeight: 1.6 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Support;
