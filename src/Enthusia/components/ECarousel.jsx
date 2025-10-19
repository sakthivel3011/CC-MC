import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/ECarousel.css';

const ECarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample images - replace with actual event images
  const images = [
    {
      src: '/src/assets/images/carousel1.jpg',
      alt: 'Cultural Event 1',
      title: 'Dance Competition'
    },
    {
      src: '/src/assets/images/carousel2.jpg', 
      alt: 'Cultural Event 2',
      title: 'Music Festival'
    },
    {
      src: '/src/assets/images/carousel3.jpg',
      alt: 'Cultural Event 3', 
      title: 'Drama Performance'
    },
    {
      src: '/src/assets/images/carousel4.jpg',
      alt: 'Cultural Event 4',
      title: 'Art Exhibition'
    },
    {
      src: '/src/assets/images/carousel5.jpg',
      alt: 'Cultural Event 5',
      title: 'Literary Event'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(autoSlide);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="ecarousel-container section">
      <div className="ecarousel-wrapper">
        <h2 className="section-title">Event Highlights</h2>
        
        <div className="ecarousel">
          {/* Images */}
          <div className="ecarousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {images.map((image, index) => (
              <div key={index} className="ecarousel-slide">
                <div className="slide-image-placeholder">
                  <span>{image.title}</span>
                </div>
                <div className="slide-overlay">
                  <h3>{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button className="carousel-btn prev-btn" onClick={prevSlide}>
            <FaArrowLeft />
          </button>
          <button className="carousel-btn next-btn" onClick={nextSlide}>
            <FaArrowRight />
          </button>
          
          {/* Dots Indicator */}
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECarousel;