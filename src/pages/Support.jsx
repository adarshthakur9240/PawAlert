import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  ChevronDown,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How do I report a stray animal?",
      a: "Go to the Dashboard and click the orange '+' button. Upload a photo, use 'GPS Lock' for location, and submit.",
    },
    {
      q: "Who handles the rescue after I report?",
      a: "Your report is instantly broadcasted to local government authorities (GOI) and nearby NGOs who handle the on-ground rescue.",
    },
    {
      q: "How do I get my certificate?",
      a: "Once you successfully rescue at least 1 animal (verified by authorities), you can download your official certificate from the Dashboard.",
    },
  ];

  const handleContact = (e) => {
    e.preventDefault();
    toast.success("Message sent! Our team will contact you soon. 🐾");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "1000px",
          margin: "120px auto 50px",
          padding: "0 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1
            style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "15px" }}
          >
            Help Center
          </h1>
          <p style={{ opacity: 0.6, fontSize: "1.2rem" }}>
            Need help saving lives? We're here for you 24/7.
          </p>
        </div>

        {/* Contact Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              background: "#111",
              padding: "30px",
              borderRadius: "24px",
              border: "1px solid #222",
              textAlign: "center",
            }}
          >
            <Phone size={40} color="#f59e0b" style={{ marginBottom: "15px" }} />
            <h3 style={{ margin: "0 0 10px" }}>Emergency Helpline</h3>
            <p
              style={{ color: "#f59e0b", fontSize: "1.5rem", fontWeight: 900 }}
            >
              1800-PAW-ALERT
            </p>
          </div>
          <div
            style={{
              background: "#111",
              padding: "30px",
              borderRadius: "24px",
              border: "1px solid #222",
              textAlign: "center",
            }}
          >
            <Mail size={40} color="#3b82f6" style={{ marginBottom: "15px" }} />
            <h3 style={{ margin: "0 0 10px" }}>Email Support</h3>
            <p style={{ opacity: 0.7 }}>support@pawalert.in</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Common Questions
          </h2>
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                background: "#111",
                marginBottom: "15px",
                borderRadius: "15px",
                border: "1px solid #222",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 700 }}>{faq.q}</span>
                <ChevronDown
                  style={{
                    transform: openFaq === i ? "rotate(180deg)" : "none",
                    transition: "0.3s",
                  }}
                />
              </div>
              {openFaq === i && (
                <div
                  style={{
                    padding: "0 20px 20px",
                    opacity: 0.7,
                    fontSize: "0.95rem",
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div
          style={{
            background: "#111",
            padding: "40px",
            borderRadius: "32px",
            border: "1px solid #222",
          }}
        >
          <h2 style={{ margin: "0 0 20px" }}>Send us a message</h2>
          <form onSubmit={handleContact}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                marginBottom: "15px",
              }}
            >
              <input
                placeholder="Name"
                style={{
                  background: "#0a0a0a",
                  border: "1px solid #222",
                  color: "#fff",
                  padding: "15px",
                  borderRadius: "12px",
                }}
                required
              />
              <input
                placeholder="Email"
                type="email"
                style={{
                  background: "#0a0a0a",
                  border: "1px solid #222",
                  color: "#fff",
                  padding: "15px",
                  borderRadius: "12px",
                }}
                required
              />
            </div>
            <textarea
              placeholder="How can we help?"
              style={{
                width: "100%",
                background: "#0a0a0a",
                border: "1px solid #222",
                color: "#fff",
                padding: "15px",
                borderRadius: "12px",
                minHeight: "120px",
                marginBottom: "20px",
              }}
              required
            ></textarea>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#f59e0b",
                color: "#fff",
                padding: "18px",
                borderRadius: "50px",
                border: "none",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Send Message 🐾
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
