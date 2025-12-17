import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Hero.css';
import image1 from '../assets/images/Hero/1.JPG';
import image2 from '../assets/images/Hero/5.JPG';
import image3 from '../assets/images/Hero/6.JPG';
import image4 from '../assets/images/Hero/7.JPG';

const Hero = () => {
  const heroRef = useRef(null);
  const collegeNameRef = useRef(null);
  const clubNameRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const navigate = useNavigate();

  // Image slides for background
  const heroImages = [image1, image3, image4, image2];

  // Dynamic color schemes
  const colorSchemes = [
    { primary: '#ff6b6b', secondary: '#4ecdc4', accent: '#45b7d1' },
    { primary: '#a8e6cf', secondary: '#ff8b94', accent: '#ffaaa5' },
    { primary: '#ffd93d', secondary: '#6bcf7f', accent: '#4d96ff' },
    { primary: '#ff9ff3', secondary: '#54a0ff', accent: '#5f27cd' },
    { primary: '#00d2d3', secondary: '#ff9f43', accent: '#f0932b' },
    { primary: '#6c5ce7', secondary: '#a29bfe', accent: '#fd79a8' }
  ];

 

  const collegeName = "KONGU ENGINEERING COLLEGE";
  const clubName = "CULTURAL & MUSIC CLUB";

  useEffect(() => {
    // Initial load animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Background image rotation
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    // Color scheme rotation
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorSchemes.length);
    }, 3000);

    // Auto-close popup after 10 seconds
    const popupTimer = setTimeout(() => {
      setShowEventPopup(false);
    }, 10000);

    // Cleanup intervals
    return () => {
      clearInterval(imageInterval);
      clearInterval(colorInterval);
      clearTimeout(popupTimer);
    };
  }, [heroImages.length]);

  // Update CSS variables for dynamic colors
  useEffect(() => {
    const currentScheme = colorSchemes[colorIndex];
    const root = document.documentElement;
    root.style.setProperty('--dynamic-primary', currentScheme.primary);
    root.style.setProperty('--dynamic-secondary', currentScheme.secondary);
    root.style.setProperty('--dynamic-accent', currentScheme.accent);
  }, [colorIndex]);

  // Preload images
  useEffect(() => {
    heroImages.forEach(src => {
      const img = new window.Image();
      img.src = src;
      if (!document.head.querySelector(`link[rel='preload'][href='${src}']`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
    });
  }, []);

  // Hide Quick Actions when scrolling out of Hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const heroTop = heroRect.top;
        const heroBottom = heroRect.bottom;
        
        // Show Quick Actions only when Hero section is in viewport
        // Hide when Hero is scrolled past (heroBottom < window height / 2)
        if (heroBottom > window.innerHeight * 0.3) {
          setShowQuickActions(true);
        } else {
          setShowQuickActions(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleEventClick = () => {
    navigate('/Events');
  };

  const handleQuickAction = (link) => {
    navigate(link);
  };

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
            zIndex: index === currentImage ? 1 : 0
          }}
        />
      ))}
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay"></div>

      

      {/* Main Content */}
      <div className="hero-content-modern">
        {/* College Name with Letter Animation */}
        <div 
          ref={collegeNameRef} 
          className="college-name-container"
          onClick={() => window.open('https://kongu.ac.in', '_blank')}
          style={{ cursor: 'pointer' }}
        >
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
        <div className="scroll-text" onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>SINCE 1998</div>
        <div className="scroll-arrow">
          <div className="arrow-line"></div>
          <div className="arrow-point"></div>
        </div>
      </div>

      {/* Enhanced Event Popup */}
      {showEventPopup && (
        <div className="event-popup-modern">
          <div className="popup-backdrop" onClick={() => setShowEventPopup(false)}></div>
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
              <div className="event-namesa">Enthusia-2k26</div>
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