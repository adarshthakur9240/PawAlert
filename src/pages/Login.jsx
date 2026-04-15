import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 20px",
      fontFamily: "Inter, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(249,115,22,0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "700px", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)",
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .lw { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; width:100%; max-width:460px; display:flex; flex-direction:column; align-items:center; position:relative; z-index:1; }
        .paw-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(249,115,22,0.1); border:1px solid rgba(249,115,22,0.2); color:#f97316; font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:6px 18px; border-radius:100px; margin-bottom:22px; }
      `}</style>

      <div className="lw">
        <div className="paw-badge">🐾 PawAlert India</div>
        <h1 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.9rem,5vw,2.5rem)",
          fontWeight: 900, color: "#fff",
          margin: "0 0 8px", letterSpacing: "-0.03em",
          textAlign: "center", lineHeight: 1.1,
        }}>
          Welcome Back, Savior
        </h1>
        <div style={{ width: "100%" }}>
          <SignIn
            routing="path"
            path="/login"
            signUpUrl="/register"
            fallbackRedirectUrl="/dashboard"
            appearance={{
              variables: {
                colorPrimary: "#f97316",
                colorBackground: "#111111",
                borderRadius: "14px",
              },
              elements: {
                rootBox: "w-full",
                card: "shadow-none !border !border-[#1f1f1f] !rounded-[24px] !bg-[#111111]",
                header: "hidden",
                footer: "hidden",
              },
            }}
          />
        </div>
        <p style={{ color: "#3f3f46", fontSize: "0.8rem", marginTop: "24px", textAlign: "center" }}>
          New to PawAlert?{" "}
          <Link to="/register" style={{ color: "#f97316", fontWeight: 700, textDecoration: "none" }}>
            Join the Mission →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
