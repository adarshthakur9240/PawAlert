import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useClerk } from '@clerk/clerk-react';

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
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '90px', background: 'rgba(8, 8, 8, 0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px', zIndex: 10000 }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none' }}>
        <img src="/logo.png" alt="Logo" style={{ height: '50px' }} />
        <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px' }}>PawAlert</span>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>Dashboard</Link>
        <Link to="/support" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>Support</Link>
        {token ? (
          <button onClick={handleLogout} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '50px', fontWeight: 800, cursor: 'pointer' }}>Logout</button>
        ) : (
          <Link to="/login" style={{ background: '#fff', color: '#000', padding: '12px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 800 }}>Login</Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
