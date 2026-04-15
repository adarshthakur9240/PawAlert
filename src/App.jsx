import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
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

  useEffect(() => {
    const pageTitles = {
      "/": "PawAlert | India's Animal Rescue Network",
      "/dashboard": "PawAlert | Dashboard",
      "/login": "PawAlert | Login",
      "/register": "PawAlert | Join the Mission",
    };
    document.title = pageTitles[location.pathname] || "PawAlert";
    setProgress(30);
    const timer = setTimeout(() => setProgress(100), 200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const hideNavbarRoutes = ["/login", "/register"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);
  const hideFooterRoutes = ["/login", "/register", "/dashboard"];
  const showFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white">
      <LoadingBar color="#f97316" progress={progress} height={3} />
      
      {showNavbar && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Dashboard Route */}
          <Route path="/dashboard" element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            </>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      <AppDownload />
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
