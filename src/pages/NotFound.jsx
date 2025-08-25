import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMusic, FaCalendarAlt, FaMapMarkerAlt, FaEnvelope as FaMail, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/NotFound.css'; // We'll create this CSS file

const NotFound = () => {

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <div className="coming-soon-container">
      {/* Decorative elements */}

      
      <div className="content-wrapper">
        {/* 404 Section */}
        <div className="not-found-section" data-aos="fade-down">
          <h1 className="error-code">404</h1>
          <p className="not-found-text">Oops! Page not found</p>
          <p>But we have something exciting coming soon!</p>
        </div>
        
        {/* Coming soon text */}
        <div className="coming-soon-section" data-aos="fade-up">
          
          <div className="animated-text">
            {['C', 'O', 'M', 'I', 'N', 'G', ' ', 'S', 'O', 'O', 'N', '!'].map((letter, index) => (
              <span 
                key={index} 
                className="letter" 
                data-aos="zoom-in" 
                data-aos-delay={(index + 1) * 100}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
        </div>
        
        
        {/* Social links */}
        <div className="social-links" data-aos="fade-up" data-aos-delay="1900">
          <a href="https://www.facebook.com/kec.cultural.and.music.club" className="social-link"><FaFacebook /></a>
          <a href="https://www.instagram.com/kec_cultural_and_music_clubs?igsh=MXhtd3JqZTQzZ2c1MQ==" className="social-link"><FaInstagram /></a>
          <a href="mailto:kecculturalclub@kongu.edu" className="social-link"><FaMail /></a>
        </div>
      </div>
      
      {/* Footer */}
      
    </div>
  );
};

export default NotFound;