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
  Plus,
  Camera,
  X,
  Loader2,
  Trophy,
  MapPin,
  Edit2,
  Sparkles,
  HeartPulse,
  AlertCircle,
  ShieldCheck,
  Crown,
  Heart,
  Home,
  Edit,
  Sun,
  Moon,
  Activity,
  Zap,
  Info,
  Shield,
  Settings,
  User,
  LogOut,
  CheckCircle,
  Clock,
  ExternalLink,
} from "lucide-react";

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
  const { user: reduxUser, token } = useSelector((state) => state.auth);
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const certificateRef = useRef(null);

  const user =
    reduxUser ||
    (clerkUser
      ? {
          _id: clerkUser.id,
          name: clerkUser.fullName,
          role: clerkUser.unsafeMetadata?.userType || "citizen",
          email: clerkUser.primaryEmailAddress?.emailAddress,
        }
      : null);

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

  // ✅ IDENTITY SYNC EFFECT
  useEffect(() => {
    const syncIdentity = async () => {
      if (isLoaded && isSignedIn && clerkUser && !token) {
        try {
          const { data } = await api.post("/api/auth/clerk-sync", {
            email: clerkUser.primaryEmailAddress.emailAddress,
            name: clerkUser.fullName,
            clerkId: clerkUser.id,
            userType: clerkUser.unsafeMetadata?.userType || "citizen",
          });
          if (data.success) {
            dispatch({
              type: "auth/loginSuccess",
              payload: { user: data.user, token: data.token },
            });
          }
        } catch (err) {
          console.error("Sync Error");
        }
      }
    };
    syncIdentity();
  }, [isLoaded, isSignedIn, clerkUser, token, dispatch]);

  useEffect(() => {
    if (token) loadReports();
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
    if (user) setForm((prev) => ({ ...prev, reporterName: user.name }));
  }, [token, darkMode]);

  const loadReports = async () => {
    try {
      const { data } = await api.get("/api/reports");
      setReports(data);
    } catch (e) {
      toast.error("Failed to load reports");
    }
  };

  const handleAiAnalysis = async () => {
    if (!photoBase64) return toast.error("Capture photo first!");
    setIsAiLoading(true);
    setAiAdvice("");
    try {
      const { data } = await api.post("/api/ai/analyze-image", {
        image: photoBase64,
        description: form.description,
      });
      setAiDetectedSpecies(data.species);
      setAiAdvice(data.medicationAdvice);
      setAiMeds(data.firstAid);
      setForm((prev) => ({
        ...prev,
        animalType: data.species?.toLowerCase() || "other",
        urgency: data.urgency || "medium",
      }));
      toast.success("AI Scan Complete!");
    } catch (err) {
      toast.error("AI Scan failed.");
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
    try {
      const payload = { ...form, photo: photoBase64, aiAdvice, aiMeds };
      await api.post("/api/reports", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      loadReports();
      toast.success("Emergency Alert Sent! 🐾");
    } catch (err) {
      toast.error("Submission failed!");
    }
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
        {/* ✅ DYNAMIC HEADER WITH ROLE BRANDING */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ animation: "slideInLeft 0.8s ease" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#f59e0b",
                marginBottom: "8px",
              }}
            >
              <Zap size={20} fill="#f59e0b" />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  letterSpacing: "1px",
                }}
              >
                LIVE COMMAND CENTER
              </span>
            </div>
            <h1
              style={{
                fontSize: "3.2rem",
                fontWeight: 900,
                margin: 0,
                letterSpacing: "-2px",
                lineHeight: 1,
              }}
            >
              Dashboard
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              background: "var(--bg-card)",
              padding: "12px 28px",
              borderRadius: "100px",
              border: "1px solid var(--border)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
              animation: "slideInRight 0.8s ease",
            }}
          >
            <div
              style={{
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 15px #22c55e",
              }}
            ></div>
            <span style={{ fontWeight: 800, fontSize: "1rem" }}>
              <span style={{ color: badge.color }}>
                [{getRoleLabel(user?.role)}]
              </span>{" "}
              {user?.name}
            </span>
          </div>
        </div>

        {/* HERO CARD - HEAVY UI */}
        <div
          style={{
            background: "var(--bg-card)",
            border: `2.5px solid ${badge.color}`,
            borderRadius: "35px",
            padding: "3.5rem",
            marginBottom: "4rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: `0 30px 70px ${badge.color}15`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              opacity: 0.03,
            }}
          >
            <Trophy size={400} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
              <div
                style={{
                  background: `${badge.color}20`,
                  padding: "20px",
                  borderRadius: "24px",
                }}
              >
                <span style={{ fontSize: "4rem" }}>{badge.icon}</span>
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    letterSpacing: "-3px",
                    margin: 0,
                  }}
                >
                  {badge.title}
                </h2>
                <p
                  style={{
                    fontSize: "1.4rem",
                    opacity: 0.7,
                    marginTop: "10px",
                    fontWeight: 500,
                  }}
                >
                  You have saved <b>{rescuedCount}</b> lives so far. India is
                  proud of you! 🇮🇳
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED STATS ROW */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          {[
            {
              label: "Total Alerts",
              value: reports.length,
              color: "#3b82f6",
              icon: <Activity size={24} />,
            },
            {
              label: "Emergency Pending",
              value: reports.filter((r) => r.status === "pending").length,
              color: "#ef4444",
              icon: <AlertCircle size={24} />,
            },
            {
              label: "Successful Rescues",
              value: reports.filter((r) => r.status === "rescued").length,
              color: "#22c55e",
              icon: <Heart size={24} />,
            },
            {
              label: "Adopted Homes",
              value: reports.filter((r) => r.status === "adopted").length,
              color: "#ec4899",
              icon: <Home size={24} />,
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "var(--bg-card)",
                borderRadius: "28px",
                padding: "2rem",
                border: `1px solid ${s.color}20`,
                transition: "transform 0.3s ease",
              }}
            >
              <div style={{ color: s.color, marginBottom: "15px" }}>
                {s.icon}
              </div>
              <div
                style={{
                  fontSize: "2.8rem",
                  fontWeight: 900,
                  color: s.color,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  opacity: 0.5,
                  fontWeight: 800,
                  marginTop: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* FEED SECTION */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Zap size={32} color="#f59e0b" fill="#f59e0b" />
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 900,
                margin: 0,
                letterSpacing: "-1px",
              }}
            >
              Activity Feed
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: "3rem",
          }}
        >
          {reports.map((report) => (
            <div
              key={report._id}
              style={{
                background: "var(--bg-card)",
                borderRadius: "35px",
                overflow: "hidden",
                border: "1px solid var(--border)",
                position: "relative",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "25px",
                  left: "25px",
                  zIndex: 10,
                }}
              >
                <span
                  style={{
                    padding: "10px 20px",
                    borderRadius: "100px",
                    fontSize: "0.8rem",
                    fontWeight: 900,
                    background: STATUS_COLORS[report.status] || "#6b7280",
                    color: "#fff",
                    textTransform: "uppercase",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  {report.status}
                </span>
              </div>
              <img
                src={report.photo}
                style={{ width: "100%", height: "280px", objectFit: "cover" }}
                alt="animal"
              />
              <div style={{ padding: "2.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "15px",
                  }}
                >
                  <h3
                    style={{ fontWeight: 900, fontSize: "1.6rem", margin: 0 }}
                  >
                    {SPECIES_EMOJIS[report.animalType] || "🐾"}{" "}
                    {report.animalType?.toUpperCase()}
                  </h3>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      padding: "8px",
                      borderRadius: "12px",
                    }}
                  >
                    <Info size={18} opacity={0.4} />
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "1.1rem",
                    opacity: 0.6,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <MapPin size={20} color="#f59e0b" /> {report.location}
                </p>

                {report.aiAdvice && (
                  <div
                    style={{
                      background: "rgba(34,197,94,0.08)",
                      border: "1px solid #22c55e30",
                      borderRadius: "20px",
                      padding: "1.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#16a34a",
                        fontWeight: 900,
                        margin: "0 0 10px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      🤖 AI Vet Intelligence
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                        margin: 0,
                        lineHeight: 1.6,
                        opacity: 0.9,
                      }}
                    >
                      {report.aiAdvice}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ FLOATING ACTION BUTTON - PERFECTLY CENTERED ICON */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "50px",
          right: "50px",
          background: "linear-gradient(135deg, #f59e0b, #d97706)",
          color: "white",
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 20px 40px rgba(245,158,11,0.5)",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        <Plus size={55} strokeWidth={3} />
      </button>

      {/* EMERGENCY MODAL - HEAVY UI */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5000,
            backdropFilter: "blur(25px)",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "45px",
              padding: "50px",
              width: "100%",
              maxWidth: "650px",
              maxHeight: "92vh",
              overflowY: "auto",
              border: "1px solid var(--border)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "40px",
              }}
            >
              <h2
                style={{
                  fontSize: "2.8rem",
                  fontWeight: 900,
                  margin: 0,
                  letterSpacing: "-2px",
                }}
              >
                🚨 Broadcast Alert
              </h2>
              <X
                onClick={() => setShowModal(false)}
                style={{ cursor: "pointer", opacity: 0.3 }}
                size={35}
              />
            </div>

            <div
              onClick={() => fileInputRef.current.click()}
              style={{
                height: "260px",
                border: "4px dashed var(--border)",
                borderRadius: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                background: "rgba(255,255,255,0.02)",
                marginBottom: "35px",
                overflow: "hidden",
              }}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ textAlign: "center", opacity: 0.3 }}>
                  <Camera size={70} />
                  <p
                    style={{
                      fontWeight: 800,
                      marginTop: "20px",
                      fontSize: "1.2rem",
                    }}
                  >
                    TAP TO SCAN ANIMAL 📸
                  </p>
                </div>
              )}
            </div>

            {/* INSTANT CAMERA FOR MOBILE */}
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              capture="environment"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPhotoPreview(URL.createObjectURL(file));
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => setPhotoBase64(reader.result);
                }
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              <button
                onClick={getLiveLocation}
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "20px",
                  borderRadius: "100px",
                  border: "none",
                  fontWeight: "900",
                  fontSize: "1.1rem",
                }}
              >
                📍 GPS Lock
              </button>
              <button
                onClick={handleAiAnalysis}
                disabled={isAiLoading || !photoBase64}
                style={{
                  background: "#10b981",
                  color: "white",
                  padding: "20px",
                  borderRadius: "100px",
                  border: "none",
                  fontWeight: "900",
                  fontSize: "1.1rem",
                }}
              >
                {isAiLoading ? "Processing..." : "✨ AI Scan"}
              </button>
            </div>

            {/* AI DIAGNOSIS BOX - RESTORED FULL STYLE */}
            {aiAdvice && (
              <div
                style={{
                  background: "rgba(34,197,94,0.15)",
                  border: "2.5px solid #22c55e",
                  borderRadius: "30px",
                  padding: "25px",
                  marginBottom: "30px",
                  animation: "slideUp 0.5s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <ShieldCheck color="#22c55e" size={28} />
                  <p
                    style={{
                      color: "#22c55e",
                      fontWeight: 900,
                      margin: 0,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    AI VET DETECTED: {aiDetectedSpecies}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "1.1rem",
                    margin: "0 0 20px",
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  {aiAdvice}
                </p>
                <div
                  style={{
                    background: "rgba(59,130,246,0.2)",
                    padding: "20px",
                    borderRadius: "20px",
                    border: "1px solid #3b82f6",
                  }}
                >
                  <p
                    style={{
                      color: "#3b82f6",
                      fontWeight: 900,
                      margin: "0 0 8px",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                    }}
                  >
                    💊 Emergency Medication / First Aid
                  </p>
                  <p
                    style={{ fontSize: "1.05rem", margin: 0, fontWeight: 600 }}
                  >
                    {aiMeds}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "1.5rem",
                    borderRadius: "22px",
                    background: "rgba(255,255,255,0.04)",
                    color: "white",
                    border: "1px solid var(--border)",
                    fontSize: "1.1rem",
                  }}
                  placeholder="📍 Exact Location / Landmark"
                />
              </div>
              <div style={{ marginBottom: "35px" }}>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "1.5rem",
                    borderRadius: "22px",
                    background: "rgba(255,255,255,0.04)",
                    color: "white",
                    border: "1px solid var(--border)",
                    fontSize: "1.1rem",
                    minHeight: "120px",
                    resize: "none",
                  }}
                  placeholder="Extra details (e.g., Heavy bleeding, can't walk...)"
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#f59e0b",
                  color: "white",
                  padding: "1.6rem",
                  borderRadius: "100px",
                  border: "none",
                  fontWeight: "900",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  boxShadow: "0 15px 40px rgba(245,158,11,0.4)",
                }}
              >
                SEND HELP NOW 🐾
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
