import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaEnvelope, FaInstagram, FaYoutube, FaArrowRight } from 'react-icons/fa';
import '../assets/styles/Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section - Logo and Quick Links */}
        <div className="footer-top">
          {/* Left Section - Logo */}
          <div className="footer-logo">
            <div className="logo-placeholder">
              
              <div className="logo-text">
                <span className="logo-main">Cultural & Music Club</span>
                <span className="logo-sub">Since 1998</span>
              </div>
            </div>
            
            <div className="social-links">
              <a 
                href="https://www.facebook.com/kec.cultural.and.music.clubs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="Facebook"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://www.facebook.com/kec.cultural.and.music.clubs', '_blank', 'noopener,noreferrer');
                }}
              >
                <FaFacebook />
              </a>
              <a 
                href="mailto:kecculturalclub@kongu.edu" 
                className="social-icon"
                aria-label="Email"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'mailto:kecculturalclub@kongu.edu';
                }}
              >
                <FaEnvelope />
              </a>
              <a 
                href="https://www.instagram.com/kec_cultural_and_music_clubs?igsh=MXhtd3JqZTQzZ2c1MQ==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="Instagram"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://www.instagram.com/kec_cultural_and_music_clubs?igsh=MXhtd3JqZTQzZ2c1MQ==', '_blank', 'noopener,noreferrer');
                }}
              >
                <FaInstagram />
              </a>
              <a 
                href="https://youtube.com/@kecculturalclub?si=5UxTOoNAU3s22z6N" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="YouTube"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://youtube.com/@kecculturalclub?si=5UxTOoNAU3s22z6N', '_blank', 'noopener,noreferrer');
                }}
              >
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Right Section - Quick Links */}
          <div className="footer-quicklinks">
            <h3>Quick Links</h3>
            <div className="quicklinks-grid">
              
              <Link to="/about"><FaArrowRight className="link-arrow" /> About</Link>
              <Link to="/office-bearers"><FaArrowRight className="link-arrow" /> Team</Link>
              <Link to="/event"><FaArrowRight className="link-arrow" /> Events</Link>
              <Link to="/contact"><FaArrowRight className="link-arrow" /> Contact</Link>
              <Link to="/help"><FaArrowRight className="link-arrow" /> Help</Link>
              <Link to="/feedback"><FaArrowRight className="link-arrow" /> Feedback</Link>
            </div>
          </div>
        </div>
        
        {/* Divider Line */}
        <div className="footer-divider"></div>
        
        {/* Bottom Section - Copyright and Creator */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© 2025 All Rights Reserved by KEC Cultural and Music Club</p>
          </div>
          <div className="creator-credit">
            <p>Designed & Developed by <a href="https://sakthis.netlify.app/" target="_blank" rel="noopener noreferrer">Sakthivel S</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;