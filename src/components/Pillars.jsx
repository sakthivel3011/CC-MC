import React, { useEffect, useState } from "react";
import F1 from "../assets/images/faculty/F1.jpeg";
import F2 from "../assets/images/faculty/F2.jpg";
import F3 from "../assets/images/faculty/F3.jpg";
import F4 from "../assets/images/faculty/F4.JPG";
import "../assets/styles/Pillars.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Pillars = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 120,
      delay: 100
    });

    // Preload all faculty images for instant display
    [F1, F2, F3, F4].forEach(src => {
      if (!document.head.querySelector(`link[rel='preload'][href='${src}']`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
      const img = new window.Image();
      img.src = src;
    });

    // Trigger visibility animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
        <div className="header-decoration">
          <span className="decoration-line left"></span>
          <span className="decoration-icon">⭐</span>
          <span className="decoration-line right"></span>
        </div>
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
                <img 
                  src={pillar.image} 
                  alt={pillar.name} 
                  className="pillar-image"
                  loading="lazy"
                />
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
                      <span className="role-icon">👨‍🏫</span>
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
          <p>✨ Honoring our dedicated faculty who guide and inspire our cultural journey ✨</p>
        </div>
      </div>
    </section>
  );
};

export default Pillars;