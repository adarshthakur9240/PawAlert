import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Phone, Mail, ChevronDown, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: "How to report?", a: "Use the '+' button on your Dashboard." },
    { q: "Where is my certificate?", a: "It unlocks after 1 successful rescue." },
    { q: "Is this official?", a: "Yes, we are integrated with GOI and local NGOs." }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "120px auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 900, textAlign: "center" }}>Support Center</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", margin: "40px 0" }}>
          <div style={{ background: "#111", padding: "20px", borderRadius: "20px", border: "1px solid #222", textAlign: "center" }}>
            <Phone color="#f59e0b" size={30} />
            <p style={{ fontWeight: 800, marginTop: "10px" }}>1800-PAW-SAFE</p>
          </div>
          <div style={{ background: "#111", padding: "20px", borderRadius: "20px", border: "1px solid #222", textAlign: "center" }}>
            <Mail color="#3b82f6" size={30} />
            <p style={{ fontWeight: 800, marginTop: "10px" }}>help@pawalert.in</p>
          </div>
        </div>
        {faqs.map((f, i) => (
          <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ background: "#111", padding: "20px", borderRadius: "12px", marginBottom: "10px", cursor: "pointer", border: "1px solid #222" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700 }}>{f.q}</span>
              <ChevronDown style={{ transform: openFaq === i ? "rotate(180deg)" : "none" }} />
            </div>
            {openFaq === i && <p style={{ marginTop: "10px", opacity: 0.6 }}>{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Support;
