import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useClerk } from '@clerk/clerk-react';
import { LogOut, LayoutDashboard, LifeBuoy } from 'lucide-react';

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
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
      position: 'fixed', top: 0, left: 0, right: 0, height: '85px',
      background: 'rgba(8, 8, 8, 0.95)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid #222', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 50px', zIndex: 10000
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <img src="/logo.png" alt="PawAlert" style={{ height: '45px' }} />
        <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f9f7f2', letterSpacing: '-1.5px' }}>PawAlert</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>Dashboard</Link>
        <Link to="/support" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>Support</Link>

        {token ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ color: '#f59e0b', fontWeight: 800 }}>[{user?.role?.toUpperCase() || 'SAVIOR'}]</span>
            <button onClick={handleLogout} style={{
              background: '#ef4444', color: '#fff', border: 'none',
              padding: '10px 22px', borderRadius: '50px', fontWeight: 800,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={{
            background: '#fff', color: '#000', padding: '12px 30px',
            borderRadius: '50px', textDecoration: 'none', fontWeight: 800
          }}>Login</Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
