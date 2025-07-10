import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/homepage.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigate

  const baseURL = 'https://vitebackend.onrender.com';

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch(`${baseURL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Signup successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // ✅ Use React Router navigation
        }, 1500);
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      setMessage('Network error during signup');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        {/* Banner */}
        <header>
          <div className="banner">Simple Pets</div>
        </header>

        {/* Navbar */}
        <NavBar />

        {/* Signup Form */}
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
          <h2>🐾 Signup</h2>
          <form onSubmit={handleSignup}>
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
              autoComplete="new-password"
              className="form-control my-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-success w-100">
              Signup
            </button>
            <p className="mt-3 text-center">
              Have an account already? <Link to="/login">Login Here</Link>
            </p>
          </form>
          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Signup;
