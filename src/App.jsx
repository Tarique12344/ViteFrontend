// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/HomePage';
import About from './components/About';
import Shop from './components/shop';
import Store from './components/store';
import StoreForm from './components/StoreForm';
import PetForm from './components/PetForm';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import EmployeeLogin from './components/Employeelogin'; // ✅ FIXED casing here

function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/store" element={<Store />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />

        <Route
          path="/add-pet"
          element={isLoggedIn ? <PetForm /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/storeform"
          element={
            isLoggedIn && isAdmin ? (
              <StoreForm />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
