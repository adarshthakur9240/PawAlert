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
  Smartphone,
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

  const [form, setForm] = useState({
    reporterName: "",
    animalType: "dog",
    urgency: "low",
    location: "",
    description: "",
  });

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
    const syncIdentity = async () => {
      if (isLoaded && isSignedIn && clerkUser && !token) {
        try {
          const { data } = await api.post("/api/auth/clerk-sync", {
            email: clerkUser.primaryEmailAddress.emailAddress,
            name: clerkUser.fullName,
            clerkId: clerkUser.id,
            userType: clerkUser.unsafeMetadata?.userType || "citizen",
          });
          if (data.success)
            dispatch({
              type: "auth/loginSuccess",
              payload: { user: data.user, token: data.token },
            });
        } catch (err) {
          console.error("Sync Error");
        }
      }
    };
    syncIdentity();
  }, [isLoaded, isSignedIn, clerkUser, token, dispatch]);

  useEffect(() => {
    if (token) loadReports();
    if (user) setForm((prev) => ({ ...prev, reporterName: user.name }));
  }, [token]);

  const loadReports = async () => {
    try {
      const { data } = await api.get("/api/reports");
      setReports(data);
    } catch (e) {
      toast.error("Fail!");
    }
  };

  const handleAiAnalysis = async () => {
    if (!photoBase64) return toast.error("Capture photo!");
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
      toast.success("AI Scanned!");
    } catch (err) {
      toast.error("AI Fail");
    } finally {
      setIsAiLoading(false);
    }
  };

  const getLiveLocation = () => {
    setIsLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((p) => ({
          ...p,
          location: `Pinned at ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
        }));
        setIsLocationLoading(false);
      },
      () => setIsLocationLoading(false),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/api/reports",
        { ...form, photo: photoBase64, aiAdvice, aiMeds },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShowModal(false);
      loadReports();
      toast.success("Alert Sent!");
    } catch (err) {
      toast.error("Fail!");
    }
  };

  const downloadCertificate = async () => {
    setIsDownloading(true);
    try {
      const el = certificateRef.current;
      el.style.left = "0px";
      el.style.position = "fixed";
      const canvas = await html2canvas(el, { scale: 2, useCORS: true });
      el.style.left = "-9999px";
      el.style.position = "absolute";
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(`Certificate_${user?.name}.pdf`);
      toast.success("Downloaded!");
    } catch (err) {
      toast.error("Error!");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "90px auto 40px",
          padding: "0 20px",
        }}
      >
        {/* Header - Fixed Scale */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, margin: 0 }}>
              Dashboard
            </h1>
            <p style={{ opacity: 0.5, fontSize: "0.9rem" }}>
              Live Command Center
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#111",
              padding: "8px 20px",
              borderRadius: "100px",
              border: "1px solid #222",
            }}
          >
            <div
              style={{
                height: "8px",
                width: "8px",
                borderRadius: "50%",
                background: "#22c55e",
              }}
            ></div>
            <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>
              [{getRoleLabel(user?.role)}] {user?.name}
            </span>
          </div>
        </div>

        {/* Hero Card - Restored Button */}
        <div
          style={{
            background: "#111",
            border: `2px solid ${badge.color}`,
            borderRadius: "24px",
            padding: "2rem",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: `0 20px 40px ${badge.color}10`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "3rem" }}>{badge.icon}</span>
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 900, margin: 0 }}>
                {badge.title}
              </h2>
              <p style={{ opacity: 0.7, margin: "5px 0 0" }}>
                You rescued <b>{rescuedCount}</b> animals.
              </p>
            </div>
          </div>
          <button
            onClick={downloadCertificate}
            style={{
              background: "linear-gradient(45deg, #FF9933, #FFFFFF, #138808)",
              color: "#000080",
              padding: "10px 25px",
              borderRadius: "50px",
              border: "none",
              fontWeight: "900",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {isDownloading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Trophy size={18} /> Recognition
              </>
            )}
          </button>
        </div>

        {/* Stats - Compact Scale */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {[
            {
              l: "Total Alerts",
              v: reports.length,
              c: "#3b82f6",
              i: <Activity size={20} />,
            },
            {
              l: "Pending Case",
              v: reports.filter((r) => r.status === "pending").length,
              c: "#ef4444",
              i: <AlertCircle size={20} />,
            },
            {
              l: "Rescued Lives",
              v: reports.filter((r) => r.status === "rescued").length,
              c: "#22c55e",
              i: <Heart size={20} />,
            },
            {
              l: "Adopted",
              v: reports.filter((r) => r.status === "adopted").length,
              c: "#ec4899",
              i: <Home size={20} />,
            },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                background: "#111",
                borderRadius: "18px",
                padding: "1.5rem",
                border: "1px solid #222",
              }}
            >
              <div style={{ color: s.c, marginBottom: "10px" }}>{s.i}</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: s.c }}>
                {s.v}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  opacity: 0.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Feed Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {reports.map((r) => (
            <div
              key={r._id}
              style={{
                background: "#111",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid #222",
              }}
            >
              <img
                src={r.photo}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                  {SPECIES_EMOJIS[r.animalType] || "🐾"}{" "}
                  {r.animalType?.toUpperCase()}
                </h3>
                <p
                  style={{ opacity: 0.5, fontSize: "0.85rem", margin: "8px 0" }}
                >
                  <MapPin size={14} /> {r.location}
                </p>
                {r.aiAdvice && (
                  <div
                    style={{
                      background: "#051505",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1px solid #1a331a",
                      fontSize: "0.8rem",
                      color: "#4ade80",
                    }}
                  >
                    {r.aiAdvice}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centered FAB */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          background: "#f59e0b",
          color: "#fff",
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          boxShadow: "0 10px 30px rgba(245,158,11,0.4)",
        }}
      >
        <Plus size={35} strokeWidth={3} />
      </button>

      {/* Modal - Fixed Camera & AI Box */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 5000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#111",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "24px",
              padding: "25px",
              border: "1px solid #222",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
                Report Emergency
              </h2>
              <X
                onClick={() => setShowModal(false)}
                style={{ cursor: "pointer", opacity: 0.5 }}
              />
            </div>
            <div
              onClick={() => fileInputRef.current.click()}
              style={{
                height: "180px",
                border: "2px dashed #333",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "#0a0a0a",
                marginBottom: "20px",
                overflow: "hidden",
              }}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Camera size={40} opacity={0.3} />
              )}
            </div>
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
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <button
                onClick={getLiveLocation}
                style={{
                  background: "#3b82f6",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "50px",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                📍 GPS
              </button>
              <button
                onClick={handleAiAnalysis}
                disabled={isAiLoading || !photoBase64}
                style={{
                  background: "#10b981",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "50px",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                {isAiLoading ? "..." : "✨ AI Scan"}
              </button>
            </div>
            {aiAdvice && (
              <div
                style={{
                  background: "#051505",
                  border: "1px solid #1a331a",
                  borderRadius: "15px",
                  padding: "15px",
                  marginBottom: "20px",
                }}
              >
                <p
                  style={{
                    color: "#4ade80",
                    fontWeight: 900,
                    margin: "0 0 5px",
                    fontSize: "0.75rem",
                  }}
                >
                  🤖 AI: {aiDetectedSpecies}
                </p>
                <p style={{ fontSize: "0.8rem", opacity: 0.8 }}>{aiAdvice}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#0a0a0a",
                  border: "1px solid #222",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  color: "#fff",
                }}
                placeholder="Location"
              />
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#0a0a0a",
                  border: "1px solid #222",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  color: "#fff",
                  minHeight: "80px",
                }}
                placeholder="Details"
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#f59e0b",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "50px",
                  border: "none",
                  fontWeight: "900",
                }}
              >
                SUBMIT 🐾
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Certificate UI (Hidden) */}
      <div
        ref={certificateRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "1123px",
          height: "794px",
          background: "white",
          color: "#000",
          textAlign: "center",
          padding: "80px",
        }}
      >
        <img src="/ashok.png" style={{ width: "60px" }} />
        <h1 style={{ fontSize: "60px", margin: "20px 0" }}>CERTIFICATE</h1>
        <h2 style={{ fontSize: "40px", color: "#D4762A" }}>{user?.name}</h2>
        <p style={{ fontSize: "20px" }}>
          For rescuing animals via <b>PawAlert</b>.
        </p>
        <QRCodeSVG
          value={`https://pawalert.in/verify/${user?._id}`}
          size={100}
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
};
export default Dashboard;
