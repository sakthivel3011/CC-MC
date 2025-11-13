import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/root.css';
import '../styles/Result.css';

const Result = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="re-container">
      {/* Hero Section */}
      <div className="re-hero" data-aos="fade-down">
        <div className="re-badge">ENTHUSIA 2026</div>
        <h1 className="re-title">
          <span className="re-title-text">Results</span>
        </h1>
        <div className="re-divider">
          <span className="re-divider-dot"></span>
          <span className="re-divider-line"></span>
          <span className="re-divider-dot"></span>
        </div>
      </div>

      {/* Coming Soon Card */}
      <div className="re-content" data-aos="zoom-in-up" data-aos-delay="200">
        <div className="re-card">
          <div className="re-card-icon">⏳</div>
          <h2 className="re-card-title">Results Coming Soon</h2>
          <p className="re-card-description">
            Finalists will be announced here. Stay tuned for the big reveal!
          </p>
          <div className="re-card-badge">
            <span className="re-badge-pulse"></span>
            <span className="re-badge-text">Stay Tuned</span>
          </div>
        </div>
      </div>

      {/* Bottom Announcement */}
      <div className="re-announcement" data-aos="fade-up" data-aos-delay="400">
        <p className="re-announcement-text">
          Get ready for the exciting announcements!
        </p>
      </div>
    </div>
  );
};

export default Result;