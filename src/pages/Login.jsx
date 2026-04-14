import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice.js';
import api from '../configs/api.js';
import toast from 'react-hot-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Please fill all fields!');
    setIsLoading(true);
    try {
      // API call to backend (Render)
      const { data } = await api.post('/api/auth/login', { email, password });
      
      // Dispatching to Redux Store
      dispatch(login({ user: data.user, token: data.token }));
      
      toast.success('Welcome back! 🐾');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Geist',sans-serif] selection:bg-orange-500/30">
      <div className="flex items-center justify-center px-6 min-h-screen relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        
        <div className="w-full max-w-[450px] bg-zinc-900/40 border border-zinc-800/50 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl relative z-10">
          <div className="mb-10 text-center">
            <div className="text-5xl mb-4">🐾</div>
            <h2 className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">Login to Mission</h2>
            <p className="text-zinc-500 font-medium text-sm">Welcome back, savior! Enter your details.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-zinc-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all placeholder:text-zinc-800"
                placeholder="savior@pawalert.com"
              />
            </div>

            <div className="space-y-2 relative">
              <label className="block text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-zinc-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all placeholder:text-zinc-800"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 py-5 rounded-2xl text-black font-black uppercase tracking-widest hover:bg-orange-600 active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(249,115,22,0.15)] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <><Loader2 size={20} className="animate-spin" /> Logging in...</>
              ) : (
                'Login to Mission 🐾'
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-zinc-500 text-xs font-bold uppercase tracking-widest">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-500 hover:text-orange-400 transition-colors">Join the Tribe</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
