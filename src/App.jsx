import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Support from "./pages/Support.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import AppDownload from "./components/AppDownload.jsx";
const App = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const pageTitles = {
      "/": "PawAlert | Home",
      "/dashboard": "PawAlert | Dashboard",
      "/login": "PawAlert | Login",
      "/register": "PawAlert | Join the Mission",
      "/support": "PawAlert | Support Us",
    };
    document.title = pageTitles[location.pathname] || "PawAlert - Stray Animal Rescue";
    setProgress(30);
    const timer = setTimeout(() => { setProgress(100); }, 200);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  const hideNavbarRoutes = ["/login", "/register"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);
  const hideFooterRoutes = ["/login", "/register", "/dashboard"];
  const showFooter = !hideFooterRoutes.includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white">
      <LoadingBar color="#f97316" progress={progress} onLoaderFinished={() => setProgress(0)} height={4} shadow={true} containerStyle={{ zIndex: 1000000, position: "fixed", top: 0 }} />
      {showNavbar && <Navbar />}
      <main className="flex-grow pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
