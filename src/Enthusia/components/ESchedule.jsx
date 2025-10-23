import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/root.css';
import '../styles/ESchedule.css';

const ESchedule = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 50,
      easing: 'ease-out-cubic'
    });
  }, []);

  const allEvents = [
    'Comic Satire',
    'Solo Instrumental',
    'Solo Dance',
    'Solo Singing',
    'Mime',
    'Imitation',
    'Stand Up Comedy',
    'Anchoring',
    'Dual Dance',
    'Group Instrumental',
    'Group Dance',
    'Group Singing',
    'Fashion Parade',
    'Movie Depiction',
    'Skit',
    'Short Film'
  ];

  return (
    <div className="event-schedule-universe">
      {/* Hero Header */}
      <div className="event-hero-section" data-aos="fade-down" data-aos-duration="1000">
        <div className="hero-badge-pill">ENTHUSIA 2026 RESULTS</div>
        <h1 className="event-mega-heading">
          <span className="heading-primary"></span>
          <span className="heading-secondary">RESULTS</span>
        </h1>
        <div className="hero-divider-line">
          <span className="divider-orb"></span>
          <span className="divider-beam"></span>
          <span className="divider-orb"></span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="schedule-main-container">
        {/* Results Grid */}
        <div className="results-grid-container">
          {allEvents.map((eventName, index) => (
            <div
              key={index}
              className="result-card-box"
              data-aos="zoom-in"
              data-aos-delay={index * 50}
              data-aos-duration="600"
            >
              <div className="result-card-header">
                <div className="event-number">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="result-event-name">{eventName}</h3>
              </div>
              <div className="result-status-section">
                <div className="coming-soon-badge">
                  <span className="badge-icon">⏳</span>
                  <span className="badge-text">Coming Soon!</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcement Section */}
      
    </div>
  );
};

export default ESchedule;