import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../configs/api.js";
import toast from "react-hot-toast";
import { Eye, EyeOff, MapPin, Loader2, User, Phone, Mail, Lock, ChevronDown } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cityDetected, setCityDetected] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    role: "user",
  });

  useEffect(() => {
    detectCity();
  }, []);

  const detectCity = () => {
    if (!navigator.geolocation) return;
    setIsCityLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            "https://nominatim.openstreetmap.org/reverse?lat=" + latitude + "&lon=" + longitude + "&format=json"
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state_district ||
            data.address?.state ||
            "";
          if (city) {
            setForm((prev) => ({ ...prev, city }));
            setCityDetected(true);
            toast.success("📍 City detected: " + city);
          }
        } catch {
        } finally {
          setIsCityLoading(false);
        }
      },
      () => { setIsCityLoading(false); },
      { timeout: 8000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword)
      return toast.error("Passwords don't match!");
    if (form.password.length < 6)
      return toast.error("Password must be 6+ characters!");
    setIsLoading(true);
    try {
      await api.post("/api/auth/register", {
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        city: form.city,
        role: form.role,
      });
      toast.success("Welcome to the tribe! 🐾");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const inp = {
    width: "100%",
    padding: "0.9rem 1rem 0.9rem 2.8rem",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s",
  };

  const iconStyle = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255,255,255,0.35)",
    pointerEvents: "none",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", padding: "24px", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        input::placeholder { color: rgba(255,255,255,0.3); }
        input:focus, select:focus { border-color: rgba(245,158,11,0.6) !important; background: rgba(255,255,255,0.09) !important; }
        select option { background: #1a1a1a; color: #fff; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .reg-card { animation: fadeUp 0.5s ease both; }
        .city-glow { border-color: rgba(34,197,94,0.5) !important; background: rgba(34,197,94,0.07) !important; }
      `}</style>
      <div className="reg-card" style={{ width: "100%", maxWidth: "480px", background: "linear-gradient(160deg, rgba(30,20,10,0.95), rgba(15,15,15,0.98))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "28px", padding: "2.5rem", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🐾</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "'Georgia', serif", margin: "0 0 8px", color: "#fff" }}>Join the Tribe</h1>
          <p style={{ opacity: 0.45, fontSize: "0.9rem", margin: 0 }}>Create your profile to start saving lives.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div style={{ position: "relative" }}>
              <User size={15} style={iconStyle} />
              <input style={inp} placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div style={{ position: "relative" }}>
              <Phone size={15} style={iconStyle} />
              <input style={inp} placeholder="Mobile Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} type="tel" />
            </div>
          </div>
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <Mail size={15} style={iconStyle} />
            <input style={inp} placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <div style={{ position: "relative" }}>
              <Lock size={15} style={iconStyle} />
              <input style={inp} placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type={showPass ? "text" : "password"} required />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", padding: 0 }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={15} style={iconStyle} />
              <input style={inp} placeholder="Confirm Password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} type={showConfirm ? "text" : "password"} required />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", padding: 0 }}>
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <MapPin size={15} style={{ ...iconStyle, color: cityDetected ? "#22c55e" : "rgba(255,255,255,0.35)" }} />
            <input style={inp} className={cityDetected ? "city-glow" : ""} placeholder={isCityLoading ? "Detecting your city..." : "Your City"} value={form.city} onChange={(e) => { setForm({ ...form, city: e.target.value }); setCityDetected(false); }} />
            {isCityLoading && <Loader2 size={15} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#f59e0b", animation: "spin 1s linear infinite" }} />}
            {cityDetected && !isCityLoading && <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "0.7rem", color: "#22c55e", fontWeight: 700 }}>✓ Auto</span>}
          </div>
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <select style={{ ...inp, paddingLeft: "1rem", appearance: "none", cursor: "pointer" }} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="user">I am a Citizen 👤</option>
              <option value="ngo">I represent an NGO 🏢</option>
              <option value="gov">I am a Government Official 🏛️</option>
            </select>
            <ChevronDown size={15} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", pointerEvents: "none" }} />
          </div>
          <button type="submit" disabled={isLoading} style={{ width: "100%", background: isLoading ? "#b45309" : "#f59e0b", color: "#fff", padding: "1rem", borderRadius: "14px", border: "none", fontWeight: 900, fontSize: "1.05rem", cursor: isLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "background 0.2s" }}>
            {isLoading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Creating Account...</> : "Join Tribe 🐾"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1.2rem", fontSize: "0.88rem", opacity: 0.5, margin: "1.2rem 0 0" }}>
          Already a savior?{" "}
          <Link to="/login" style={{ color: "#f59e0b", fontWeight: 700, textDecoration: "none" }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
