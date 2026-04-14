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
      const { data } = await api.post('/api/auth/login', { email, password });
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
    <div className="min-h-screen bg-[#050505] text-white font-['Geist',sans-serif]">
      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
      <div className="flex items-center justify-center px-6 min-h-screen">
        <div className="w-full max-w-[450px] bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
          <div className="mb-10 text-center">
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🐾</div>
            <h2 className="text-4xl font-black tracking-tighter mb-2">Login to Mission</h2>
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
            <div style={{ position: 'relative' }}>
              <label className="block text-zinc-400 text-xs font-black uppercase tracking-widest mb-3">Password</label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 transition-all shadow-inner"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '16px', bottom: '16px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 py-5 rounded-2xl text-black font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(249,115,22,0.2)]"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? (
                <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Logging in...</>
              ) : (
                'Login to Mission 🐾'
              )}
            </button>
          </form>
          <p className="mt-10 text-center text-zinc-500 text-sm font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-500 font-bold hover:underline">Join the Tribe</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
