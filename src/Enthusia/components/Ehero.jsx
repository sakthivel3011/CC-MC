import React, { useState, useEffect } from 'react';
import { FaArrowDown, FaBars, FaHistory, FaCompass } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Ehero.css';

const Ehero = ({ setSidebarOpen }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Event date - Change this to your actual event date
  const eventDate = new Date('2025-03-15T10:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="ehero-container">
      {/* Sidebar Toggle */}
      <button 
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {/* Hero Background */}
      <div className="ehero-background">
        <div className="ehero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="ehero-content">
        <div className="ehero-main">
          <h1 className="ehero-title">
            <span className="title-main">ENTHUSIA</span>
            <span className="title-sub">2025</span>
          </h1>
          
          <p className="ehero-subtitle">
            The Ultimate Cultural Extravaganza
          </p>

          {/* Countdown Timer */}
          <div className="countdown-container">
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.seconds}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hero-buttons">
            <Link to="/enthusia/check" className="enthusia-btn">
              <FaHistory className="btn-icon" />
              Check Registration History
            </Link>
            <Link to="/enthusia/explore" className="enthusia-btn enthusia-btn-secondary">
              <FaCompass className="btn-icon" />
              Explore Events
            </Link>
          </div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="scroll-down" onClick={scrollDown}>
          <FaArrowDown className="scroll-arrow" />
          <span>Scroll Down</span>
        </div>
      </div>
    </div>
  );
};

export default Ehero;
