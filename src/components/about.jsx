import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/about.css';  // your custom about page styles
import '../styles/homepage.css'; // main styles with banner & navbar

const About = () => {
  return (
    <div>
      {/* Banner */}
      <header className="banner text-center p-4 fw-bold">
        About Us - Simple Pets 🐾
      </header>

      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="container my-4">
        {/* Top Section */}
        <div className="row align-items-center mb-5 slide-in-left">
          <div className="col-md-6">
            <img
              src="/Images/manAndDog.jpg"
              alt="Owner with pet"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <blockquote className="blockquote text-center">
              <p className="fs-4">
                "Caring for pets isn't just a job—it's our passion. Every wag, purr, and chirp matters."
              </p>
              <footer className="blockquote-footer">Simple Pets Founder</footer>
            </blockquote>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="row align-items-center flex-md-row-reverse slide-in-right">
          <div className="col-md-6">
            <img
              src="/Images/teamofPeople.png"
              alt="Happy animals"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <blockquote className="blockquote text-center">
              <p className="fs-4">
                "From small paws to mighty claws, every pet deserves a loving touch and a happy home."
              </p>
              <footer className="blockquote-footer">The Simple Pets Team</footer>
            </blockquote>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
