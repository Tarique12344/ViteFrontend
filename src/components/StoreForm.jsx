// src/components/StoreForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const StoreForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  const baseURL = 'https://vitebackend.onrender.com';
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      price: Number(price),
      image: imageBase64,
    };

    try {
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
        navigate('/store'); // ✅ Redirect to store page on success
      } else {
        console.error('❌ Failed to add item');
      }
    } catch (error) {
      console.error('❌ Error adding item:', error);
    }
  };

  return (
    <div>
      <header>
        <div className="banner">Add Store Item 🛍️</div>
      </header>
      <NavBar />

      <section className="container my-5">
        <h3>Add New Store Item</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control my-2"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control my-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control my-2"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="form-control my-2"
          />
          <button type="submit" className="btn btn-primary w-100">
            Add Item
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default StoreForm;
