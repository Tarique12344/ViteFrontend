import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/homepage.css'

const Shop = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);

  const fetchPets = async () => {
    try {
      const response = await fetch('https://vitebackend.onrender.com/api/pets');
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleAdopt = (pet) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    setSelectedPet(null);
  };

  return (
    <div>
      <header>
        <div className="banner">Simple Pets Adoption 🐾</div>
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
              <img src="/Images/jamie-street-VETPuVqsqnQ-unsplash.jpg" className="d-block w-100" alt="Pet 2" />
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

      {/* Pet Cards */}
      <section className="container my-5">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : pets.length === 0 ? (
          <p className="text-center">No pets available for adoption at this time.</p>
        ) : (
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
            {pets.map((pet) => (
              <div className="col mb-4" key={pet._id}>
                <div className="card h-100 shadow">
                  <img
                    src={pet.image || 'https://place-puppy.com/400x300'}
                    className="card-img-top"
                    alt={pet.name}
                    style={{ objectFit: 'cover', height: '250px' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{pet.name}</h5>
                    <p className="card-text">
                      <strong>Type:</strong> {pet.type} <br />
                      <strong>Breed:</strong> {pet.breed || 'N/A'} <br />
                      <strong>Age:</strong> {pet.age} <br />
                      <strong>Description:</strong> {pet.description}
                    </p>
                  </div>
                  <div className="card-footer text-center">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleAdopt(pet)}
                    >
                      Adopt Me 🐾
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* Adoption Modal */}
      {selectedPet && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">🎉 Adoption Confirmation</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                <p>Congrats! You will be emailed soon about adopting <strong>{selectedPet.name}</strong> 🐾.</p>
              </div>
              <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
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

export default Shop;
