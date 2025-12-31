import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/EAbout.css';
import '../styles/root.css';

import ms from '../images/Hero/AB1.jpeg';
import mr from '../images/Hero/AB2.jpeg';

const EAbout = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const eventGallery = [
    { 
      src: ms, 
      title: 'Jagatheeshwari L',
      category: 'Ms  ENTHUSIA',
      color: '#ff7f50'
    },
    { 
      src: mr, 
      title: 'Adithya A',
      category: 'Mr ENTHUSIA',
      color: '#ffd700'
    }
  ];

  const highlights = [
    { 
      
      number: '16',
      label: 'Diverse Events',
      
    },
    { 
      
      number: '400+',
      label: 'Talented Artists',
      
    },
    { 
      
      number: '6000+',
      label: 'Enthusiastic Crowd',
      
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      handleSlideChange((activeSlide + 1) % eventGallery.length);
    }, 3000);

    return () => clearInterval(slideTimer);
  }, [activeSlide, eventGallery.length]);

  const handleSlideChange = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide(index);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  return (
    <section className="enthusia-about-section" id="about">
      <div className="about-background-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>

      <div className="about-container">
        {/* Section Header */}
        <div className="about-header">
         
          <h1 className="header-title">
            <span className="title-word">ENTHUSIA '26</span>
            
          </h1>
          <div className="header-divider">
            <span className="divider-dot"></span>
            <span className="divider-line"></span>
            <span className="divider-dot"></span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="about-content-grid">
          
          {/* Left Side - Content */}
          <div className="content-section">
            <div className="content-card">
              <div className="card-badge">
                <span className="badge-icon">✨</span>
                <span className="badge-text">Cultural Extravaganza</span>
              </div>

              <h2 className="content-heading">
                Where Talent Meets <span className="highlight-text">Celebration</span>
              </h2>

              <div className="content-description">
                <p className="description-text">
                  Enthusia transforms Kongu Engineering College into a spectacular 
                  celebration of art, culture, and creativity. A two-day journey through 
                  <strong> 14 extraordinary events</strong> that showcase the boundless 
                  talent of our vibrant community.
                </p>
                
                
              </div>

              {/* Highlights Grid */}
              

              <div className="cta-section">
                
                <Link to="/gallery" className="cta-button secondary">
                  <span>View Gallery</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Image Gallery */}
          <div className="gallery-section">
            <div className="gallery-container">
              
              {/* Main Carousel */}
              <div className="carousel-wrapper">
                {eventGallery.map((event, index) => (
                  <div
                    key={index}
                    className={`carousel-slide ${index === activeSlide ? 'active' : ''} ${index === activeSlide - 1 || (activeSlide === 0 && index === eventGallery.length - 1) ? 'previous' : ''}`}
                  >
                    <div className="slide-image-wrapper">
                      <img 
                        src={event.src} 
                        alt={event.title}
                        className="slide-image"
                      />
                      <div className="slide-overlay"></div>
                    </div>
                    
                    <div className="slide-info">
                      <span 
                        className="slide-category"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.category}
                      </span>
                      <h3 className="slide-title">{event.title}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="carousel-controls">
               
              </div>

              {/* Thumbnail Preview */}
              <div className="thumbnail-preview">
                {eventGallery.map((event, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === activeSlide ? 'active' : ''}`}
                    onClick={() => handleSlideChange(index)}
                  >
                    <img src={event.src} alt={event.title} />
                    <div className="thumbnail-overlay">
                      <span>{event.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EAbout;