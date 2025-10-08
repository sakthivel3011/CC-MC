import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Hero.css';
import image1 from '../assets/images/Hero/1.JPG';
import image2 from '../assets/images/Hero/2.JPG';
import image3 from '../assets/images/Hero/3.JPG';
import image4 from '../assets/images/Hero/4.png';

const Hero = () => {
  const heroRef = useRef(null);
  const collegeNameRef = useRef(null);
  const clubNameRef = useRef(null);
  const sinceRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);
  const [clubFontIndex, setClubFontIndex] = useState(0);
  const navigate = useNavigate();

  // Image slides for background - Professional slideshow
  const heroImages = [
    image1,
    image2,
    image3,
    image4
  ];

  // Dynamic color schemes
  const colorSchemes = [
    { primary: '#ff6b6b', secondary: '#4ecdc4', accent: '#45b7d1' },
    { primary: '#a8e6cf', secondary: '#ff8b94', accent: '#ffaaa5' },
    { primary: '#ffd93d', secondary: '#6bcf7f', accent: '#4d96ff' },
    { primary: '#ff9ff3', secondary: '#54a0ff', accent: '#5f27cd' },
    { primary: '#00d2d3', secondary: '#ff9f43', accent: '#f0932b' },
    { primary: '#6c5ce7', secondary: '#a29bfe', accent: '#fd79a8' }
  ];

  // Split college name for letter-by-letter animation
  const collegeName = "KONGU ENGINEERING COLLEGE";
  const clubName = "CULTURAL & MUSIC CLUB";

  // Dynamic club name font styles
  const clubFontStyles = [
    { fontFamily: "'Orbitron', monospace", fontWeight: "900", letterSpacing: "0.15em", textTransform: "uppercase" },
    { fontFamily: "'Space Grotesk', sans-serif", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" },
    { fontFamily: "'Playfair Display', serif", fontWeight: "900", fontStyle: "italic", letterSpacing: "0.05em", textTransform: "capitalize" },
    { fontFamily: "'Inter', sans-serif", fontWeight: "800", letterSpacing: "0.2em", textTransform: "uppercase" },
    { fontFamily: "'Montserrat', sans-serif", fontWeight: "900", letterSpacing: "0.12em", textTransform: "uppercase" },
    { fontFamily: "'Cinzel', serif", fontWeight: "700", letterSpacing: "0.18em", textTransform: "uppercase" },
    { fontFamily: "'Oswald', sans-serif", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase" },
    { fontFamily: "'Bebas Neue', cursive", fontWeight: "400", letterSpacing: "0.1em", textTransform: "uppercase" }
  ];

  useEffect(() => {
    // Initial loading animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Professional background image slideshow
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 7000); // Slower, more professional timing

    // Color scheme rotation
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorSchemes.length);
    }, 3000);

    // Auto-hide event popup after 10 seconds
    const popupTimer = setTimeout(() => {
      setShowEventPopup(false);
    }, 10000);

    // Apply dynamic CSS variables for color changes
    const updateColors = () => {
      const currentScheme = colorSchemes[colorIndex];
      const root = document.documentElement;
      root.style.setProperty('--dynamic-primary', currentScheme.primary);
      root.style.setProperty('--dynamic-secondary', currentScheme.secondary);
      root.style.setProperty('--dynamic-accent', currentScheme.accent);
    };

    updateColors();

    return () => {
      clearInterval(imageInterval);
      clearInterval(colorInterval);
      clearTimeout(popupTimer);
    };
  }, [colorIndex, heroImages.length]);

  const handleEventClick = () => {
    // Navigate to events page
    navigate('/Event');
  };

  // Preload all images in the background and inject <link rel="preload"> for each
  useEffect(() => {
    heroImages.forEach(src => {
      const img = new window.Image();
      img.src = src;
      // Inject preload link if not already present
      if (!document.head.querySelector(`link[rel='preload'][href='${src}']`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
    });
  }, []);

  return (
    <section ref={heroRef} className={`hero-modern ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated Background Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`}></div>
        ))}
      </div>

      {/* Dynamic Background Images */}
      {heroImages.map((image, index) => (
        <div 
          key={index}
          className={`hero-bg-modern ${index === currentImage ? 'active' : ''}`}
          style={{ 
            backgroundImage: `url(${image})`,
            zIndex: index === currentImage ? 1 : 0,
            animationDelay: `${index * 0.5}s`
          }}
        />
      ))}
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay"></div>

      {/* Main Content */}
      <div className="hero-content-modern">
        {/* College Name with Letter Animation */}
        <div ref={collegeNameRef} className="college-name-container">
          {collegeName.split('').map((letter, index) => (
            <span 
              key={index} 
              className="letter-animate"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                color: `var(--dynamic-primary)`
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>

        {/* Club Name with Morphing Effect */}
        <div ref={clubNameRef} className="club-name-container">
          <div className="club-name-wrapper">
            {clubName.split('').map((letter, index) => (
              <span 
                key={index}
                className="club-letter"
                style={{ 
                  animationDelay: `${index * 0.05}s`,
                  color: `var(--dynamic-secondary)`
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
          <div className="club-name-glow"></div>
        </div>

        {/* Decorative Elements */}
        <div className="decorative-lines">
          <div className="line line-left"></div>
          <div className="center-ornament">
            <div className="ornament-circle"></div>
          </div>
          <div className="line line-right"></div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-text">EXPLORE</div>
        <div className="scroll-arrow">
          <div className="arrow-line"></div>
          <div className="arrow-point"></div>
        </div>
      </div>

      {/* Enhanced Event Popup */}
      {showEventPopup && (
        <div className="event-popup-modern">
          <div className="popup-backdrop"></div>
          <div className="popup-content-modern">
            <div className="popup-header">
              <div className="popup-icon"></div>
              <button 
                className="popup-close"
                onClick={() => setShowEventPopup(false)}
              >
                <span className="close-text">×</span>
                <div className="close-countdown"></div>
              </button>
            </div>
            <div className="popup-body">
              <h3>Upcoming Event</h3>
              <div className="event-name">Enthusia-2k26</div>
              <div className="event-tagline">Where Culture Meets Innovation</div>
            </div>
            <button 
              className="popup-cta"
              onClick={handleEventClick}
            >
              <span>Explore Events</span>
              <div className="cta-arrow">→</div>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;