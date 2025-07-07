// src/components/Store.jsx
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/homepage.css';

const Store = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const baseURL = 'https://vitebackend.onrender.com';
  
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('token');

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

  const handleAddItem = async (e) => {
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
        const data = await res.json();
        setItems((prev) => [data, ...prev]);
        setName('');
        setDescription('');
        setPrice('');
        setImageFile(null);
      } else {
        console.error('Error adding item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await fetch(`${baseURL}/api/store/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.error('Error deleting item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <header>
        <div className="banner">Simple Pets Store 🛍️</div>
      </header>
      <NavBar />

      {/* Carousel */}
      <section className="container my-4">
        <div id="petCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner rounded shadow">
            <div className="carousel-item active">
              <img src="/Images/joe-caione-qO-PIF84Vxg-unsplash.jpg" className="d-block w-100" alt="Pet 1" />
            </div>
            <div className="carousel-item">
              <img src="https://place-puppy.com/801x400" className="d-block w-100" alt="Pet 2" />
            </div>
            <div className="carousel-item">
              <img src="https://place-puppy.com/802x400" className="d-block w-100" alt="Pet 3" />
            </div>
            <div className="carousel-item">
              <img src="https://place-puppy.com/803x400" className="d-block w-100" alt="Pet 4" />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#petCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#petCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section className="container my-5">
        {isAdmin && (
          <div className="mb-4">
            <h3>Add Store Item 🛒</h3>
            <form onSubmit={handleAddItem}>
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
          </div>
        )}

        {loading ? (
          <p className="text-center">Loading store items...</p>
        ) : items.length === 0 ? (
          <p className="text-center">No store items available.</p>
        ) : (
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
            {items.map((item) => (
              <div className="col mb-4" key={item._id}>
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
                    <button className="btn btn-warning">Add to Cart 🛒</button>
                    {isAdmin && (
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        Delete ❌
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Store;
