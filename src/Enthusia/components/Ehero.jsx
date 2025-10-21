import React, { useState, useEffect } from 'react';
import { FaArrowDown, FaBars, FaHistory, FaCompass, FaStar, FaQuestionCircle } from 'react-icons/fa';
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
    const nextSection = document.querySelector('.ehero-container').nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
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
          {/* Cultural Logo/Star Elements */}
          <div className="logos-container">
            <div className="left-logo">
              <div className="logo-circle">
                <div className="logo-content">
                  <div className="logo-text">KONGU ENGINEERING</div>
                  <div className="logo-gear">⚙</div>
                </div>
              </div>
            </div>
            
            <div className="right-logo">
              <div className="logo-circle music-logo">
                <div className="logo-content">
                  <div className="logo-text">CULTURAL & MUSIC CLUB</div>
                  <div className="logo-icon">🎵</div>
                </div>
              </div>
            </div>
          </div>

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
              <span className="title-year">2026</span>
            </h1>
          </div>
          
          <div className="subtitle-container">
            <h2 className="ehero-subtitle">CULTURAL AND MUSIC CLUB</h2>
            <p className="ehero-tagline">The Ultimate Cultural Celebration</p>
            <div className="presents-text">
              <span className="presents-decoration">~</span>
              <span>PRESENTS</span>
              <span className="presents-decoration">~</span>
            </div>
          </div>

          {/* Enhanced Countdown Display */}
          <div className="countdown-section">
            <div className="countdown-intro">
              <span className="countdown-prefix">🎭 Event Begins In 🎭</span>
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

        {/* Action Buttons */}
        <div className="hero-actions">
          <Link to="/enthusia/check" className="action-btn registration-btn">
            <div className="btn-icon">
              <FaHistory />
            </div>
            <span className="btn-text">REGISTRATION HISTORY</span>
          </Link>
          
          <button onClick={scrollDown} className="action-btn explore-btn">
            <div className="btn-icon">
              <FaCompass />
            </div>
            <span className="btn-text">EXPLORE EVENTS</span>
          </button>
          
          <Link to="/help" className="action-btn help-btn">
            <div className="btn-text">NEED HELP?</div>
          </Link>
        </div>

        {/* Enhanced Scroll Indicator */}
        
      </div>
    </div>
  );
};

export default Ehero;
