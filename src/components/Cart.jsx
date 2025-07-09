// src/components/Cart.jsx

import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/homepage.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

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
    alert('🎉 Thank you for your order! You will receive a confirmation email shortly.');
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div>
      <header>
        <div className="banner">Your Cart 🛒</div>
      </header>
      <NavBar />

      <section className="container my-5">
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
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
                        className="btn btn-danger"
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
              <button className="btn btn-secondary m-2" onClick={handleClearCart}>
                Clear Cart 🧹
              </button>
              <button className="btn btn-success m-2" onClick={handleCheckout}>
                Checkout ✅
              </button>
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
