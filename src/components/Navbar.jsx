import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useClerk } from '@clerk/clerk-react';
import { LogOut, LayoutDashboard, LifeBuoy, Heart } from 'lucide-react';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { signOut } = useClerk();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    dispatch({ type: 'auth/logout' });
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '80px',
      background: 'rgba(10, 10, 10, 0.9)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid #222', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 40px', zIndex: 10000
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{ background: '#f59e0b', padding: '8px', borderRadius: '12px' }}>
          <Heart size={24} color="white" fill="white" />
        </div>
        <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white' }}>PawAlert</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Dashboard</Link>
        <Link to="/support" style={{ color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Support</Link>

        {token ? (
          <button onClick={handleLogout} style={{
            background: '#ef4444', color: 'white', border: 'none',
            padding: '8px 18px', borderRadius: '50px', fontWeight: 800,
            cursor: 'pointer', fontSize: '0.85rem'
          }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{
            background: 'white', color: 'black', padding: '8px 20px',
            borderRadius: '50px', textDecoration: 'none', fontWeight: 800, fontSize: '0.85rem'
          }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
