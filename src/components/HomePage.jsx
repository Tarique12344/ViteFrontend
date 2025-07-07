// src/components/HomePage.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/homepage.css';
import NavBar from './NavBar';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <header>
        <div className="banner">Simple Pets</div>
      </header>

      <NavBar />

      <section className="my-5 container-fluid px-0">
        <div id="petCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner rounded shadow">
            <div className="carousel-item active">
              <img src="/Images/basketKitties.jpg" alt="Cute Cats" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="/Images/Rabbit2.jpg" alt="Rabbit" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="/Images/chewyDogs.jpg" alt="Gerbil" className="d-block w-100" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#petCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#petCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center mb-4">🐾 Featured Animals 🐾</h2>
        <div className="row justify-content-center g-4">
          <div className="col-md-4 col-sm-6">
            <div className="card h-100 shadow">
              <img src="/Images/small-dog.png.png" className="card-img-top object-fit-cover" alt="Santas Little Helper" />
              <div className="card-body text-center">
                <h5 className="card-title">Santas Little Helper</h5>
                <p className="card-text">A cute little small dog with big hopes.</p>
                <a href="/shop" className="btn btn-warning rounded-pill">Adopt Me</a>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="card h-100 shadow">
              <img src="/Images/yingYang.jpg" className="card-img-top object-fit-cover" alt="Ying & Yang" />
              <div className="card-body text-center">
                <h5 className="card-title">Ying &amp; Yang</h5>
                <p className="card-text">They work in harmony together and never leave each other’s side.</p>
                <a href="/shop" className="btn btn-warning rounded-pill">Adopt Us</a>
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
