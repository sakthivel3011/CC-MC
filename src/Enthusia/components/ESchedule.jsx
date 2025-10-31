import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/root.css'; // Your color variables
import '../styles/ESchedule.css'; // The new CSS with the script font

const ESchedule = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
    });
  }, []);

  // This is the component structure that uses the new script font for the heading
  return (
    <div className="event-schedule-universe">
      {/* Hero Section */}
      <div
        className="event-hero-section"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <div className="hero-badge-pill">ENTHUSIA 2026</div>
        <h1 className="event-mega-heading">
          {/* This uses the new "Dancing Script" font */}
          <span className="heading-primary">Results</span>
        </h1>
        <div className="hero-divider-line">
          <span className="divider-orb"></span>
          <span className="divider-beam"></span>
          <span className="divider-orb"></span>
        </div>
      </div>

      {/* Main Content Container with a single "Coming Soon" box */}
      <div
        className="schedule-main-container"
        data-aos="zoom-in-up"
        data-aos-duration="800"
      >
        <div className="single-result-container">
          <div className="big-result-card">
            <div className="result-card-header">
              <h3 className="result-event-name">
                Preliminary Results Are Coming Soon!
              </h3>
            </div>
            <div className="result-status-section">
              <div className="coming-soon-badge big-coming-soon">
                <span className="badge-icon">⏳</span>
                <span className="badge-text">Stay Tuned</span>
              </div>
            </div>
          </div>
          
        </div>

      </div>

      {/* Optional Announcement Text at the bottom */}
      <div className="announcement-section" data-aos="fade-up" data-aos-delay="200">
        <p className="announcement-text">
          Finalists will be announced here. Get ready for the reveal!
        </p>
      </div>
    </div>
  );
};

export default ESchedule;