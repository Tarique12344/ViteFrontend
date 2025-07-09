// src/components/HomePage.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/homepage.css';
import NavBar from './NavBar';
import Footer from './Footer';
import { Link } from 'react-router-dom'; // ✅ added

const HomePage = () => {
  return (
    <div>
      <header>
        <div className="banner">Simple Pets</div>
      </header>

      <NavBar />

    c

      <section className="container my-5">
        <h2 className="text-center mb-4">🐾 Spotlight Animals 🐾</h2>
        <div className="row justify-content-center g-4">
          <div className="col-md-4 col-sm-6">
            <div className="card h-100 shadow">
              <img src="/Images/small-dog.png.png" className="card-img-top object-fit-cover" alt="Santas Little Helper" />
              <div className="card-body text-center">
                <h5 className="card-title">Santas Little Helper</h5>
                <p className="card-text">A cute little small dog with big hopes.</p>
                <Link to="/shop" className="btn btn-warning rounded-pill">Adopt Me</Link> {/* ✅ replaced */}
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="card h-100 shadow">
              <img src="/Images/yingYang.jpg" className="card-img-top object-fit-cover" alt="Ying & Yang" />
              <div className="card-body text-center">
                <h5 className="card-title">Ying &amp; Yang</h5>
                <p className="card-text">They work in harmony together and never leave each other’s side.</p>
                <Link to="/shop" className="btn btn-warning rounded-pill">Adopt Us</Link> {/* ✅ replaced */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
