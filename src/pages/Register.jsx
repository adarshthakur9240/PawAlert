import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setAuth } from "../store/authSlice.js";
import api from "../configs/api.js";
import toast from "react-hot-toast";
import { MapPin, Mail, Lock, User, Phone, Briefcase } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
    phone: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔥 Auto Detect Location (City & Pincode)
  const detectLocation = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        );
        const data = await res.json();
        setForm((prev) => ({
          ...prev,
          city:
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "",
          pincode: data.address.postcode || "",
        }));
        toast.success("Location detected! 📍");
      } catch (err) {
        toast.error("City detect nahi ho payi, manual daal do.");
      } finally {
        setIsLocating(false);
      }
    });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", form);
      dispatch(setAuth(data));
      toast.success("Welcome to PawAlert Tribe! 🐾");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration fail!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[var(--bg-main)] font-['Inter']">
      {/* 🖼️ Left Side: PawAlert Branding Image */}
      <div className="hidden lg:flex w-1/2 bg-[var(--bg-nav)] relative items-center justify-center overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          src="https://images.unsplash.com/photo-1548199973-03c40e7c69e0?auto=format&fit=crop&q=80" // Placeholder for rescue dog
          alt="PawAlert Rescue"
        />
        <div className="relative z-10 text-center p-10">
          <h1 className="text-6xl font-black text-white playfair">PawAlert</h1>
          <p className="text-white/80 mt-4 text-xl">
            Connecting Noida's Saviors for a Safer Street Life.
          </p>
        </div>
      </div>

      {/* 📝 Right Side: Professional Sign Up Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md flex flex-col gap-4"
        >
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold text-[var(--text-main)] poppins">
              Create Account
            </h2>
            <p className="text-[var(--text-sub)] mt-2">
              Join the mission to protect stray animals.
            </p>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <User
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />
              <input
                name="name"
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="pl-11 w-full h-12 rounded-full border border-[var(--border)] bg-transparent outline-none focus:border-[var(--amber)]"
              />
            </div>
            <div className="relative">
              <Phone
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />
              <input
                name="phone"
                onChange={handleChange}
                placeholder="Phone"
                className="pl-11 w-full h-12 rounded-full border border-[var(--border)] bg-transparent outline-none focus:border-[var(--amber)]"
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="pl-11 w-full h-12 rounded-full border border-[var(--border)] bg-transparent outline-none focus:border-[var(--amber)]"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="pl-11 w-full h-12 rounded-full border border-[var(--border)] bg-transparent outline-none focus:border-[var(--amber)]"
            />
          </div>

          {/* Location Detection (Auto City/Pincode) */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="pl-11 w-full h-12 rounded-full border border-[var(--border)] bg-transparent outline-none focus:border-[var(--amber)]"
              />
            </div>
            <button
              type="button"
              onClick={detectLocation}
              className="px-4 bg-[var(--amber)] text-white rounded-full text-sm font-bold"
            >
              {isLocating ? "..." : "Auto"}
            </button>
          </div>

          {/* Role Selection (Access control Logic) */}
          <div className="relative">
            <Briefcase
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="pl-11 w-full h-12 rounded-full border border-[var(--border)] bg-transparent outline-none focus:border-[var(--amber)] appearance-none cursor-pointer"
            >
              <option value="citizen">I am a Citizen 🙋‍♂️</option>
              <option value="ngo">I represent an NGO 🏥</option>
              <option value="government">Government Authority 👮</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[var(--amber)] text-white rounded-full font-black text-lg shadow-lg hover:opacity-90 transition-all mt-4"
          >
            {loading ? "Registering..." : "Join Tribe 🐾"}
          </button>

          <p className="text-center text-[var(--text-sub)] text-sm mt-4">
            Already a savior?{" "}
            <Link
              to="/login"
              className="text-[var(--amber)] font-bold underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
