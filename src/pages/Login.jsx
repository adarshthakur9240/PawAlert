import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Attempting Login for:", email);
    
    // Yahan hum temporarily bypass kar rahe hain taaki tera kaam na ruke
    // Baad mein isme asali API call (axios.post) daal denge
    if(email && password) {
       localStorage.setItem('user', JSON.stringify({ email, name: 'Adarsh Thakur', role: 'admin' }));
       navigate('/dashboard');
    } else {
       alert("Please enter valid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Geist',sans-serif]">
      <Navbar />
      <div className="flex items-center justify-center px-6 pt-32 pb-12">
        <div className="w-full max-w-[450px] bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tighter mb-2">Login to Mission 🐾</h2>
            <p className="text-zinc-500 font-medium">Welcome back, savior! Enter your details.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-zinc-400 text-xs font-black uppercase tracking-widest mb-3">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 transition-all shadow-inner"
                placeholder="savior@pawalert.com"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-black uppercase tracking-widest mb-3">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 transition-all shadow-inner"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-orange-500 py-5 rounded-2xl text-black font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(249,115,22,0.2)]">
              Login to Mission
            </button>
          </form>

          <p className="mt-10 text-center text-zinc-500 text-sm font-medium">
            Don't have an account? <Link to="/register" className="text-orange-500 font-bold hover:underline">Join the Tribe</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
