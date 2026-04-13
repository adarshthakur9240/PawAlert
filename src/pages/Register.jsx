import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  User,
  ShieldCheck,
  Github,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Welcome to the Tribe! Redirecting...");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-['Inter']">
      <div className="w-full max-w-lg rounded-[2.5rem] bg-[#0a0a0a] border border-zinc-800 p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 blur-[80px]"></div>

        <h1 className="mb-2 text-center text-4xl font-black text-white tracking-tight">
          Join the Tribe
        </h1>
        <p className="mb-8 text-center text-zinc-500 text-sm font-medium">
          Create your profile to start saving lives.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User
                className="absolute left-4 top-3.5 text-zinc-600"
                size={18}
              />
              <input
                type="text"
                placeholder="Full Name"
                className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-5 text-white focus:ring-2 focus:ring-orange-500/50 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <Phone
                className="absolute left-4 top-3.5 text-zinc-600"
                size={18}
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-24 text-white focus:ring-2 focus:ring-orange-500/50 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setOtpSent(true)}
                className="absolute right-2 top-2 bg-orange-500/20 text-orange-500 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-orange-500 hover:text-black transition-all"
              >
                SEND OTP
              </button>
            </div>
          </div>

          {otpSent && (
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="py-3.5 w-full rounded-2xl border border-orange-500/30 bg-orange-500/5 px-5 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none animate-pulse"
            />
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-zinc-600" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-5 text-white focus:ring-2 focus:ring-orange-500/50 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Lock
                className="absolute left-4 top-3.5 text-zinc-600"
                size={18}
              />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-12 text-white focus:ring-2 focus:ring-orange-500/50 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-3.5 text-zinc-600 hover:text-white"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative">
              <ShieldCheck
                className="absolute left-4 top-3.5 text-zinc-600"
                size={18}
              />
              <input
                type="password"
                placeholder="Confirm"
                className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-5 text-white focus:ring-2 focus:ring-orange-500/50 focus:outline-none"
                required
              />
            </div>
          </div>

          <select className="appearance-none py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 text-zinc-400 focus:ring-2 focus:ring-orange-500/50 focus:outline-none cursor-pointer">
            <option value="citizen">I am a Citizen 👤</option>
            <option value="ngo">Representing an NGO 🏠</option>
            <option value="gov">Government Official 🇮🇳</option>
          </select>

          <button
            type="submit"
            className="py-4 mt-4 font-bold w-full rounded-2xl bg-orange-500 text-black text-lg shadow-[0_10px_30px_rgba(249,115,22,0.2)]"
          >
            Join Tribe 🐾
          </button>
        </form>

        <div className="relative my-8 text-center">
          <span className="relative z-10 bg-[#0a0a0a] px-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
            Or Register with
          </span>
          <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-zinc-800/50"></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            className="flex py-3 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C20.187 1.44 17.4 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
          </button>
          <button
            type="button"
            className="flex py-3 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <Github size={20} />
          </button>
          <button
            type="button"
            className="flex py-3 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 384 512"
              fill="currentColor"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-82.3-20.8C62.9 140.3 0 193.8 0 287.4c0 54.2 21.4 108.7 53.9 154.2 34.7 48.6 77.3 102.6 130 102.6 49.9 0 63.9-32.2 124.9-32.2 59.9 0 71.3 32.2 124.9 32.2 54 0 91.1-48.1 124.8-97.4 39.1-57 54.4-112.1 54.9-115.1-1.1-.4-105-40.2-105.1-163zM216 33.8C248.6-5 312.1-.9 312.1-.9S313.9 54 285.9 87.6c-26.7 31.4-78.2 33.8-78.2 33.8s-9.1-51.4 8.3-87.6z" />
            </svg>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already a savior?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-bold hover:underline transition-all"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
