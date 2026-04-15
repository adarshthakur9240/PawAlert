import React from "react";
import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .clerk-wrap { animation: fadeUp 0.5s ease both; width: 100%; display: flex; flex-direction: column; align-items: center; }
      `}</style>
      <div className="clerk-wrap">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🐾</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", fontFamily: "Georgia, serif", margin: "0 0 6px", letterSpacing: "-1px" }}>Join the Tribe</h1>
          <p style={{ color: "#71717a", fontSize: "0.9rem", margin: 0 }}>Create your profile to start saving lives.</p>
        </div>
        <SignUp
          routing="hash"
          redirectUrl="/dashboard"
          appearance={{
            variables: {
              colorPrimary: "#f59e0b",
              colorBackground: "#111111",
              colorInputBackground: "#0a0a0a",
              colorInputText: "#ffffff",
              colorText: "#ffffff",
              colorTextSecondary: "#a1a1aa",
              borderRadius: "14px",
              fontFamily: "Inter, sans-serif",
            },
            elements: {
              rootBox: "w-full max-w-[440px]",
              card: "shadow-none border border-zinc-800 rounded-[28px] bg-[#111111]",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              header: "hidden",
              socialButtonsBlockButton: "border border-zinc-700 bg-zinc-900/80 text-white hover:bg-zinc-800 rounded-[14px] font-semibold",
              socialButtonsBlockButtonText: "text-white font-semibold",
              dividerLine: "bg-zinc-700",
              dividerText: "text-zinc-500 text-xs",
              formFieldLabel: "text-zinc-400 text-xs font-bold uppercase tracking-widest",
              formFieldInput: "bg-black border border-zinc-800 text-white rounded-[14px] focus:border-orange-500 focus:ring-0",
              formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-black font-black uppercase tracking-widest rounded-[14px] py-3",
              footerActionLink: "text-orange-500 hover:text-orange-400 font-bold",
              footerActionText: "text-zinc-500",
              identityPreviewText: "text-white",
              formFieldSuccessText: "text-green-400",
              alertText: "text-red-400",
            }
          }}
        />
      </div>
    </div>
  );
};

export default Register;
