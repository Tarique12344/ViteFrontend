// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/HomePage';
import About from './components/about';
import Shop from './components/shop';
import PetForm from './components/PetForm';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/contact';
import EmployeeLogin from './components/Employeelogin';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employee-login" element={<EmployeeLogin />} /> {/* ✅ fixed path */}

        {/* 🛡️ Protected Route for Add Pet */}
        <Route
          path="/add-pet"
          element={
            isLoggedIn ? <PetForm /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
