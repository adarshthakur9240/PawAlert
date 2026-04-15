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

  // Hybrid Identity
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
    const rl = r?.toLowerCase();
    if (rl === "admin") return "ADMIN";
    if (rl === "gov" || rl === "government") return "GOI";
    if (rl === "ngo") return "NGO";
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
    if (user) setForm((prev) => ({ ...prev, reporterName: user.name }));
  }, [token]);

  const loadReports = async () => {
    try {
      const { data } = await api.get("/api/reports");
      setReports(data);
    } catch (e) {
      toast.error("Failed to load feed");
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
      toast.success("AI Scan Complete! ✨");
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
    if (!photoBase64) return toast.error("Photo is required!");
    const loadingToast = toast.loading("Broadcasting Emergency...");
    try {
      const payload = { ...form, photo: photoBase64, aiAdvice, aiMeds };
      await api.post("/api/reports", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Emergency Alert Sent! 🐾", { id: loadingToast });
      setShowModal(false);
      loadReports();
    } catch (err) {
      toast.error("Submission failed!", { id: loadingToast });
    }
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
      await new Promise((r) => setTimeout(r, 1000));
      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      el.style.left = "-9999px";
      el.style.position = "absolute";
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(`Official_Certificate_${user?.name}.pdf`);
      toast.success("Certificate Secured! 🇮🇳");
    } catch (err) {
      toast.error("Download failed!");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "1260px",
          margin: "100px auto 40px",
          padding: "0 20px",
        }}
      >
        {/* Header with Role Branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
          }}
        >
          <div>
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
                fontSize: "3rem",
                fontWeight: 900,
                margin: 0,
                letterSpacing: "-2px",
              }}
            >
              Dashboard
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#111",
              padding: "10px 25px",
              borderRadius: "100px",
              border: "1px solid #222",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 10px #22c55e",
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

        {/* Hero Card */}
        <div
          style={{
            background: "#111",
            border: `2.5px solid ${badge.color}`,
            borderRadius: "32px",
            padding: "3rem",
            marginBottom: "3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: `0 20px 50px ${badge.color}15`,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span style={{ fontSize: "4rem" }}>{badge.icon}</span>
              <h2
                style={{
                  fontSize: "2.8rem",
                  fontWeight: 900,
                  letterSpacing: "-2px",
                }}
              >
                {badge.title}
              </h2>
            </div>
            <p style={{ fontSize: "1.2rem", opacity: 0.8, marginTop: "10px" }}>
              Welcome back Savior. You rescued <b>{rescuedCount}</b> animals. 🇮🇳
            </p>
          </div>
          <button
            onClick={downloadCertificate}
            style={{
              background: "linear-gradient(45deg, #FF9933, #FFFFFF, #138808)",
              color: "#000080",
              padding: "15px 35px",
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
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Trophy size={22} /> Recognition 🇮🇳
              </>
            )}
          </button>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
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
              label: "Rescued Lives",
              value: reports.filter((r) => r.status === "rescued").length,
              color: "#22c55e",
              icon: <Heart size={24} />,
            },
            {
              label: "Adopted",
              value: reports.filter((r) => r.status === "adopted").length,
              color: "#ec4899",
              icon: <Home size={24} />,
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#111",
                borderRadius: "24px",
                padding: "2rem",
                border: "1px solid #222",
              }}
            >
              <div style={{ color: s.color, marginBottom: "12px" }}>
                {s.icon}
              </div>
              <div
                style={{ fontSize: "2.5rem", fontWeight: 900, color: s.color }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  opacity: 0.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {reports.map((report) => (
            <div
              key={report._id}
              style={{
                background: "#111",
                borderRadius: "32px",
                overflow: "hidden",
                border: "1px solid #222",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  zIndex: 10,
                }}
              >
                <span
                  style={{
                    padding: "8px 16px",
                    borderRadius: "100px",
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    background: STATUS_COLORS[report.status] || "#6b7280",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  {report.status}
                </span>
              </div>
              <img
                src={report.photo}
                style={{ width: "100%", height: "240px", objectFit: "cover" }}
                alt="animal"
              />
              <div style={{ padding: "2rem" }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.4rem" }}>
                  {SPECIES_EMOJIS[report.animalType] || "🐾"}{" "}
                  {report.animalType?.toUpperCase()} ALERT
                </h3>
                <p style={{ opacity: 0.6 }}>
                  <MapPin size={18} color="#f59e0b" /> {report.location}
                </p>
                {report.aiAdvice && (
                  <div
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1.5px solid #22c55e30",
                      borderRadius: "16px",
                      padding: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "#16a34a",
                        fontWeight: 800,
                        margin: "0 0 5px",
                      }}
                    >
                      🤖 AI VET ADVICE
                    </p>
                    <p style={{ fontSize: "0.9rem", margin: 0, opacity: 0.9 }}>
                      {report.aiAdvice}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Plus Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          background: "#f59e0b",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 15px 35px rgba(245,158,11,0.5)",
        }}
      >
        <Plus size={45} strokeWidth={3} color="white" />
      </button>

      {/* Emergency Modal */}
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
              background: "#111",
              borderRadius: "35px",
              padding: "40px",
              width: "100%",
              maxWidth: "550px",
              maxHeight: "92vh",
              overflowY: "auto",
              border: "1px solid #222",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900 }}>
                New Emergency
              </h2>
              <X
                onClick={() => setShowModal(false)}
                style={{ cursor: "pointer", opacity: 0.5 }}
                size={30}
              />
            </div>

            <div
              onClick={() => fileInputRef.current.click()}
              style={{
                height: "220px",
                border: "3px dashed #222",
                borderRadius: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                background: "#0a0a0a",
                marginBottom: "25px",
                overflow: "hidden",
              }}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Camera size={50} opacity={0.3} />
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
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              <button
                onClick={getLiveLocation}
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "14px",
                  borderRadius: "100px",
                  border: "none",
                  fontWeight: "900",
                }}
              >
                📍 GPS LOCK
              </button>
              <button
                onClick={handleAiAnalysis}
                disabled={isAiLoading || !photoBase64}
                style={{
                  background: "#10b981",
                  color: "white",
                  padding: "14px",
                  borderRadius: "100px",
                  border: "none",
                  fontWeight: "900",
                }}
              >
                {isAiLoading ? "SCANNING..." : "✨ AI SCAN"}
              </button>
            </div>

            {aiAdvice && (
              <div
                style={{
                  background: "rgba(34,197,94,0.12)",
                  border: "2px solid #22c55e",
                  borderRadius: "24px",
                  padding: "20px",
                  marginBottom: "25px",
                }}
              >
                <p
                  style={{
                    color: "#22c55e",
                    fontWeight: 900,
                    margin: "0 0 5px",
                  }}
                >
                  🤖 AI DETECTED: {aiDetectedSpecies}
                </p>
                <p style={{ fontSize: "1rem", margin: "0 0 15px" }}>
                  {aiAdvice}
                </p>
                <div
                  style={{
                    background: "rgba(59,130,246,0.15)",
                    padding: "15px",
                    borderRadius: "15px",
                    border: "1px solid #3b82f6",
                  }}
                >
                  <p
                    style={{
                      color: "#3b82f6",
                      fontWeight: 900,
                      margin: "0 0 5px",
                      fontSize: "0.8rem",
                    }}
                  >
                    💊 FIRST AID
                  </p>
                  <p style={{ fontSize: "0.95rem", margin: 0 }}>{aiMeds}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={{
                  width: "100%",
                  padding: "1.2rem",
                  borderRadius: "15px",
                  marginBottom: "15px",
                  background: "#0a0a0a",
                  color: "white",
                  border: "1px solid #222",
                }}
                placeholder="📍 Exact Landmark"
              />
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "1.2rem",
                  borderRadius: "15px",
                  marginBottom: "25px",
                  background: "#0a0a0a",
                  color: "white",
                  border: "1px solid #222",
                  minHeight: "100px",
                }}
                placeholder="Describe injury details..."
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#f59e0b",
                  color: "white",
                  padding: "1.2rem",
                  borderRadius: "100px",
                  border: "none",
                  fontWeight: "900",
                }}
              >
                SUBMIT ALERT 🐾
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ PREMIUM OFFICIAL CERTIFICATE - 100% RESTORED */}
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
          color: "#000",
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
                }}
              >
                SCAN TO VERIFY
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <img
                src="/ashok.png"
                style={{ width: "65px", marginLeft: "auto", display: "block" }}
                alt="Emblem"
              />
              <p style={{ fontSize: "16px", fontWeight: 900, margin: 0 }}>
                Ministry of Culture
              </p>
              <p style={{ fontSize: "13px", margin: 0 }}>Government of India</p>
            </div>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <h1
              style={{
                fontSize: "90px",
                fontWeight: 900,
                margin: "0",
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
              }}
            >
              OF APPRECIATION
            </h3>
            <p style={{ fontSize: "18px", color: "#888", fontStyle: "italic" }}>
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
              />
              <div
                style={{
                  height: "2px",
                  background: "#1a1a1a",
                  width: "100%",
                  margin: "4px 0",
                }}
              />
              <p style={{ fontSize: "16px", fontWeight: 900 }}>Adarsh Thakur</p>
              <p style={{ fontSize: "11px", color: "#888", margin: 0 }}>
                Authorized Signatory, PawAlert Network
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
