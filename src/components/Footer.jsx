import React from 'react';
import { FaFacebook, FaEnvelope, FaInstagram, FaLinkedin, FaYoutube, FaArrowRight } from 'react-icons/fa';
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
              <a href="https://www.facebook.com/kec.cultural.and.music.clubs" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook />
              </a>
              <a href="mailto:kecculturalclub@kongu.edu" className="social-icon">
                <FaEnvelope />
              </a>
              <a href="https://www.instagram.com/kec_cultural_and_music_clubs?igsh=MXhtd3JqZTQzZ2c1MQ==" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              
              <a href="https://youtube.com/@kecculturalclub?si=5UxTOoNAU3s22z6N" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Right Section - Quick Links */}
          <div className="footer-quicklinks">
            <h3>Quick Links</h3>
            <div className="quicklinks-grid">
              
              <a href="/about"><FaArrowRight className="link-arrow" /> About</a>
              <a href="/gallery"><FaArrowRight className="link-arrow" /> Gallery</a>
              <a href="/event"><FaArrowRight className="link-arrow" /> Events</a>
              <a href="/office-bearers"><FaArrowRight className="link-arrow" /> Team</a>
              <a href="/contact"><FaArrowRight className="link-arrow" /> Contact</a>
              <a href="/help"><FaArrowRight className="link-arrow" /> Help</a>
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
            <p>Website created by <a href="https://sakthis.xyz/" target="_blank" rel="noopener noreferrer">Sakthivel S</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;