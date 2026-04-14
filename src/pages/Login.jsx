import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic yahan aayega
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4">
      <div className="max-w-md w-full bg-[#0a0a0a] border border-zinc-800 p-8 rounded-[2rem] shadow-2xl">
        <h2 className="text-3xl font-black text-white mb-2 font-outfit">Login to Mission 🐾</h2>
        <p className="text-zinc-500 mb-8 font-medium">Welcome back, savior! Enter your details.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-zinc-400 text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="savior@pawalert.com"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 py-4 rounded-xl text-black font-black uppercase tracking-wider hover:scale-[1.02] transition-transform">
            Login to Mission
          </button>
        </form>
        <p className="mt-8 text-center text-zinc-500 text-sm">
          Don&apos;t have an account? <Link to="/register" className="text-orange-500 font-bold">Join the Tribe</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
