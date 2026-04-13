import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Phone, User, ShieldCheck } from "lucide-react";
import api from "../configs/api.js";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    password: "", confirm: "", city: "", role: "citizen"
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error("Passwords don't match!");
    setLoading(true);
    try {
      await api.post("/api/auth/register", {
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        city: form.city,
        role: form.role,
      });
      toast.success("Account created! Please login 🐾");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-['Inter']">
      <div className="w-full max-w-lg rounded-[2.5rem] bg-[#0a0a0a] border border-zinc-800 p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 blur-[80px]"></div>
        <h1 className="mb-2 text-center text-4xl font-extrabold text-white tracking-tight">Join the Tribe</h1>
        <p className="mb-8 text-center text-zinc-400 text-sm font-medium">Create your profile to start saving lives.</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-zinc-500" size={18} />
              <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange}
                className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-5 text-white placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none" required />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 text-zinc-500" size={18} />
              <input name="phone" type="tel" placeholder="Mobile Number" value={form.phone} onChange={handleChange}
                className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-5 text-white placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none" />
            </div>
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-zinc-500" size={18} />
            <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange}
              className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-5 text-white placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-zinc-500" size={18} />
              <input name="password" type={showPass ? "text" : "password"} placeholder="Password" value={form.password} onChange={handleChange}
                className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-12 text-white placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none" required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3.5 text-zinc-500 hover:text-white">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-3.5 text-zinc-500" size={18} />
              <input name="confirm" type="password" placeholder="Confirm Password" value={form.confirm} onChange={handleChange}
                className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-5 text-white placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none" required />
            </div>
          </div>

          <input name="city" type="text" placeholder="Your City" value={form.city} onChange={handleChange}
            className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 text-white placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none" />

          <select name="role" value={form.role} onChange={handleChange}
            className="py-3.5 w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 text-zinc-300 focus:ring-2 focus:ring-orange-500/50 focus:outline-none cursor-pointer">
            <option value="citizen">I am a Citizen 👤</option>
            <option value="ngo">Representing an NGO 🏠</option>
            <option value="government">Government Official 🇮🇳</option>
          </select>

          <button type="submit" disabled={loading}
            className="py-4 mt-4 font-extrabold w-full rounded-2xl bg-orange-500 text-black text-lg shadow-[0_10px_30px_rgba(249,115,22,0.2)] hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50">
            {loading ? "Creating account..." : "Join Tribe 🐾"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Already a savior?{" "}
          <Link to="/login" className="text-orange-500 font-extrabold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
