import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-['Inter']">
      <div className="w-full max-w-lg rounded-[2.5rem] bg-[#0a0a0a] border border-zinc-800 p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle Orange Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 blur-[80px]"></div>

        <h1 className="mb-2 text-center text-4xl font-black text-white tracking-tight">
          Join the Tribe
        </h1>
        <p className="mb-8 text-center text-zinc-500 text-sm font-medium">
          Create your profile to start saving lives.
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500/50 focus:outline-none transition-all"
            />

            {/* ✅ MOBILE NUMBER FIELD */}
            <input
              type="tel"
              placeholder="Mobile Number"
              className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500/50 focus:outline-none transition-all"
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500/50 focus:outline-none transition-all"
          />

          <input
            type="password"
            placeholder="Create Password"
            className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 text-white placeholder-zinc-600 focus:ring-2 focus:ring-orange-500/50 focus:outline-none transition-all"
          />

          {/* ✅ ROLE SELECTION (Zaruri for Dashboard Logic) */}
          <div className="relative">
            <select className="appearance-none py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 text-zinc-400 focus:ring-2 focus:ring-orange-500/50 focus:outline-none transition-all cursor-pointer">
              <option value="citizen">I am a Citizen 👤</option>
              <option value="ngo">Representing an NGO 🏠</option>
              <option value="gov">Government Official 🇮🇳</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-zinc-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <button className="py-4 mt-4 font-bold w-full rounded-2xl bg-orange-500 text-black text-lg hover:scale-[1.01] active:scale-95 transition-all shadow-[0_10px_30px_rgba(249,115,22,0.2)]">
            Join Tribe 🐾
          </button>
        </form>

        {/* SOCIAL LOGINS */}
        <div className="relative my-8 text-center">
          <span className="relative z-10 bg-[#0a0a0a] px-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
            Or Register with
          </span>
          <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-zinc-800/50"></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className="flex py-3 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white transition-all">
            <i className="fa-brands fa-google text-lg"></i>
          </button>
          <button className="flex py-3 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white transition-all">
            <i className="fa-brands fa-github text-lg"></i>
          </button>
          {/* ✅ APPLE AUTH BUTTON */}
          <button className="flex py-3 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white transition-all">
            <i className="fa-brands fa-apple text-xl"></i>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already a savior?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
