import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react"; // ✅ Clerk Hooks
import api from "../configs/api.js";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "../components/Navbar";
import {
  Plus, Camera, X, Loader2, Trophy, MapPin, Edit2, Sparkles, HeartPulse, AlertCircle,
} from "lucide-react";

const SPECIES_EMOJIS = {
  dog: "🐕", cat: "🐈", cattle: "🐄", bird: "🦅", lion: "🦁", tiger: "🐯", monkey: "🐒", snake: "🐍", other: "🐾",
};

const STATUS_COLORS = {
  pending: "#ef4444", rescued: "#22c55e", sheltered: "#8b5cf6", adopted: "#ec4899", zoo: "#f59e0b", failed: "#6b7280",
};

const Dashboard = () => {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser(); // ✅ Clerk Auth
  const { getToken } = useAuth(); // ✅ JWT Token for Backend
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const certificateRef = useRef(null);

  // Clerk User Data Mapping (Keeping your original 'user' variable name safe)
  const user = clerkUser ? {
    _id: clerkUser.id,
    name: clerkUser.fullName,
    role: clerkUser.unsafeMetadata?.userType || "user",
    email: clerkUser.primaryEmailAddress?.emailAddress
  } : null;

  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoBase64, setPhotoBase64] = useState("");
  const [aiAdvice, setAiAdvice] = useState("");
  const [aiMeds, setAiMeds] = useState("");
  const [aiDetectedSpecies, setAiDetectedSpecies] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  const [form, setForm] = useState({
    reporterName: "",
    animalType: "dog",
    urgency: "low",
    location: "",
    description: "",
  });

  // Role Logic
  const userRole = user?.role?.toLowerCase();
  const isAdmin = userRole === "admin";
  const isGov = userRole === "gov" || userRole === "government" || isAdmin;
  const isNGO = userRole === "ngo" || isAdmin;
  const canEdit = isAdmin || isGov || isNGO;

  const getRoleLabel = (r) => {
    const rLower = r?.toLowerCase();
    if (rLower === "admin") return "ADMIN";
    if (rLower === "gov" || rLower === "government") return "GOI";
    if (rLower === "ngo") return "NGO";
    return "USER";
  };

  const rescuedCount = reports.filter(
    (r) => (r.userId === user?._id || r.reporterName === user?.name) && r.status === "rescued"
  ).length;

  const getAward = (count) => {
    if (count >= 50) return { title: "Platinum Legend", color: "#E5E4E2", icon: "💎" };
    if (count >= 25) return { title: "Diamond Guard", color: "#b9f2ff", icon: "💠" };
    if (count >= 15) return { title: "Gold Savior", color: "#FFD700", icon: "🥇" };
    if (count >= 5) return { title: "Silver Hero", color: "#C0C0C0", icon: "🥈" };
    return { title: "Bronze Rescuer", color: "#CD7F32", icon: "🥉" };
  };
  const badge = getAward(rescuedCount);

  useEffect(() => {
    if (isLoaded && !isSignedIn) navigate("/login");
    if (isLoaded && isSignedIn) {
      loadReports();
      document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
      if (user) setForm((prev) => ({ ...prev, reporterName: user.name }));
    }
  }, [isLoaded, isSignedIn, darkMode]);

  const loadReports = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get("/api/reports", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(data);
    } catch (e) {
      toast.error("Failed to load reports");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = await getToken();
      await api.put(`/api/reports/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadReports();
      toast.success(`${newStatus.toUpperCase()} updated! ✅`);
    } catch (e) {
      toast.error("Action Failed!");
    }
  };

  const handleAiAnalysis = async () => {
    if (!photoBase64) return toast.error("Capture photo first!");
    setIsAiLoading(true);
    try {
      const { data } = await api.post("/api/ai/analyze-image", { image: photoBase64, description: form.description });
      setAiDetectedSpecies(data.species || "Other");
      setAiAdvice(data.medicationAdvice || "Expert review required.");
      setAiMeds(data.firstAid || "Keep animal stable.");
      setForm((prev) => ({
        ...prev,
        animalType: data.species?.toLowerCase() || "other",
        urgency: data.urgency?.toLowerCase() || "medium",
      }));
      toast.success(`AI: ${data.species} detected! 🐾`);
    } catch (err) {
      toast.error("AI scan failed.");
    } finally { setIsAiLoading(false); }
  };

  const getLiveLocation = () => {
    setIsLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          location: `Pinned at ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
        }));
        setIsLocationLoading(false);
        toast.success("GPS Locked! 📍");
      },
      () => { setIsLocationLoading(false); toast.error("Location denied"); }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photoBase64) return toast.error("Photo required!");
    try {
      const token = await getToken();
      const payload = { ...form, photo: photoBase64, aiAdvice, aiMeds };
      if (editingReport) {
        await api.put(`/api/reports/${editingReport._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await api.post("/api/reports", payload, { headers: { Authorization: `Bearer ${token}` } });
      }
      closeModal();
      loadReports();
      toast.success("Success! 🐾");
    } catch (err) { toast.error("Failed!"); }
  };

  const handleEditClick = (report) => {
    setEditingReport(report);
    setForm({ reporterName: report.reporterName, animalType: report.animalType, urgency: report.urgency, location: report.location, description: report.description || "" });
    setPhotoPreview(report.photo);
    setPhotoBase64(report.photo || "");
    setAiAdvice(report.aiAdvice || "");
    setAiMeds(report.aiMeds || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false); setEditingReport(null); setPhotoPreview(null); setPhotoBase64(""); setAiAdvice(""); setAiMeds(""); setAiDetectedSpecies("");
    setForm((prev) => ({ ...prev, description: "", location: "", animalType: "dog", urgency: "low" }));
  };

  const downloadCertificate = async () => {
    if (rescuedCount < 1) return toast.error("Rescue at least 1 animal first!");
    setIsDownloading(true);
    try {
      const el = certificateRef.current;
      el.style.left = "0px"; el.style.position = "fixed"; el.style.top = "0px"; el.style.zIndex = "99999";
      await new Promise((r) => setTimeout(r, 500));
      const canvas = await html2canvas(el, { scale: 3, useCORS: true, backgroundColor: "#ffffff" });
      el.style.left = "-9999px"; el.style.position = "absolute"; el.style.zIndex = "auto";
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(`GOI_PawAlert_${user?.name}.pdf`);
      toast.success("Certificate downloaded! ��🇳");
    } catch (err) { toast.error("Download failed!"); } finally { setIsDownloading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-main)", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: "1260px", margin: "110px auto 40px", padding: "0 20px" }}>
        {/* HERO CARD */}
        <div style={{ background: "var(--bg-card)", border: `2.5px solid ${badge.color}`, borderRadius: "32px", padding: "3rem", marginBottom: "3.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: `0 20px 50px ${badge.color}15` }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ fontSize: "3rem" }}>{badge.icon}</span>
              <h2 style={{ fontSize: "2.6rem", fontWeight: 900, letterSpacing: "-1.5px" }}>{badge.title}</h2>
            </div>
            <p style={{ fontSize: "1.2rem", opacity: 0.8, marginTop: "10px" }}>Welcome back <b style={{ color: badge.color }}>{getRoleLabel(user?.role)}</b> {user?.name}. You rescued <b>{rescuedCount}</b> animals. 🇮🇳</p>
          </div>
          <button onClick={downloadCertificate} style={{ background: "linear-gradient(45deg, #FF9933, #FFFFFF, #138808)", color: "#000080", padding: "16px 32px", borderRadius: "50px", border: "2px solid navy", fontWeight: "900", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
            {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <><Trophy size={22} /> Recognition 🇮🇳</>}
          </button>
        </div>

        {/* STATS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { label: "Total Reports", value: reports.length, color: "#3b82f6" },
            { label: "🔴 Pending", value: reports.filter((r) => r.status === "pending").length, color: "#ef4444" },
            { label: "✅ Rescued", value: reports.filter((r) => r.status === "rescued").length, color: "#22c55e" },
            { label: "🏠 Sheltered", value: reports.filter((r) => r.status === "sheltered").length, color: "#8b5cf6" },
            { label: "❤️ Adopted", value: reports.filter((r) => r.status === "adopted").length, color: "#ec4899" },
          ].map((s) => (
            <div key={s.label} style={{ background: "var(--bg-card)", borderRadius: "20px", padding: "1.2rem", border: `1px solid ${s.color}30`, textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* FEED GRID */}
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "1.5rem" }}>🐾 Activity Feed</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
          {reports.map((report) => (
            <div key={report._id} style={{ background: "var(--bg-card)", borderRadius: "28px", overflow: "hidden", border: "1px solid var(--border)", position: "relative" }}>
              <div style={{ position: "absolute", top: "15px", left: "15px", zIndex: 10 }}>
                <span style={{ padding: "6px 14px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 900, background: STATUS_COLORS[report.status] || "#6b7280", color: "#fff", textTransform: "uppercase" }}>{report.status}</span>
              </div>
              <img src={report.photo} style={{ width: "100%", height: "220px", objectFit: "cover" }} alt="animal" />
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "8px" }}>{SPECIES_EMOJIS[report.animalType] || "🐾"} {report.animalType?.toUpperCase()}</h3>
                <p style={{ fontSize: "0.9rem", opacity: 0.7, display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={14} /> {report.location}</p>
                <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                  {canEdit && <button onClick={() => handleEditClick(report)} style={{ flex: "0 0 48px", height: "48px", borderRadius: "12px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "var(--text-main)", cursor: "pointer" }}><Edit2 size={18} /></button>}
                  {report.status === "pending" && isGov && <button onClick={() => updateStatus(report._id, "rescued")} style={{ flex: 1, background: "#22c55e", color: "#fff", border: "none", borderRadius: "12px", fontWeight: 900, cursor: "pointer" }}>🚑 Rescue</button>}
                  {report.status === "rescued" && isNGO && <button onClick={() => updateStatus(report._id, "sheltered")} style={{ flex: 1, background: "#8b5cf6", color: "#fff", border: "none", borderRadius: "12px", fontWeight: 900, cursor: "pointer" }}>�� Shelter</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button onClick={() => setShowModal(true)} style={{ position: "fixed", bottom: "40px", right: "40px", background: "#f59e0b", color: "white", width: "75px", height: "75px", borderRadius: "50%", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 25px rgba(245,158,11,0.5)", border: "none", cursor: "pointer" }}>
        <Plus size={45} strokeWidth={3} />
      </button>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5000, backdropFilter: "blur(15px)", padding: "20px" }}>
          <div style={{ background: "var(--bg-card)", borderRadius: "32px", padding: "40px", width: "100%", maxWidth: "550px", border: "1px solid var(--border)", overflowY: "auto", maxHeight: "95vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}>{editingReport ? "✏️ Edit Report" : "🚨 New Emergency"}</h2>
              <X onClick={closeModal} style={{ cursor: "pointer", opacity: 0.6 }} />
            </div>
            <div onClick={() => fileInputRef.current.click()} style={{ height: "200px", border: "2px dashed var(--border)", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", overflow: "hidden", background: "rgba(255,255,255,0.03)", marginBottom: "20px" }}>
              {photoPreview ? <img src={photoPreview} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ textAlign: "center", opacity: 0.5 }}><Camera size={40} /><p style={{ marginTop: "8px", fontWeight: 600 }}>Take Animal Photo 📸</p></div>}
            </div>
            <input type="file" ref={fileInputRef} onChange={(e) => { const file = e.target.files[0]; if (file) { setPhotoPreview(URL.createObjectURL(file)); const reader = new FileReader(); reader.readAsDataURL(file); reader.onloadend = () => setPhotoBase64(reader.result); } }} style={{ display: "none" }} accept="image/*" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              <button onClick={getLiveLocation} style={{ background: "#3b82f6", color: "white", padding: "12px", borderRadius: "50px", border: "none", fontWeight: "bold", cursor: "pointer" }}>{isLocationLoading ? <Loader2 className="animate-spin" size={16} /> : "📍 GPS Lock"}</button>
              <button onClick={handleAiAnalysis} disabled={isAiLoading || !photoBase64} style={{ background: "#10b981", color: "white", padding: "12px", borderRadius: "50px", border: "none", fontWeight: "bold", cursor: "pointer" }}>{isAiLoading ? <Loader2 className="animate-spin" size={16} /> : "✨ AI Scan"}</button>
            </div>
            <form onSubmit={handleSubmit}>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={{ width: "100%", padding: "1rem", borderRadius: "15px", border: "1px solid var(--border)", marginBottom: "12px", background: "var(--bg-main)", color: "var(--text-main)" }} placeholder="📍 Landmark / Location" />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ width: "100%", padding: "1rem", borderRadius: "15px", border: "1px solid var(--border)", marginBottom: "20px", background: "var(--bg-main)", color: "var(--text-main)", minHeight: "80px" }} placeholder="Condition details..." />
              <button type="submit" style={{ width: "100%", background: "#f59e0b", color: "white", padding: "1rem", borderRadius: "50px", border: "none", fontWeight: "bold", fontSize: "1.1rem" }}>{editingReport ? "Update Report ✅" : "Submit Alert 🐾"}</button>
            </form>
          </div>
        </div>
      )}

      {/* CERTIFICATE — Hidden */}
      <div ref={certificateRef} style={{ position: "absolute", left: "-9999px", top: 0, width: "1123px", height: "794px", background: "white", fontFamily: "'Playfair Display', serif" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "220px", height: "160px", background: "linear-gradient(135deg, #FF9933 50%, transparent 50%)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "220px", height: "160px", background: "linear-gradient(-45deg, #138808 50%, transparent 50%)" }} />
        <div style={{ textAlign: "center", padding: "100px" }}>
          <img src="/ashok.png" style={{ width: "65px", margin: "0 auto 10px" }} alt="Emblem" />
          <h1 style={{ fontSize: "80px", margin: 0 }}>CERTIFICATE</h1>
          <h2 style={{ fontSize: "50px", color: "#D4762A" }}>{user?.name}</h2>
          <p style={{ fontSize: "20px" }}>Successfully rescued <b>{rescuedCount} animals</b> via PawAlert.</p>
          <QRCodeSVG value={`https://pawalert.in/verify/${user?._id}`} size={100} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
