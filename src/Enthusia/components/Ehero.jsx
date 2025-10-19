import React, { useState, useEffect } from 'react';
import { FaArrowDown, FaBars, FaHistory, FaCompass } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Ehero.css';

const Ehero = ({ setSidebarOpen, sidebarOpen }) => {
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
        className={`sidebar-toggle ${sidebarOpen ? 'sidebar-toggle-hidden' : ''}`}
        onClick={() => setSidebarOpen(true)}
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Hero Background */}
      <div className="ehero-background">
        <div className="ehero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="ehero-content">
        <div className="ehero-main">
          {/* Animated Main Title */}
          <div className="title-container">
            <div className="title-backdrop">
              <div className="backdrop-glow"></div>
            </div>
            
            <h1 className="ehero-title">
              <span className="title-main">
                {'ENTHUSIA'.split('').map((letter, index) => (
                  <span key={index} className="title-letter" style={{ animationDelay: `${index * 0.1}s` }}>
                    {letter}
                  </span>
                ))}
              </span>
              <span className="title-year">2025</span>
            </h1>
            
            <div className="title-decoration">
              <div className="decoration-element">
                <div className="deco-line left"></div>
                <div className="deco-center">
                  <div className="deco-diamond"></div>
                  <div className="deco-pulse"></div>
                </div>
                <div className="deco-line right"></div>
              </div>
            </div>
          </div>
          
          <div className="subtitle-container">
            <p className="ehero-subtitle">
              <span className="subtitle-text">The Ultimate Cultural Extravaganza</span>
              <div className="subtitle-underline"></div>
            </p>
          </div>

          {/* Creative Countdown Display */}
          <div className="countdown-section">
            <div className="countdown-intro">
              <span className="countdown-prefix">Event starts in</span>
            </div>
            
            <div className="countdown-display">
              <div className="time-unit">
                <div className="time-value" data-value={timeLeft.days}>
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="time-label">Days</div>
                <div className="time-decoration"></div>
              </div>
              
              <div className="time-separator">
                <div className="separator-dot"></div>
                <div className="separator-dot"></div>
                <div className="separator-dot"></div>
              </div>
              
              <div className="time-unit">
                <div className="time-value" data-value={timeLeft.hours}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="time-label">Hours</div>
                <div className="time-decoration"></div>
              </div>
              
              <div className="time-separator">
                <div className="separator-dot"></div>
                <div className="separator-dot"></div>
                <div className="separator-dot"></div>
              </div>
              
              <div className="time-unit">
                <div className="time-value" data-value={timeLeft.minutes}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="time-label">Minutes</div>
                <div className="time-decoration"></div>
              </div>
              
              <div className="time-separator">
                <div className="separator-dot"></div>
                <div className="separator-dot"></div>
                <div className="separator-dot"></div>
              </div>
              
              <div className="time-unit">
                <div className="time-value" data-value={timeLeft.seconds}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="time-label">Seconds</div>
                <div className="time-decoration"></div>
              </div>
            </div>
            
            <div className="countdown-glow"></div>
          </div>
        </div>

        {/* Action Buttons - New Position */}
        <div className="hero-actions">
          <Link to="/enthusia/check" className="modern-btn primary-btn">
            <div className="btn-content">
              <FaHistory className="btn-icon" />
              <span>Registration History</span>
            </div>
          </Link>
          <Link to="/enthusia/explore" className="modern-btn secondary-btn">
            <div className="btn-content">
              <FaCompass className="btn-icon" />
              <span>Explore Events</span>
            </div>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" onClick={scrollDown}>
          <div className="scroll-text">Discover More</div>
          <div className="scroll-animation">
            <FaArrowDown className="scroll-arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ehero;
