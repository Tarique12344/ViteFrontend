// src/components/PetForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/petform.css';
import '../styles/homepage.css';
import NavBar from './NavBar';
import Footer from './Footer';

const PetForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const baseURL = 'https://vitebackend.onrender.com';

  // ✅ Check admin access on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!token || !isAdmin) {
      alert('Access denied: Admins only');
      navigate('/');
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You must be logged in to add a pet.');
      setLoading(false);
      return;
    }

    try {
      let imageBase64 = '';
      if (imageFile) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject('Failed to read image file');
          reader.readAsDataURL(imageFile);
        });
      }

      const requestData = {
        name,
        type,
        description,
        age: Number(age),
        breed,
        image: imageBase64,
      };

      const response = await fetch(`${baseURL}/api/pets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('Pet added successfully');
        navigate('/shop');
      } else {
        const errData = await response.json();
        setErrorMessage(errData.message || 'Error adding pet. Please try again.');
      }
    } catch (error) {
      console.error('Error adding pet:', error);
      setErrorMessage('Error adding pet. Please try again later.');
    } finally {
      setLoading(false);
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

      <div className="pet-form-wrapper">
        <h2>Add a Pet</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="petName">Pet Name:</label>
          <input
            id="petName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="petType">Pet Type:</label>
          <input
            id="petType"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />

          <label htmlFor="petBreed">Breed:</label>
          <input
            id="petBreed"
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />

          <label htmlFor="petAge">Age:</label>
          <input
            id="petAge"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label htmlFor="petDescription">Description:</label>
          <textarea
            id="petDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="petImage">Pet Image:</label>
          <input
            id="petImage"
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
            {loading ? 'Adding...' : 'Add Pet'}
          </button>

          {errorMessage && <p className="pet-form-error">{errorMessage}</p>}
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default PetForm;
