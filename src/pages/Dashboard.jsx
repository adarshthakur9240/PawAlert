import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice.js";
import { useDispatch } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "../components/Navbar";
import {
  Plus,
  Camera,
  X,
  Loader2,
  Trophy,
  MapPin,
  Sun,
  Moon,
  Heart,
  Home,
  Edit2,
  ShieldCheck,
  Crown,
  Sparkles,
  HeartPulse,
  AlertCircle,
} from "lucide-react";

// ✅ FIX 1: Removed unused 'Zap' and 'Activity' imports — they caused red lines

const SPECIES_EMOJIS = {
  dog: "🐕",
  cat: "🐈",
  cattle: "🐄",
  bird: "🦅",
  lion: "🦁",
  tiger: "🐯",
  monkey: "🐒",
  snake: "🐍",
  other: "🐾",
};

const STATUS_COLORS = {
  pending: "#ef4444",
  rescued: "#22c55e",
  sheltered: "#8b5cf6",
  adopted: "#ec4899",
  zoo: "#f59e0b",
  failed: "#6b7280",
};

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const certificateRef = useRef(null);

  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );
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
    (r) =>
      (r.userId === user?._id || r.reporterName === user?.name) &&
      r.status === "rescued",
  ).length;

  const getAward = (count) => {
    if (count >= 50)
      return { title: "Platinum Legend", color: "#E5E4E2", icon: "💎" };
    if (count >= 25)
      return { title: "Diamond Guard", color: "#b9f2ff", icon: "💠" };
    if (count >= 15)
      return { title: "Gold Savior", color: "#FFD700", icon: "🥇" };
    if (count >= 5)
      return { title: "Silver Hero", color: "#C0C0C0", icon: "🥈" };
    return { title: "Bronze Rescuer", color: "#CD7F32", icon: "🥉" };
  };
  const badge = getAward(rescuedCount);

  useEffect(() => {
    if (!user) navigate("/login");
    loadReports();
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
    if (user) setForm((prev) => ({ ...prev, reporterName: user.name }));
  }, [user, darkMode]);

  const loadReports = async () => {
    try {
      const { data } = await api.get("/api/reports");
      setReports(data);
    } catch (e) {
      toast.error("Failed to load reports");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(
        `/api/reports/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      loadReports();
      toast.success(`${newStatus.toUpperCase()} updated! ✅`);
    } catch (e) {
      toast.error(e.response?.data?.message || "Action Failed!");
    }
  };

  const handleAiAnalysis = async () => {
    if (!photoBase64) return toast.error("Capture photo first!");
    setIsAiLoading(true);
    setAiAdvice("");
    setAiMeds("");
    setAiDetectedSpecies("");
    try {
      const { data } = await api.post("/api/ai/analyze-image", {
        image: photoBase64,
        description: form.description,
      });
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
      const status = err?.response?.status;
      if (status === 429) {
        toast.error("AI quota exceeded! Try again later.");
      } else if (status === 500) {
        toast.error("AI server error — check GEMINI_API_KEY on Render!");
      } else {
        toast.error("AI scan failed. Please retry.");
      }
    } finally {
      setIsAiLoading(false);
    }
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
      () => {
        setIsLocationLoading(false);
        toast.error("Location denied");
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photoBase64) return toast.error("Photo required!");
    try {
      if (editingReport) {
        await api.put(
          `/api/reports/${editingReport._id}`,
          { ...form, photo: photoBase64, aiAdvice, aiMeds },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        toast.success("Report updated! ✅");
      } else {
        await api.post(
          "/api/reports",
          { ...form, photo: photoBase64, aiAdvice, aiMeds },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        toast.success("Emergency Alert Sent! 🐾");
      }
      closeModal();
      loadReports();
    } catch (err) {
      toast.error("Failed!");
    }
  };

  const handleEditClick = (report) => {
    setEditingReport(report);
    setForm({
      reporterName: report.reporterName,
      animalType: report.animalType,
      urgency: report.urgency,
      location: report.location,
      description: report.description || "",
    });
    setPhotoPreview(report.photo);
    setPhotoBase64(report.photo || "");
    setAiAdvice(report.aiAdvice || "");
    setAiMeds(report.aiMeds || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingReport(null);
    setPhotoPreview(null);
    setPhotoBase64("");
    setAiAdvice("");
    setAiMeds("");
    setAiDetectedSpecies("");
    setForm((prev) => ({
      ...prev,
      description: "",
      location: "",
      animalType: "dog",
      urgency: "low",
    }));
  };

  const downloadCertificate = async () => {
    if (rescuedCount < 1) return toast.error("Rescue at least 1 animal first!");
    setIsDownloading(true);
    try {
      const el = certificateRef.current;
      el.style.left = "0px";
      el.style.position = "fixed";
      el.style.top = "0px";
      el.style.zIndex = "99999";
      await new Promise((r) => setTimeout(r, 500));
      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      el.style.left = "-9999px";
      el.style.position = "absolute";
      el.style.zIndex = "auto";
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(`GOI_PawAlert_${user?.name}.pdf`);
      toast.success("Certificate downloaded! 🇮🇳");
    } catch (err) {
      toast.error("Download failed!");
    } finally {
      setIsDownloading(false);
    }
  };

  const selectStyle = {
    padding: "0.9rem",
    borderRadius: "12px",
    background: "var(--bg-card)",
    color: "var(--text-main)",
    border: "1px solid var(--border)",
    width: "100%",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-main)",
        color: "var(--text-main)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "1260px",
          margin: "110px auto 40px",
          padding: "0 20px",
        }}
      >
        {/* HERO CARD */}
        <div
          style={{
            background: "var(--bg-card)",
            border: `2.5px solid ${badge.color}`,
            borderRadius: "32px",
            padding: "3rem",
            marginBottom: "3.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: `0 20px 50px ${badge.color}15`,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ fontSize: "3rem" }}>{badge.icon}</span>
              <h2
                style={{
                  fontSize: "2.6rem",
                  fontWeight: 900,
                  letterSpacing: "-1.5px",
                }}
              >
                {badge.title}
              </h2>
            </div>
            <p style={{ fontSize: "1.2rem", opacity: 0.8, marginTop: "10px" }}>
              Welcome back{" "}
              <b style={{ color: badge.color }}>{getRoleLabel(user?.role)}</b>{" "}
              {user?.name}. You rescued <b>{rescuedCount}</b> animals. 🇮🇳
            </p>
          </div>
          <button
            onClick={downloadCertificate}
            style={{
              background: "linear-gradient(45deg, #FF9933, #FFFFFF, #138808)",
              color: "#000080",
              padding: "16px 32px",
              borderRadius: "50px",
              border: "2px solid navy",
              fontWeight: "900",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {isDownloading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Trophy size={22} /> Recognition 🇮🇳
              </>
            )}
          </button>
        </div>

        {/* STATS ROW */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          {[
            { label: "Total Reports", value: reports.length, color: "#3b82f6" },
            {
              label: "🔴 Pending",
              value: reports.filter((r) => r.status === "pending").length,
              color: "#ef4444",
            },
            {
              label: "✅ Rescued",
              value: reports.filter((r) => r.status === "rescued").length,
              color: "#22c55e",
            },
            {
              label: "🏠 Sheltered",
              value: reports.filter((r) => r.status === "sheltered").length,
              color: "#8b5cf6",
            },
            {
              label: "❤️ Adopted",
              value: reports.filter((r) => r.status === "adopted").length,
              color: "#ec4899",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "var(--bg-card)",
                borderRadius: "20px",
                padding: "1.2rem",
                border: `1px solid ${s.color}30`,
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: "2rem", fontWeight: 900, color: s.color }}
              >
                {s.value}
              </div>
              <div
                style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "4px" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* REPORTS GRID */}
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            marginBottom: "1.5rem",
          }}
        >
          🐾 Activity Feed
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "2rem",
          }}
        >
          {reports.length === 0 ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "4rem",
                opacity: 0.5,
              }}
            >
              <div style={{ fontSize: "5rem" }}>🐾</div>
              <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                No reports yet. Be the first!
              </p>
            </div>
          ) : (
            reports.map((report) => (
              <div
                key={report._id}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "28px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  position: "relative",
                }}
              >
                {/* Status Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    zIndex: 10,
                  }}
                >
                  <span
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "0.72rem",
                      fontWeight: 900,
                      background: STATUS_COLORS[report.status] || "#6b7280",
                      color: "#fff",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {report.status}
                  </span>
                </div>

                {/* Urgency Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    zIndex: 10,
                  }}
                >
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "0.72rem",
                      fontWeight: 900,
                      background:
                        report.urgency === "high"
                          ? "#ef4444"
                          : report.urgency === "medium"
                            ? "#f59e0b"
                            : "#22c55e",
                      color: "#fff",
                    }}
                  >
                    {report.urgency?.toUpperCase()}
                  </span>
                </div>

                <img
                  src={report.photo}
                  style={{ width: "100%", height: "220px", objectFit: "cover" }}
                  alt="animal"
                />

                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontWeight: 800,
                      fontSize: "1.2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {SPECIES_EMOJIS[report.animalType] || "🐾"}{" "}
                    {report.animalType?.charAt(0).toUpperCase() +
                      report.animalType?.slice(1)}{" "}
                    Alert
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      opacity: 0.7,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginBottom: "8px",
                    }}
                  >
                    <MapPin size={14} /> {report.location}
                  </p>
                  {report.description && (
                    <p
                      style={{
                        fontSize: "0.85rem",
                        opacity: 0.6,
                        marginBottom: "12px",
                      }}
                    >
                      {report.description}
                    </p>
                  )}

                  {/* AI Advice if present */}
                  {report.aiAdvice && (
                    <div
                      style={{
                        background: "rgba(34,197,94,0.08)",
                        border: "1px solid #22c55e30",
                        borderRadius: "12px",
                        padding: "0.7rem",
                        marginBottom: "12px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "#16a34a",
                          fontWeight: 700,
                          margin: "0 0 4px",
                        }}
                      >
                        🤖 AI Advice
                      </p>
                      <p
                        style={{ fontSize: "0.78rem", margin: 0, opacity: 0.8 }}
                      >
                        {report.aiAdvice}
                      </p>
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "12px" }}
                  >
                    {canEdit && (
                      <button
                        onClick={() => handleEditClick(report)}
                        style={{
                          flex: "0 0 48px",
                          height: "48px",
                          borderRadius: "12px",
                          border: "1px solid var(--border)",
                          background: "rgba(255,255,255,0.05)",
                          color: "var(--text-main)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 50,
                        }}
                      >
                        <Edit2 size={18} />
                      </button>
                    )}

                    {report.status === "pending" && isGov && (
                      <button
                        onClick={() => updateStatus(report._id, "rescued")}
                        style={{
                          flex: 1,
                          background: "#22c55e",
                          color: "#fff",
                          border: "none",
                          borderRadius: "12px",
                          fontWeight: 900,
                          cursor: "pointer",
                          padding: "0.7rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        🚑 Rescue
                      </button>
                    )}

                    {report.status === "rescued" && isNGO && (
                      <button
                        onClick={() => updateStatus(report._id, "sheltered")}
                        style={{
                          flex: 1,
                          background: "#8b5cf6",
                          color: "#fff",
                          border: "none",
                          borderRadius: "12px",
                          fontWeight: 900,
                          cursor: "pointer",
                          padding: "0.7rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        🏠 Shelter
                      </button>
                    )}

                    {report.status === "sheltered" && isNGO && (
                      <>
                        <button
                          onClick={() => updateStatus(report._id, "adopted")}
                          style={{
                            flex: 1,
                            background: "#ec4899",
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            fontWeight: 900,
                            cursor: "pointer",
                            padding: "0.7rem",
                            fontSize: "0.85rem",
                          }}
                        >
                          ❤️ Adopt
                        </button>
                        <button
                          onClick={() => updateStatus(report._id, "zoo")}
                          style={{
                            flex: 1,
                            background: "#f59e0b",
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            fontWeight: 900,
                            cursor: "pointer",
                            padding: "0.7rem",
                            fontSize: "0.85rem",
                          }}
                        >
                          🦁 Zoo
                        </button>
                      </>
                    )}

                    {isAdmin && report.status === "pending" && (
                      <button
                        onClick={() => updateStatus(report._id, "failed")}
                        style={{
                          flex: "0 0 48px",
                          height: "48px",
                          background: "#6b7280",
                          color: "#fff",
                          border: "none",
                          borderRadius: "12px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          background: "#f59e0b",
          color: "white",
          width: "75px",
          height: "75px",
          borderRadius: "50%",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 25px rgba(245,158,11,0.5)",
          border: "none",
          cursor: "pointer",
        }}
      >
        <Plus size={45} strokeWidth={3} />
      </button>

      {/* MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5000,
            backdropFilter: "blur(15px)",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "32px",
              padding: "40px",
              width: "100%",
              maxWidth: "550px",
              border: "1px solid var(--border)",
              overflowY: "auto",
              maxHeight: "95vh",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "25px",
              }}
            >
              <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}>
                {editingReport ? "✏️ Edit Report" : "🚨 New Emergency"}
              </h2>
              <X
                onClick={closeModal}
                style={{ cursor: "pointer", opacity: 0.6 }}
              />
            </div>

            {/* Photo Upload */}
            <div
              onClick={() => fileInputRef.current.click()}
              style={{
                height: "200px",
                border: "2px dashed var(--border)",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                overflow: "hidden",
                background: "rgba(255,255,255,0.03)",
                marginBottom: "20px",
              }}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ textAlign: "center", opacity: 0.5 }}>
                  <Camera size={40} />
                  <p style={{ marginTop: "8px", fontWeight: 600 }}>
                    Take Animal Photo 📸
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPhotoPreview(URL.createObjectURL(file));
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => setPhotoBase64(reader.result);
                }
              }}
              style={{ display: "none" }}
              accept="image/*"
            />

            {/* GPS + AI Buttons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <button
                type="button"
                onClick={getLiveLocation}
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "12px",
                  borderRadius: "50px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                {isLocationLoading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  "📍 GPS Lock"
                )}
              </button>
              <button
                type="button"
                onClick={handleAiAnalysis}
                disabled={isAiLoading || !photoBase64}
                style={{
                  background: isAiLoading ? "#059669" : "#10b981",
                  color: "white",
                  padding: "12px",
                  borderRadius: "50px",
                  border: "none",
                  fontWeight: "bold",
                  cursor:
                    isAiLoading || !photoBase64 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  opacity: !photoBase64 ? 0.5 : 1,
                  transition: "all 0.2s",
                }}
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} /> Scanning...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> AI Scan
                  </>
                )}
              </button>
            </div>

            {/* AI Advice Box */}
            {aiAdvice && (
              <div
                style={{
                  background: "rgba(34,197,94,0.1)",
                  border: "1.5px solid #22c55e",
                  borderRadius: "18px",
                  padding: "1rem",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <HeartPulse size={18} color="#16a34a" />
                  <p
                    style={{
                      fontWeight: 900,
                      color: "#16a34a",
                      fontSize: "0.85rem",
                      margin: 0,
                    }}
                  >
                    AI Detected: {aiDetectedSpecies?.toUpperCase()}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "0.82rem",
                    margin: "0 0 8px",
                    lineHeight: 1.6,
                  }}
                >
                  {aiAdvice}
                </p>
                {aiMeds && (
                  <div
                    style={{
                      background: "rgba(59,130,246,0.08)",
                      border: "1px solid #3b82f630",
                      borderRadius: "10px",
                      padding: "0.6rem",
                      marginBottom: "6px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#2563eb",
                        margin: "0 0 3px",
                      }}
                    >
                      💊 Instant Medication / First Aid
                    </p>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {aiMeds}
                    </p>
                  </div>
                )}
                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "0.7rem",
                    color: "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  <AlertCircle size={12} /> WARNING: Avoid contact if showing
                  aggression.
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "15px",
                  border: "1px solid var(--border)",
                  marginBottom: "12px",
                  background: "var(--bg-main)",
                  color: "var(--text-main)",
                  boxSizing: "border-box",
                }}
                placeholder="📍 Landmark / Location"
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <select
                  value={form.animalType}
                  onChange={(e) =>
                    setForm({ ...form, animalType: e.target.value })
                  }
                  style={selectStyle}
                >
                  {Object.keys(SPECIES_EMOJIS).map((s) => (
                    <option key={s} value={s}>
                      {SPECIES_EMOJIS[s]}{" "}
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  value={form.urgency}
                  onChange={(e) =>
                    setForm({ ...form, urgency: e.target.value })
                  }
                  style={selectStyle}
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "15px",
                  border: "1px solid var(--border)",
                  marginBottom: "20px",
                  background: "var(--bg-main)",
                  color: "var(--text-main)",
                  minHeight: "80px",
                  resize: "none",
                  boxSizing: "border-box",
                }}
                placeholder="Condition & extra details..."
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "var(--amber)",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "50px",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
              >
                {editingReport ? "Update Report ✅" : "Submit Alert 🐾"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CERTIFICATE — HIDDEN */}
      {/* ✅ FIX 2: Replaced Wikimedia Ashok emblem (429 rate limit) with local /public/ashok.png */}
      <div
        ref={certificateRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "1123px",
          height: "794px",
          background: "white",
          overflow: "hidden",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "220px",
            height: "160px",
            background: "linear-gradient(135deg, #FF9933 50%, transparent 50%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "220px",
            height: "160px",
            background: "linear-gradient(-45deg, #138808 50%, transparent 50%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "10px double #D4AF37",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "20px",
            padding: "50px 60px 40px",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "10px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <QRCodeSVG
                value={`https://pawalert.in/verify/${user?._id}`}
                size={110}
                level="H"
                includeMargin={true}
              />
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 900,
                  color: "#000080",
                  marginTop: "6px",
                  letterSpacing: "1px",
                }}
              >
                SCAN TO VERIFY
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              {/* ✅ LOCAL ASSET — no more 429 from Wikimedia */}
              <img
                src="/ashok.png"
                style={{
                  width: "65px",
                  marginLeft: "auto",
                  display: "block",
                  marginBottom: "6px",
                }}
                crossOrigin="anonymous"
                alt="Ashok Emblem"
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  margin: 0,
                  color: "#1a1a1a",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Ministry of Culture
              </p>
              <p style={{ fontSize: "13px", margin: 0, color: "#444" }}>
                Government of India
              </p>
            </div>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <h1
              style={{
                fontSize: "90px",
                fontWeight: 900,
                margin: "0",
                color: "#1a1a1a",
                lineHeight: 1,
              }}
            >
              CERTIFICATE
            </h1>
            <h3
              style={{
                fontSize: "22px",
                letterSpacing: "14px",
                color: "#555",
                margin: "8px 0 30px",
                fontWeight: 400,
              }}
            >
              OF APPRECIATION
            </h3>
            <p
              style={{
                fontSize: "18px",
                color: "#888",
                fontStyle: "italic",
                margin: "0 0 10px",
              }}
            >
              PROUDLY PRESENTED TO
            </p>
            <h2
              style={{
                fontSize: "68px",
                fontStyle: "italic",
                color: "#D4762A",
                borderBottom: "3px solid #eee",
                display: "inline-block",
                padding: "0 80px 8px",
                margin: "0 0 30px",
              }}
            >
              {user?.name}
            </h2>
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.8,
                maxWidth: "820px",
                margin: "0 auto",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#222",
                fontFamily: "Inter, sans-serif",
              }}
            >
              For successfully rescuing <b>{rescuedCount} stray animals</b>{" "}
              through <b>PawAlert</b>.<br />
              An exemplary contribution to make India safer for every living
              being.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ textAlign: "center", width: "260px" }}>
              <p
                style={{
                  fontSize: "14px",
                  color: "#1c1c1c",
                  margin: "0 0 4px",
                  textAlign: "left",
                }}
              >
                Founder,
              </p>
              <img
                src="/adarsh_sign-removebg-preview.png"
                alt="Signature"
                style={{
                  width: "200px",
                  height: "70px",
                  objectFit: "contain",
                  display: "block",
                }}
                crossOrigin="anonymous"
              />
              <div
                style={{
                  height: "2px",
                  background: "#1a1a1a",
                  width: "100%",
                  margin: "4px 0",
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  color: "#1c1c1c",
                  margin: "0 0 2px",
                }}
              >
                Adarsh Thakur
              </p>
              <p style={{ fontSize: "11px", color: "#888", margin: 0 }}>
                Authorized Signatory, PawAlert Network
              </p>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "25px",
              left: "60px",
              fontSize: "11px",
              color: "#aaa",
            }}
          >
            Verification ID: PAW-{user?._id?.slice(-6).toUpperCase()} •
            pawalert.in
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
