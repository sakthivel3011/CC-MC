import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Hero.css';
import image1 from '../assets/images/Hero/1.JPG';
import image2 from '../assets/images/Hero/2.JPG';
import image3 from '../assets/images/Hero/3.JPG';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const presentsRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentFont, setCurrentFont] = useState(0);
  const [showEventPopup, setShowEventPopup] = useState(true);
  const navigate = useNavigate();

  // Image slides for background
  const heroImages = [
    image1,
    image2,
    image3,
   
  ];

  // Font classes for the subtitle
  const fontClasses = [
    'font-montserrat',
    'font-playfair',
    'font-poppins',
    'font-dancing',
    'font-cinzel'
  ];

  useEffect(() => {
    // Animate text elements
    const elements = [titleRef.current, subtitleRef.current, presentsRef.current];
    
    elements.forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
      }
    });

    elements.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 300);
      }
    });

    // Background image slideshow
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds

    // Font rotation for subtitle
    const fontInterval = setInterval(() => {
      setCurrentFont((prev) => (prev + 1) % fontClasses.length);
    }, 3000); // Change font every 3 seconds

    // Auto-hide event popup after 5 seconds
    const popupTimer = setTimeout(() => {
      setShowEventPopup(false);
    }, 5000);

    return () => {
      elements.forEach(el => {
        if (el) {
          el.style.transition = '';
          el.style.opacity = '';
          el.style.transform = '';
        }
      });
      clearInterval(imageInterval);
      clearInterval(fontInterval);
      clearTimeout(popupTimer);
    };
  }, []);

  const handleEventClick = () => {
    // Navigate to events page
    navigate('/Event');
  };

  // Preload all images in the background
  useEffect(() => {
    heroImages.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <section className="hero">
      {/* Preload hero images for faster display */}
      <div style={{display: 'none'}}>
        {heroImages.map((img, idx) => (
          <img key={idx} src={img} alt="" loading={idx === 0 ? "eager" : "lazy"} />
        ))}
      </div>
      {/* Background images with transition */}
      {heroImages.map((image, index) => (
        <div 
          key={index}
          className={`hero-bg-image ${index === currentImage ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
      
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">KONGU ENGINEERING COLLEGE  </h1>
        <h2 
          ref={subtitleRef} 
          className={`hero-subtitle ${fontClasses[currentFont]}`}
        >
          CULTURAL & MUSIC CLUB
        </h2>
        <p ref={presentsRef} className="hero-presents">SINCE 1998</p>
      </div>
      
      <div className="scroll-down">
        <a href="#about">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      {/* Event Popup */}
      {showEventPopup && (
        <div className="event-popup">
          <div className="event-popup-content">
            <button 
              className="event-popup-close"
              onClick={() => setShowEventPopup(false)}
            >
              ×
            </button>
            <h3>Upcoming Event!</h3>
            <p>Onam 2025 Celebration</p>
            <button 
              className="event-popup-button"
              onClick={handleEventClick}
            >
              View Events
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;