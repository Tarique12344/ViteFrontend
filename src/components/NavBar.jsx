// src/components/NavBar.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/homepage.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

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

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <nav className="pet-navbar">
      <div className="nav-links">
        <Link to="/">🏠 Home</Link>
        <Link to="/about">🐶 About</Link>
        <Link to="/shop">🛒 Adoption</Link>
        <Link to="/contact">📞 Contact</Link>

        {isLoggedIn && isAdmin && (
          <div className="dropdown">
            <button className="dropbtn">👑 Admin ▾</button>
            <div className="dropdown-content">
              <Link to="/add-pet">➕ Add Pet</Link>
              <Link to="/admin/adoptions">📦 Manage Adoptions</Link>
              <Link to="/admin/requests">📝 View Requests</Link>
            </div>
          </div>
        )}

        {isLoggedIn ? (
          <span onClick={handleLogout}>🚪 Logout {isAdmin && '👑'}</span>
        ) : (
          <Link to="/login">🔑 Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
