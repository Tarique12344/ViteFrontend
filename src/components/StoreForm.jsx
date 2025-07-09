// src/components/StoreForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/homepage.css';

const StoreForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const baseURL = 'https://vitebackend.onrender.com';
  const token = localStorage.getItem('token');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      let imageBase64 = '';
      if (imageFile) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject('Error reading image file');
          reader.readAsDataURL(imageFile);
        });
      }

      const newItem = {
        name,
        description,
        price: parseFloat(price),
        image: imageBase64,
      };

      const res = await fetch(`${baseURL}/api/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
      });

      if (res.ok) {
        console.log('✅ Item added successfully');
        navigate('/store');
      } else {
        const errData = await res.json();
        setErrorMessage(errData.message || 'Failed to add item.');
      }
    } catch (error) {
      console.error('❌ Error adding item:', error);
      setErrorMessage('Error adding item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <div className="banner">Simple Pets Store 🛍️</div>
      </header>
      <NavBar />

      <div className="pet-form-wrapper">
        <h2>Add Store Item 🛍️</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="itemName">Item Name:</label>
          <input
            id="itemName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="itemDescription">Description:</label>
          <textarea
            id="itemDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label htmlFor="itemPrice">Price ($):</label>
          <input
            id="itemPrice"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label htmlFor="itemImage">Item Image:</label>
          <input
            id="itemImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {previewURL && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <img
                src={previewURL}
                alt="Preview"
                style={{ maxWidth: '200px', borderRadius: '10px' }}
              />
            </div>
          )}

          <button type="submit" disabled={loading} className="pet-form-button">
            {loading ? 'Adding...' : 'Add Item'}
          </button>

          {errorMessage && <p className="pet-form-error">{errorMessage}</p>}
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default StoreForm;
