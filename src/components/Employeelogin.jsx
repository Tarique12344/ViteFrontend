// src/components/EmployeeLogin.jsx

import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/homepage.css';

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch(`${baseURL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        // ✅ Store isAdmin in localStorage to allow NavBar to reflect admin status
        localStorage.setItem('isAdmin', data.isAdmin ? 'true' : 'false');

        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Network error during login');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      {/* Banner */}
      <header>
        <div className="banner">Simple Pets</div>
      </header>

      {/* Navbar */}
      <NavBar />

      {/* Employee Login Form */}
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <h2>🔐 Employee Login</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#555' }}>
          Employees can login here
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            autoComplete="username"
            className="form-control my-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            autoComplete="current-password"
            className="form-control my-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
           <p className="mt-3 text-center"> 
           
          Not an Employee? <a href="/login">Login Here</a>
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EmployeeLogin;
