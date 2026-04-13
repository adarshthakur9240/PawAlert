import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { logout } from "../store/authSlice.js";
import { Zap, Sun, Moon, Heart } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Debugging: Console mein check kar ki Navbar load hua ya nahi
  useEffect(() => {
    console.log("🚀 Navbar Rendered! Current Theme:", theme);
    console.log("👤 User Data:", user);
  }, [theme, user]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDashboard = location.pathname === "/dashboard";
  const shouldShowSolid = isScrolled || isDashboard;

  return (
    <nav
      style={{
        zIndex: 9999999, // Force over everything
        position: "fixed", // Force position
        top: 0,
        left: 0,
        width: "100%",
      }}
      className={`flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        shouldShowSolid
          ? "bg-white dark:bg-[#020617] border-b border-gray-200 dark:border-white/10 shadow-2xl py-3"
          : "bg-transparent py-6"
      }`}
    >
      {/* 🐾 Left Section */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <Zap size={28} className="text-orange-500 fill-orange-500" />
          <span
            className={`text-2xl font-extrabold tracking-tighter ${shouldShowSolid ? "text-gray-900 dark:text-white" : "text-white"}`}
          >
            PawAlert
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 border-l border-gray-500/20 pl-6">
          <Link
            to="/dashboard"
            className={`font-extrabold text-xs uppercase tracking-widest ${shouldShowSolid ? "text-gray-700 dark:text-gray-300" : "text-white"}`}
          >
            Dashboard
          </Link>
          <Link
            to="/support"
            className="flex items-center gap-1.5 font-extrabold text-xs uppercase tracking-widest text-orange-500 hover:scale-105 transition-transform"
          >
            <Heart size={14} fill="currentColor" /> Donate
          </Link>
        </div>
      </div>

      {/* 👤 Right Section */}
      <div className="flex items-center gap-4">
        {/* Role & Name (Only if logged in) */}
        {user && (
          <div className="hidden sm:flex flex-col items-end leading-none mr-2">
            <span
              className={`text-[9px] font-extrabold px-2 py-0.5 rounded border border-orange-500/30 text-orange-500 bg-orange-500/10 uppercase tracking-tighter mb-1`}
            >
              {user.role || "ADMIN"}
            </span>
            <p
              className={`text-xs font-extrabold ${shouldShowSolid ? "text-gray-900 dark:text-white" : "text-white"}`}
            >
              {user.name}
            </p>
          </div>
        )}

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 hover:bg-white/10 rounded-full transition-all"
        >
          {theme === "dark" ? (
            <Sun className="text-orange-500" size={24} />
          ) : (
            <Moon
              className={
                shouldShowSolid ? "text-gray-800 dark:text-white" : "text-white"
              }
              size={24}
            />
          )}
        </button>

        {user ? (
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-extrabold text-[11px] uppercase transition-all shadow-lg active:scale-95"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-orange-600 text-white px-8 py-2.5 rounded-full font-extrabold text-xs uppercase hover:bg-orange-700 transition-all"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
