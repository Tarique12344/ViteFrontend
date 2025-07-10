// src/components/Cart.jsx

import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/homepage.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  const handleCheckout = () => {
    setShowModal(true);
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="page-wrapper">
      {/* Banner */}
      <header>
        <div className="banner">Your Cart 🛒</div>
      </header>

      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="container my-5 flex-grow-1">
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-container">
              <div className="row justify-content-center">
                {cartItems.map((item, index) => (
                  <div className="col-md-6 col-lg-4 mb-4" key={index}>
                    <div className="card h-100 shadow">
                      <img
                        src={item.image || 'https://via.placeholder.com/400x300'}
                        className="card-img-top"
                        alt={item.name}
                        style={{ objectFit: 'cover', height: '250px' }}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">
                          {item.description}
                          <br />
                          <strong>Price:</strong> ${item.price}
                        </p>
                      </div>
                      <div className="card-footer text-center">
                        <button
                          className="btn btn-danger rounded-pill"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove ❌
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <h4>Total: ${totalPrice.toFixed(2)}</h4>
                <button
                  className="btn btn-clear-cart m-2"
                  onClick={handleClearCart}
                >
                  🧹 Clear Cart
                </button>
                <button
                  className="btn btn-checkout m-2"
                  onClick={handleCheckout}
                >
                  🛒 Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Success Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content text-center p-4">
              <h5 className="modal-title">🎉 Order Successful!</h5>
              <p>Thank you for your order! Your pets will love their goodies. 🐾</p>
              <button
                type="button"
                className="btn btn-warning rounded-pill mt-3"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
