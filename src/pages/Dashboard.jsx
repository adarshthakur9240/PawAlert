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
  Activity,
  Zap,
  Heart,
  Home,
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
    return rl === "admin"
      ? "ADMIN"
      : rl === "gov"
        ? "GOI"
        : rl === "ngo"
          ? "NGO"
          : "USER";
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
  }, [isLoaded, isSignedIn, clerkUser, token]);

  useEffect(() => {
    if (token) loadReports();
  }, [token]);
  const loadReports = async () => {
    try {
      const { data } = await api.get("/api/reports");
      setReports(data);
    } catch (e) {}
  };

  const handleAiAnalysis = async () => {
    if (!photoBase64) return toast.error("Photo required!");
    setIsAiLoading(true);
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
      toast.error("AI Error");
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
    } catch (err) {}
  };

  const downloadCertificate = async () => {
    if (rescuedCount < 1) return toast.error("Rescue 1 animal to unlock!");
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
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(`Official_Certificate_${user?.name}.pdf`);
      toast.success("Certificate Secured! 🇮🇳");
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
        {/* Header Section */}
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
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
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
              Saving lives together. You rescued <b>{rescuedCount}</b> animals.
              🇮🇳
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
              l: "Total Reports",
              v: reports.length,
              c: "#3b82f6",
              i: <Activity size={22} />,
            },
            {
              l: "Pending Case",
              v: reports.filter((r) => r.status === "pending").length,
              c: "#ef4444",
              i: <AlertCircle size={22} />,
            },
            {
              l: "Successful Rescues",
              v: reports.filter((r) => r.status === "rescued").length,
              c: "#22c55e",
              i: <Heart size={22} />,
            },
            {
              l: "Adopted Homes",
              v: reports.filter((r) => r.status === "adopted").length,
              c: "#ec4899",
              i: <Home size={22} />,
            },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                background: "#111",
                borderRadius: "24px",
                padding: "2rem",
                border: "1px solid #222",
              }}
            >
              <div style={{ color: s.c, marginBottom: "12px" }}>{s.i}</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: s.c }}>
                {s.v}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
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

        {/* Feed */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {reports.map((r) => (
            <div
              key={r._id}
              style={{
                background: "#111",
                borderRadius: "32px",
                overflow: "hidden",
                border: "1px solid #222",
              }}
            >
              <img
                src={r.photo}
                style={{ width: "100%", height: "240px", objectFit: "cover" }}
              />
              <div style={{ padding: "2rem" }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.4rem" }}>
                  {SPECIES_EMOJIS[r.animalType] || "🐾"}{" "}
                  {r.animalType?.toUpperCase()} ALERT
                </h3>
                <p style={{ opacity: 0.6 }}>
                  <MapPin size={18} color="#f59e0b" /> {r.location}
                </p>
                {r.aiAdvice && (
                  <div
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      padding: "1.2rem",
                      borderRadius: "16px",
                      marginTop: "1rem",
                      border: "1px solid #1a331a",
                      fontSize: "0.9rem",
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

      {/* FAB */}
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
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 15px 35px rgba(245,158,11,0.5)",
        }}
      >
        <Plus size={45} strokeWidth={3} color="white" />
      </button>

      {/* Modal */}
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
            backdropFilter: "blur(15px)",
          }}
        >
          <div
            style={{
              background: "#111",
              width: "100%",
              maxWidth: "550px",
              borderRadius: "35px",
              padding: "40px",
              border: "1px solid #222",
              maxHeight: "90vh",
              overflowY: "auto",
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
                alignItems: "center",
                justifyContent: "center",
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
                  const r = new FileReader();
                  r.readAsDataURL(file);
                  r.onloadend = () => setPhotoBase64(r.result);
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
                  color: "#fff",
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
                  color: "#fff",
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
                  background: "rgba(34,197,94,0.1)",
                  border: "2px solid #22c55e",
                  borderRadius: "20px",
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
                <p style={{ fontSize: "0.95rem" }}>{aiAdvice}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={{
                  width: "100%",
                  padding: "1.2rem",
                  background: "#0a0a0a",
                  border: "1px solid #222",
                  borderRadius: "15px",
                  marginBottom: "15px",
                  color: "#fff",
                }}
                placeholder="Location landmark..."
              />
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "1.2rem",
                  background: "#0a0a0a",
                  border: "1px solid #222",
                  borderRadius: "15px",
                  marginBottom: "25px",
                  color: "#fff",
                  minHeight: "100px",
                }}
                placeholder="Describe injury..."
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#f59e0b",
                  color: "#fff",
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

      {/* ✅ PREMIUM OFFICIAL CERTIFICATE - EXACTLY AS PER SCREENSHOT 2 */}
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
                  letterSpacing: "1px",
                }}
              >
                SCAN TO VERIFY
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <img
                src="/ashok.png"
                style={{
                  width: "65px",
                  marginLeft: "auto",
                  display: "block",
                  marginBottom: "6px",
                }}
                alt="Emblem"
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  margin: 0,
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
