import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/authSlice.js";
import api from "./configs/api.js";
import LoadingBar from "react-top-loading-bar";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Support from "./pages/Support.jsx";
import Footer from "./components/Footer.jsx";
import AppDownload from "./components/AppDownload.jsx";

const App = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // Clerk user → Backend sync → JWT token
  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && clerkUser && !token) {
        try {
          const { data } = await api.post("/api/auth/clerk-sync", {
            email: clerkUser.primaryEmailAddress?.emailAddress,
            name: clerkUser.fullName || clerkUser.firstName,
            clerkId: clerkUser.id,
          });
          if (data.token) {
            dispatch(login({ user: data.user, token: data.token }));
          }
        } catch (err) {
          console.error("Sync failed:", err);
        }
      }
    };
    if (isLoaded) syncUser();
  }, [isSignedIn, clerkUser, isLoaded, token]);

  useEffect(() => {
    const pageTitles = {
      "/": "PawAlert | Home",
      "/dashboard": "PawAlert | Dashboard",
      "/login": "PawAlert | Login",
      "/register": "PawAlert | Join the Mission",
      "/support": "PawAlert | Support",
    };
    // Agar URL /login/verify-email ho jaye toh title tutega nahi
    const currentTitle = Object.keys(pageTitles).find(
      (key) => location.pathname.startsWith(key) && key !== "/",
    );
    document.title = currentTitle ? pageTitles[currentTitle] : pageTitles["/"];

    setProgress(30);
    const t = setTimeout(() => setProgress(100), 200);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Fix: StartsWith taaki /register/verify-email par footer na dikhe
  const hideFooterRoutes = ["/login", "/register", "/dashboard"];
  const showFooter = !hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  if (!isLoaded)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "#f59e0b", fontSize: "2rem" }}>🐾</div>
      </div>
    );

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#fff" }}>
      <LoadingBar
        color="#f97316"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={3}
        containerStyle={{ zIndex: 1000000, position: "fixed", top: 0 }}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Fix: Added wildcards /* for Clerk OTP routes */}
          <Route path="/login/*" element={<Login />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/terms" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {location.pathname === "/" && <AppDownload />}
      {showFooter && <Footer />}
    </div>
  );
};
export default App;
