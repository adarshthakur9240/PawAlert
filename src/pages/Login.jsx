import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice.js";
import api from "../configs/api.js";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      dispatch(setAuth(data));
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
      toast.success("Welcome back! 🐾");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] font-['Inter']">
      {/* LEFT SIDE IMAGE */}
      <div className="w-full hidden md:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <img
          className="h-full w-full object-cover grayscale-[0.3] contrast-125"
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
          alt="Animal Rescue Theme"
        />
        <div className="absolute bottom-12 left-12 z-20">
          <h1 className="text-6xl font-black text-white leading-tight font-serif">
            PAW<br />
            <span className="text-orange-500">ALERT</span>
          </h1>
          <p className="text-zinc-300 mt-4 max-w-sm font-medium italic">
            "Because every life on the street deserves a savior."
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full flex flex-col items-center justify-center p-8 lg:p-16">
        <form onSubmit={handleLogin} className="w-full max-w-[400px] flex flex-col">
          <h2 className="text-4xl text-white font-black tracking-tighter">Sign in</h2>
          <p className="text-zinc-400 mt-3 font-medium text-sm">
            Welcome back, Savior! Rescue missions await.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button type="button" className="flex items-center justify-center h-14 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all gap-2">
              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="google" className="w-5" />
              <span className="text-white text-sm font-bold">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center h-14 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all gap-2">
              <svg width="20" height="20" viewBox="0 0 384 512" fill="white">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-82.3-20.8C62.9 140.3 0 193.8 0 287.4c0 54.2 21.4 108.7 53.9 154.2 34.7 48.6 77.3 102.6 130 102.6 49.9 0 63.9-32.2 124.9-32.2 59.9 0 71.3 32.2 124.9 32.2 54 0 91.1-48.1 124.8-97.4 39.1-57 54.4-112.1 54.9-115.1-1.1-.4-105-40.2-105.1-163zM216 33.8C248.6-5 312.1-.9 312.1-.9S313.9 54 285.9 87.6c-26.7 31.4-78.2 33.8-78.2 33.8s-9.1-51.4 8.3-87.6z" />
              </svg>
              <span className="text-white text-sm font-bold">Apple</span>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full my-8">
            <div className="flex-1 h-px bg-zinc-800"></div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest text-nowrap">Or login with email</p>
            <div className="flex-1 h-px bg-zinc-800"></div>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 h-14 rounded-2xl px-6 text-white placeholder-zinc-500 outline-none focus:border-orange-500/50 transition-all font-medium"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 h-14 rounded-2xl px-6 text-white placeholder-zinc-500 outline-none focus:border-orange-500/50 transition-all font-medium"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-orange-500 rounded"
              />
              <span className="text-zinc-400 text-sm">Remember me</span>
            </label>
            <button type="button" className="text-orange-500 text-sm font-bold hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-14 rounded-2xl text-black bg-orange-500 font-black text-lg shadow-[0_10px_40px_rgba(249,115,22,0.2)] hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login to Mission 🐾"}
          </button>

          <p className="text-zinc-400 text-sm mt-6 text-center font-medium">
            Don't have an account?{" "}
            <Link className="text-orange-500 font-bold hover:underline ml-1" to="/register">
              Join the Tribe
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
