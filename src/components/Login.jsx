// src/components/Login.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/homepage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const baseURL = 'https://vitebackend.onrender.com'; // ✅ Hardcoded for Render

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

      {/* Login Form */}
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <h2>🔐 Login</h2>
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
          Don’t have an account? <Link to="/signup">Sign up here</Link> {/* ✅ Changed */}
        </p>
        <p className="text-center">
          Employee? <Link to="/employee-login">Login here</Link> {/* ✅ Changed */}
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
