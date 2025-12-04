import React, { useEffect, useState, useCallback } from "react";
import F1 from "../assets/images/faculty/F1.jpeg";
import F2 from "../assets/images/faculty/F2.jpg";
import F3 from "../assets/images/faculty/F3.jpg";
import F4 from "../assets/images/faculty/F4.JPG";
import "../assets/styles/Pillars.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Pillars = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  // Handle image loading
  const handleImageLoad = useCallback((imageId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [imageId]: { loading: false, loaded: true }
    }));
  }, []);

  const handleImageError = useCallback((imageId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [imageId]: { loading: false, loaded: false, error: true }
    }));
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 120,
      delay: 100
    });

    // Initialize loading states for all images
    const pillarsData = [
      { id: 1, image: F1 },
      { id: 2, image: F2 },
      { id: 3, image: F3 },
      { id: 4, image: F4 }
    ];

    const initialLoadingStates = {};
    pillarsData.forEach(pillar => {
      initialLoadingStates[pillar.id] = { loading: true, loaded: false, error: false };
    });
    setImageLoadingStates(initialLoadingStates);

    // Preload all faculty images
    pillarsData.forEach(pillar => {
      const img = new window.Image();
      img.onload = () => handleImageLoad(pillar.id);
      img.onerror = () => handleImageError(pillar.id);
      img.src = pillar.image;
    });

    // Trigger visibility animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [handleImageLoad, handleImageError]);

  const handlePillarClick = (url) => {
    console.log('Navigate to pillar URL:', url);
    // Open URL in new tab
    window.open(url, '_blank');
  };

  const pillars = [
    {
      id: 1,
      name: "Mr. K.V. Satheesh Kumar",
      role: "Faculty Coordinator",
      department: "Dept Of Mechanical Engineering",
      image: F1,
      url: "https://sites.google.com/a/kongu.edu/satheesh-kumar-k-v/",
    },
    {
      id: 2,
      name: "Dr. V.N.Kowshalaya",
      role: "Faculty Coordinator",
      department: "Dept Of Chemistry",
      image: F2,
      url: "https://sites.google.com/a/kongu.edu/kowshalya-chemistry/",
    },
    {
      id: 3,
      name: "Ms. S.Keerthana",
      role: "Faculty Coordinator",
      department: "Dept Of CT-UG",
      image: F3,
      url: "https://docs.google.com/document/d/e/2PACX-1vTB3KoDueS2YqC-ApQpxr01sXrqeDQ7jCzfa8R13hpjZ81Nh3RJ2eHhLuLrOhOEcw/pub",
    },
    {
      id: 4,
      name: "Ms. K.S.Sharvanthika",
      role: "Faculty Coordinator",
      department: "Dept Of CT-UG",
      image: F4,
      url: "https://docs.google.com/document/d/1VhY1TUmpmSAR7NuxPEczVS9hrJpC0uDeelOL852NL2o/pub",
    },
  ];

  return (
    <section className={`pillars-section ${isVisible ? 'section-visible' : ''}`}>
      <div className="pillars-background-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>
      
      <div className="pillars-header" data-aos="zoom-in">
        
        <h2>PILLARS OF CULTURAL AND MUSIC CLUB</h2>
        <div className="subtitle-container">
          <p>They are the Pillars of the Club, Showing Exceptional Dedication.</p>
         
        </div>
      </div>
      
      <div className="pillars-container">
        {pillars.map((pillar, index) => (
          <div 
            className="pillar-card"
            key={pillar.id}
            data-aos="flip-up"
            data-aos-delay={index * 150}
            onClick={() => handlePillarClick(pillar.url)}
            style={{ cursor: 'pointer' }}
          >
            <div className="pillar-card-inner">
              <div className="pillar-image-container">
                <div className="image-overlay"></div>
                
                {/* Skeleton Loading */}
                {imageLoadingStates[pillar.id]?.loading && (
                  <div className="pillar-image-skeleton">
                    <div className="skeleton-shimmer"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-avatar"></div>
                      <div className="skeleton-lines">
                        <div className="skeleton-line skeleton-line-long"></div>
                        <div className="skeleton-line skeleton-line-medium"></div>
                        <div className="skeleton-line skeleton-line-short"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Actual Image */}
                <img 
                  src={pillar.image} 
                  alt={pillar.name} 
                  className={`pillar-image ${
                    imageLoadingStates[pillar.id]?.loaded ? 'image-loaded' : 'image-loading'
                  }`}
                  onLoad={() => handleImageLoad(pillar.id)}
                  onError={() => handleImageError(pillar.id)}
                  style={{
                    opacity: imageLoadingStates[pillar.id]?.loaded ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                  }}
                />
                
                {/* Error state */}
                {imageLoadingStates[pillar.id]?.error && (
                  <div className="pillar-image-error">
                    <div className="error-icon">⚠️</div>
                    <p>Image failed to load</p>
                  </div>
                )}
                
                {/* Always visible name */}
                <div className="pillar-name-always">
                  <h3>{pillar.name}</h3>
                </div>
                
                {/* Hover details */}
                <div className="pillar-info">
                  <div className="info-content">
                    
                    <div className="dept-container">
                      <span className="dept-icon">🏛️</span>
                      <p className="pillar-dept">{pillar.department}</p>
                    </div>
                    <div className="role-container">
                      <span className="role-icon"></span>
                      <p className="pillar-role">{pillar.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pillars-footer" data-aos="fade-up" data-aos-delay="600">
        <div className="appreciation-message">
          <p>✨ Honoring our dedicated faculty who guide and inspire ✨</p>
        </div>
      </div>
    </section>
  );
};

export default Pillars;