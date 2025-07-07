// src/components/Contact.jsx
import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/homepage.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', topic: 'general', message: '' });
  const [statusMessage, setStatusMessage] = useState('');

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    try {
      const response = await fetch(`${baseURL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', topic: 'general', message: '' });
      } else {
        setStatusMessage(data.message || 'Error sending message.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatusMessage('Network error while sending message.');
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

      <div className="container my-5">
        <div className="row">
          {/* Contact Info + Map */}
          <div className="col-md-6 mb-4">
            <h3 className="mb-3">Visit or Contact Us</h3>
            <p><strong>📍 Address:</strong> 123 Paw Street, Petville, OH</p>
            <p><strong>📞 Phone:</strong> (555) 123-4567</p>
            <p><strong>✉️ Email:</strong> contact@simplepets.com</p>
            <section className="my-3">
              <iframe
                title="Simple Pets Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.9254090501425!2d-83.5552121846047!3d41.65280597924096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b8725e19656a9%3A0x4e2c83aebc3c8d9c!2sToledo%2C%20OH!5e0!3m2!1sen!2sus!4v1717446360161!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </section>
          </div>

          {/* Contact Form */}
          <div className="col-md-6">
            <h3 className="mb-3">📬 Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                className="form-control mb-2"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                className="form-control mb-2"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <select
                name="topic"
                className="form-control mb-2"
                value={formData.topic}
                onChange={handleChange}
                required
              >
                <option value="general">General Inquiry 🐾</option>
                <option value="adoption">Adoption Questions 🐕</option>
                <option value="lostfound">Lost & Found 🐱</option>
                <option value="petcare">Pet Care Tips 🐦</option>
                <option value="storefeedback">Store Feedback 🛒</option>
                <option value="other">Other 🐢</option>
              </select>
              <textarea
                name="message"
                className="form-control mb-2"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
            {statusMessage && <p className="mt-3 text-center">{statusMessage}</p>}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
