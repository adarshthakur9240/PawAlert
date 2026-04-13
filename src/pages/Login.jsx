import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import api from "../configs/api";
import toast from "react-hot-toast";
import { Smartphone, Mail, ArrowLeft } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // --- Handlers ---
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      dispatch(setAuth(data));
      toast.success("Welcome back! 🐾");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleSocialLogin = (provider) => {
    toast.loading(`Connecting to ${provider}...`);
    // Firebase logic yahan aayega: signInWithPopup(auth, googleProvider)
  };

  const handleSendOtp = () => {
    if (!phone) return toast.error("Phone number toh daal bhai!");
    setOtpSent(true);
    toast.success("OTP sent to " + phone);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-main)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          padding: "40px",
          borderRadius: "32px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "var(--text-main)",
            marginBottom: "8px",
          }}
        >
          🐾 Paw<span style={{ color: "var(--amber)" }}>Alert</span>
        </div>
        <p
          style={{
            color: "var(--text-sub)",
            marginBottom: "32px",
            fontSize: "1rem",
          }}
        >
          {isPhoneLogin ? "Login via OTP" : "Login to report stray animals"}
        </p>

        {/* --- Toggle between Email and Phone --- */}
        {!isPhoneLogin ? (
          <form onSubmit={handleEmailLogin} style={{ textAlign: "left" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={inputStyle}
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              required
            />

            <div style={{ textAlign: "right", marginBottom: "15px" }}>
              <a
                href="#"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--amber)",
                  textDecoration: "none",
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button type="submit" style={mainBtnStyle}>
              Login
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "left" }}>
            {!otpSent ? (
              <>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 00000 00000"
                  style={inputStyle}
                />
                <button onClick={handleSendOtp} style={mainBtnStyle}>
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  style={inputStyle}
                />
                <button
                  onClick={() => navigate("/dashboard")}
                  style={mainBtnStyle}
                >
                  Verify & Login
                </button>
                <button
                  onClick={() => setOtpSent(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-sub)",
                    cursor: "pointer",
                    width: "100%",
                    marginTop: "10px",
                  }}
                >
                  Change Number
                </button>
              </>
            )}
          </div>
        )}

        <div
          style={{
            margin: "20px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "var(--text-sub)",
            fontSize: "0.8rem",
          }}
        >
          <div
            style={{ flex: 1, height: "1px", background: "var(--border)" }}
          ></div>{" "}
          OR{" "}
          <div
            style={{ flex: 1, height: "1px", background: "var(--border)" }}
          ></div>
        </div>

        {/* --- Social & Phone Toggle Buttons --- */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={() => setIsPhoneLogin(!isPhoneLogin)}
            style={socialBtnStyle}
          >
            {isPhoneLogin ? <Mail size={18} /> : <Smartphone size={18} />}
            {isPhoneLogin ? "Login with Email" : "Login with Phone OTP"}
          </button>

          <button
            onClick={() => handleSocialLogin("Google")}
            style={{ ...socialBtnStyle, background: "white", color: "#000" }}
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
              alt="G"
              style={{ width: "18px" }}
            />
            Log in with Google
          </button>

          <button
            onClick={() => handleSocialLogin("Apple")}
            style={{ ...socialBtnStyle, background: "#000", color: "#fff" }}
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png"
              alt="A"
              style={{ width: "18px", filter: "invert(1)" }}
            />
            Log in with Apple
          </button>
        </div>

        <p
          style={{
            marginTop: "24px",
            color: "var(--text-sub)",
            fontSize: "0.95rem",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "var(--amber)",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

// --- Styles ---
const inputStyle = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "50px",
  border: "1px solid var(--border)",
  background: "var(--bg-card)",
  color: "var(--text-main)",
  outline: "none",
  fontSize: "0.95rem",
  marginBottom: "15px",
};

const mainBtnStyle = {
  width: "100%",
  background: "var(--amber)",
  color: "white",
  padding: "14px",
  borderRadius: "50px",
  border: "none",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: "1.1rem",
  boxShadow: "0 10px 20px rgba(212, 118, 42, 0.25)",
};

const socialBtnStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "12px",
  borderRadius: "50px",
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--text-main)",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: "0.9rem",
  transition: "0.3s",
};

export default Login;
