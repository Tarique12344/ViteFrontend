// src/components/Store.jsx

import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/homepage.css';

const Store = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const baseURL = 'https://vitebackend.onrender.com';

  const fetchItems = async () => {
    try {
      const res = await fetch(`${baseURL}/api/store`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching store items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(item);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <div className="banner">Simple Pets Store 🛍️</div>
      </header>
      <NavBar />

      {/* Carousel */}
      <section className="container my-4">
        <div id="storeCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner rounded shadow overflow-hidden" style={{ maxHeight: '400px' }}>
            <div className="carousel-item active">
              <img src="/Images/raquel-pedrotti-AHgpNYkX9dc-unsplash.jpg" className="d-block w-100 object-fit-cover" alt="Pet 1" />
            </div>
            <div className="carousel-item">
              <img src="/Images/weinerDog.jpg" className="d-block w-100 object-fit-cover" alt="Pet 2" />
            </div>
            <div className="carousel-item">
              <img src="/Images/jamie-street-VETPuVqsqnQ-unsplash.jpg" className="d-block w-100 object-fit-cover" alt="Pet 3" />
            </div>
            <div className="carousel-item">
              <img src="/Images/small-dog.png.png" className="d-block w-100 object-fit-cover" alt="Pet 4" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#storeCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#storeCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Store Items */}
      <section className="container my-5 flex-grow-1">
        {loading ? (
          <p className="text-center">Loading store items...</p>
        ) : items.length === 0 ? (
          <p className="text-center">No store items available.</p>
        ) : (
          <div className="row gx-4 gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center">
            {items.map((item) => (
              <div className="col" key={item._id}>
                <div className="card h-100 shadow rounded">
                  <img
                    src={item.image || 'https://via.placeholder.com/400x300'}
                    className="card-img-top object-fit-cover"
                    alt={item.name}
                    style={{ height: '250px' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                  </div>
                  <div className="card-footer text-center bg-transparent border-0">
                    <button className="btn btn-warning rounded-pill w-75" onClick={() => handleAddToCart(item)}>
                      Add to Order 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* Add to Cart Modal */}
      {selectedItem && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded">
              <div className="modal-header">
                <h5 className="modal-title">🛒 Item Added</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                <p>✅ <strong>{selectedItem.name}</strong> has been added to your order!</p>
              </div>
              <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-secondary rounded-pill" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
