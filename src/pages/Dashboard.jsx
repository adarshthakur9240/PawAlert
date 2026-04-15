import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; 
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
  const { user: reduxUser, token } = useSelector((state) => state.auth);
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const certificateRef = useRef(null);

  // Hybrid User Object
  const user = reduxUser || (clerkUser ? {
    _id: clerkUser.id,
    name: clerkUser.fullName,
    role: clerkUser.unsafeMetadata?.userType || "citizen",
    email: clerkUser.primaryEmailAddress?.emailAddress
  } : null);

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
    reporterName: "", animalType: "dog", urgency: "low", location: "", description: "",
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

  const badge = ((count) => {
    if (count >= 50) return { title: "Platinum Legend", color: "#E5E4E2", icon: "💎" };
    if (count >= 25) return { title: "Diamond Guard", color: "#b9f2ff", icon: "💠" };
    if (count >= 15) return { title: "Gold Savior", color: "#FFD700", icon: "🥇" };
    if (count >= 5) return { title: "Silver Hero", color: "#C0C0C0", icon: "🥈" };
    return { title: "Bronze Rescuer", color: "#CD7F32", icon: "🥉" };
  })(rescuedCount);

  // ✅ SYNC LOGIC
  useEffect(() => {
    const syncIdentity = async () => {
      if (isLoaded && isSignedIn && clerkUser && !token) {
        try {
          const { data } = await api.post("/api/auth/clerk-sync", {
            email: clerkUser.primaryEmailAddress.emailAddress,
            name: clerkUser.fullName,
            clerkId: clerkUser.id,
            userType: clerkUser.unsafeMetadata?.userType || "citizen"
          });
          if (data.success) {
            dispatch({ type: "auth/loginSuccess", payload: { user: data.user, token: data.token } });
            toast.success("Identity Synced! 🐾");
          }
        } catch (err) { console.error("Sync Error:", err); }
      }
    };
    syncIdentity();
  }, [isLoaded, isSignedIn, clerkUser, token, dispatch]);

  useEffect(() => {
    if (token) loadReports();
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    if (user) setForm((prev) => ({ ...prev, reporterName: user.name }));
  }, [token, darkMode]);

  const loadReports = async () => {
    try {
      const { data } = await api.get("/api/reports");
      setReports(data);
    } catch (e) { toast.error("Failed to load reports"); }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/reports/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadReports();
      toast.success(`${newStatus.toUpperCase()} updated! ✅`);
    } catch (e) { toast.error("Action Failed!"); }
  };

  const handleAiAnalysis = async () => {
    if (!photoBase64) return toast.error("Capture photo first!");
    setIsAiLoading(true);
    try {
      const { data } = await api.post("/api/ai/analyze-image", { image: photoBase64, description: form.description });
      setAiDetectedSpecies(data.species || "Other");
      setAiAdvice(data.medicationAdvice || "Expert review required.");
      setAiMeds(data.firstAid || "Keep animal stable.");
      setForm((prev) => ({ ...prev, animalType: data.species?.toLowerCase() || "other", urgency: data.urgency?.toLowerCase() || "medium" }));
      toast.success(`AI: ${data.species} detected! 🐾`);
    } catch (err) { toast.error("AI scan failed."); } finally { setIsAiLoading(false); }
  };

  const getLiveLocation = () => {
    setIsLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({ ...prev, location: `Pinned at ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}` }));
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
      toast.success("Certificate downloaded! 🇮🇳");
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

        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "1.5rem" }}>🐾 Activity Feed</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
          {reports.map((report) => (
            <div key={report._id} style={{ background: "var(--bg-card)", borderRadius: "28px", overflow: "hidden", border: "1px solid var(--border)", position: "relative" }}>
              <img src={report.photo} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 800 }}>{SPECIES_EMOJIS[report.animalType] || "🐾"} {report.animalType?.toUpperCase()}</h3>
                <p style={{ fontSize: "0.9rem", opacity: 0.7 }}><MapPin size={14} /> {report.location}</p>
                {report.aiAdvice && <div style={{ background: "rgba(34,197,94,0.08)", padding: "0.7rem", borderRadius: "12px", marginTop: "10px" }}><p style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700 }}>🤖 AI Advice</p><p style={{ fontSize: "0.78rem" }}>{report.aiAdvice}</p></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => setShowModal(true)} style={{ position: "fixed", bottom: "40px", right: "40px", background: "#f59e0b", color: "white", width: "75px", height: "75px", borderRadius: "50%", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}><Plus size={45} /></button>
      
      {/* CERTIFICATE — HIDDEN */}
      <div ref={certificateRef} style={{ position: "absolute", left: "-9999px", top: 0, width: "1123px", height: "794px", background: "white", overflow: "hidden" }}>
        <div style={{ textAlign: "center", padding: "80px" }}>
          <img src="/ashok.png" style={{ width: "65px" }} />
          <h1 style={{ fontSize: "80px", margin: "20px 0" }}>CERTIFICATE</h1>
          <h2 style={{ fontSize: "50px", color: "#D4762A" }}>{user?.name}</h2>
          <p style={{ fontSize: "20px" }}>For successfully rescuing <b>{rescuedCount} stray animals</b>.</p>
          <QRCodeSVG value={`https://pawalert.in/verify/${user?._id}`} size={100} style={{ marginTop: "30px" }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
