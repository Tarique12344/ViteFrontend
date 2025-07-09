// src/components/WeatherCard.jsx
import React, { useEffect, useState } from 'react';
import '../styles/weathercard.css'; // optional for custom styling

const WeatherCard = ({ city = 'Toledo' }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://vitebackend.onrender.com/api/weather?city=${city}`);
        if (!response.ok) {
          throw new Error('Weather fetch failed');
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError('Unable to load weather 🐾');
      }
    };

    fetchWeather();
  }, [city]);

  if (error) {
    return (
      <section className="doggie-weather container my-5 text-center">
        <h2 className="weather-title">🐾 Doggie Weather Forecast 🦴</h2>
        <div className="weather-card bg-light rounded shadow p-4 mx-auto" style={{ maxWidth: '420px' }}>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!weather) {
    return (
      <section className="doggie-weather container my-5 text-center">
        <h2 className="weather-title">🐾 Doggie Weather Forecast 🦴</h2>
        <div className="weather-card bg-light rounded shadow p-4 mx-auto" style={{ maxWidth: '420px' }}>
          <p>Loading weather for you and your pup... 🐶☀️</p>
        </div>
      </section>
    );
  }

  const current = weather.current;
  const forecast = weather.forecast.forecastday;

  return (
    <section className="doggie-weather container my-5 text-center">
      <h2 className="weather-title">🐾 Doggie Weather Forecast 🦴</h2>
      <div className="weather-card bg-light rounded shadow p-4 mx-auto" style={{ maxWidth: '420px' }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Cute weather puppy"
          className="weather-dog mb-3 rounded-circle"
          style={{ width: '100px', height: '100px' }}
        />
        <h3>{weather.location.name} Weather</h3>
        <div className="temp fs-4">{current.temp_f}°F</div>
        <div className="condition d-flex align-items-center justify-content-center gap-2">
          <img src={`https:${current.condition.icon}`} alt={current.condition.text} className="weather-icon" />
          <span>{current.condition.text}</span>
        </div>
        <div className="forecast mt-3 d-flex justify-content-around">
          {forecast.slice(1).map((day) => (
            <div className="text-center" key={day.date}>
              <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} className="forecast-icon" />
              <div>
                {Math.round(day.day.maxtemp_f)}° / {Math.round(day.day.mintemp_f)}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;
