import React, { useState, useEffect } from 'react';
import '../styles/EAbout.css';
import '../styles/root.css';
import dance from '../images/Event/group dance.png';
import fashion from '../images/Event/fashion.png';
import singing from '../images/Event/Group Singing.png';
import skit from '../images/Event/skit.png';
import solo from '../images/Event/solo dance.png';

const EAbout = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const eventGallery = [
    { 
      src: dance, 
      title: 'Group Dance',
      category: 'Dance',
      color: '#ff7f50'
    },
    { 
      src: fashion, 
      title: 'Fashion Show',
      category: 'Fashion',
      color: '#ffd700'
    },
    { 
      src: singing, 
      title: 'Group Singing',
      category: 'Music',
      color: '#87ceeb'
    },
    { 
      src: skit, 
      title: 'Theatrical Performance',
      category: 'Drama',
      color: '#ff69b4'
    },
    { 
      src: solo, 
      title: 'Solo Dance',
      category: 'Dance',
      color: '#9966cc'
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
          <span className="header-subtitle">Discover The Magic</span>
          <h1 className="header-title">
            <span className="title-word">ENTHUSIA</span>
            <span className="title-year">2026</span>
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
                  <strong> 16 extraordinary events</strong> that showcase the boundless 
                  talent of our vibrant community.
                </p>
                
                <p className="description-text">
                  From mesmerizing dance performances to soul-stirring musical renditions, 
                  from dramatic theatrical showcases to innovative artistic expressions—every 
                  moment is crafted to inspire, entertain, and unite.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="highlights-grid">
                {highlights.map((item, index) => (
                  <div 
                    key={index} 
                    className="highlight-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="highlight-icon">{item.icon}</span>
                    <div className="highlight-content">
                      <h3 className="highlight-number">{item.number}</h3>
                      <p className="highlight-label">{item.label}</p>
                      <span className="highlight-desc">{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cta-section">
                
                <button className="cta-button secondary">
                  <span>View Gallery</span>
                </button>
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