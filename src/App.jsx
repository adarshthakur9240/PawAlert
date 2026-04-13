import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import AppDownload from "./components/AppDownload.jsx";

const App = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  // 1. 🏷️ DYNAMIC TITLE & PROGRESS LOGIC
  useEffect(() => {
    // Page Title Logic
    const pageTitles = {
      "/": "PawAlert | Home",
      "/dashboard": "PawAlert | Dashboard",
      "/login": "PawAlert | Login",
      "/register": "PawAlert | Join the Mission",
      "/support": "PawAlert | Support Us",
    };

    document.title =
      pageTitles[location.pathname] || "PawAlert - Stray Animal Rescue";

    // 🚀 PROGRESS BAR TRIGGER
    // Jab bhi route change ho, pehle bar ko start karo
    setProgress(30);

    // Thoda delay taaki transition smoothly dikhe
    const timer = setTimeout(() => {
      setProgress(100);
    }, 200);

    return () => clearTimeout(timer); // Cleanup timer on route unmount
  }, [location.pathname]); // 🔥 location.pathname par nazar rakho

  // Navbar & Footer Display Logic
  const hideNavbarRoutes = ["/login", "/register"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  const hideFooterRoutes = ["/login", "/register", "/dashboard"];
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white">
      {/* 🚀 TOP LOADING BAR - FULLY FIXED */}
      <LoadingBar
        color="#f97316"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={4} // Thoda thickness badhai hai
        shadow={true}
        containerStyle={{ zIndex: 1000000, position: "fixed", top: 0 }} // 🔥 Isse ye hamesha Navbar ke upar dikhega
      />

      {/* GLOBAL NAVBAR */}
      {showNavbar && <Navbar />}

      {/* Main Content Area */}
      <main className="flex-grow pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Fallback & Temporary Routes */}
          <Route path="/privacy" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/terms" element={<Home />} />
          <Route path="/support" element={<Home />} />

          {/* 404: Redirect to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* GLOBAL FOOTER */}
      {location.pathname === "/" && <AppDownload />}
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
