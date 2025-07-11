// src/components/NavBar.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/homepage.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminFlag = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(!!token);
    setIsAdmin(adminFlag);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <nav className={`pet-navbar ${isNavOpen ? 'nav-open' : ''}`}>
      {/* Mobile Toggle */}
      <div
        className="nav-toggle"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        {isNavOpen ? '✖ Close' : '☰ Menu'}
      </div>

      <div className="nav-links">
        <Link to="/">🏠 Home</Link>
        <Link to="/about">🐶 About</Link>
        {isLoggedIn && <Link to="/shop">🛒 Adoption</Link>}
        {isLoggedIn && <Link to="/store">🛍️ Store</Link>}
        {isLoggedIn && <Link to="/cart">🛒 Cart</Link>}
        <Link to="/contact">📞 Contact</Link>

        {isLoggedIn && isAdmin && (
          <div className="dropdown">
            <button className="dropbtn">👑 Admin ▾</button>
            <div className="dropdown-content">
              <Link to="/add-pet">➕ Add Pet</Link>
              <Link to="/storeform">📦 Add Store Item</Link>
            </div>
          </div>
        )}

        {isLoggedIn ? (
          <span
            onClick={handleLogout}
            style={{
              cursor: 'pointer',
              color: '#4b2e2e',
              background: '#88c7e4',
              padding: '10px 20px',
              borderRadius: '20px',
              userSelect: 'none'
            }}
          >
            🚪 Logout {isAdmin && '👑'}
          </span>
        ) : (
          <Link to="/login">🔑 Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
