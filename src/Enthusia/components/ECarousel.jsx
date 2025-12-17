import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause } from 'react-icons/fa';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import '../styles/ECarousel.css';
import img1 from '../images/CC/ccback.png';
import img2 from '../images/CC/cul.png';
import img3 from '../images/CC/previous.png';
import img4 from '../images/CC/vipfinal.png';

const ECarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});
  const [slideDirection, setSlideDirection] = useState('next');

  const images = useMemo(() => [
    {
      src: img1,
      alt: 'Cultural Event 1',
      title: 'Dance Competition',
      subtitle: 'Showcasing Traditional & Modern Dance Forms',
      description: 'Experience the rhythm and grace of our talented performers'
    },
    {
      src: img2,
      alt: 'Cultural Event 2',
      title: 'Music Festival',
      subtitle: 'Melodious Voices & Harmonious Beats',
      description: 'Join us for an evening of enchanting musical performances'
    },
    {
      src: img3,
      alt: 'Cultural Event 3', 
      title: 'Drama Performance',
      subtitle: 'Theatrical Excellence & Storytelling',
      description: 'Witness compelling stories brought to life on stage'
    },
    {
      src: img4,
      alt: 'Cultural Event 4',
      title: 'Art Exhibition',
      subtitle: 'Creative Expressions & Visual Arts',
      description: 'Explore the artistic talents of our creative community'
    }
  ], []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const autoSlide = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(autoSlide);
  }, [images.length, isAutoPlay]);

  // Image preloading
  useEffect(() => {
    images.forEach((image, index) => {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(prev => ({...prev, [index]: true}));
      };
      img.onerror = () => {
        setImageLoaded(prev => ({...prev, [index]: false}));
      };
      img.src = image.src;
    });
  }, [images]);

  const nextSlide = useCallback(() => {
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index) => {
    setSlideDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  }, [currentSlide]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(!isAutoPlay);
  }, [isAutoPlay]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  return (
    <div className={`ecarousel-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="ecarousel-wrapper">
        
        
        <div 
          className="ecarousel"
        >
          {/* Background Particles - Reduced for performance */}
          <div className="carousel-particles">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`particle particle-${i}`}></div>
            ))}
          </div>

          {/* Main Carousel Track */}
          <div 
            className={`ecarousel-track slide-${slideDirection}`} 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`ecarousel-slide ${index === currentSlide ? 'active' : ''}`}
              >
                {imageLoaded[index] !== false ? (
                  <div className="slide-image-container">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="slide-image"
                      onError={() => setImageLoaded(prev => ({...prev, [index]: false}))}
                    />
                    <div className="image-overlay"></div>
                  </div>
                ) : (
                  <div className="slide-image-fallback">
                    <div className="fallback-content">
                      <div className="fallback-icon">🎭</div>
                      <span className="fallback-text">{image.title}</span>
                    </div>
                  </div>
                )}
                
                
              </div>
            ))}
          </div>
          
          {/* Navigation Controls */}
          
          
          {/* Progress Bar */}
          

          {/* Slide Indicators */}
          

          {/* Slide Counter */}
          <div className="slide-counter">
            <span className="current-slide">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="slide-separator">/</span>
            <span className="total-slides">{String(images.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECarousel;