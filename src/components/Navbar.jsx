import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useClerk } from '@clerk/clerk-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    dispatch({ type: 'auth/logout' });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getRoleLabel = (role) => {
    if (!role) return 'USER';
    const r = role.toLowerCase();
    if (r === 'admin') return 'ADMIN';
    if (r === 'goi' || r === 'government' || r === 'gov') return 'GOI';
    if (r === 'ngo') return 'NGO';
    return 'USER';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/50 backdrop-blur-xl border-b border-zinc-800/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-white flex items-center gap-2">
          <span className="text-orange-500">⚡</span> PawAlert
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/dashboard" className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition">Dashboard</Link>
          <Link to="/support" className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition">Support</Link>
          {user ? (
            <div className="flex items-center gap-4 border-l border-zinc-800 pl-8">
              <span className="text-[10px] bg-orange-500/10 text-orange-500 px-2 py-1 rounded font-black uppercase">{getRoleLabel(user.role)}</span>
              <button onClick={handleLogout} className="bg-orange-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
