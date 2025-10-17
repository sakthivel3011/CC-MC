import React, { useState, useEffect } from 'react';

// Enthusia Components
import Sidebar from '../Enthusia/components/Sidebar';
import EnthuisiaHero from '../Enthusia/components/EnthuisiaHero';
import EventSection from '../Enthusia/components/EventSection';

// Enthusia Styles
import '../Enthusia/styles/Enthusia.css';


const Enthusia = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Add Font Awesome for icons
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fontAwesome = document.createElement('link');
      fontAwesome.rel = 'stylesheet';
      fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(fontAwesome);
    }

    // Add Google Fonts
    if (!document.querySelector('link[href*="Poppins"]')) {
      const googleFonts = document.createElement('link');
      googleFonts.rel = 'stylesheet';
      googleFonts.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap';
      document.head.appendChild(googleFonts);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="enthusia-page">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content */}
      <main className={`enthusia-main ${sidebarOpen ? 'with-sidebar' : ''}`}>
        {/* Hero Section */}
        <section id="enthusia-hero">
          <EnthuisiaHero />
        </section>

        {/* Events Section */}
        <EventSection />

        {/* Schedule Section */}
        <section id="schedule-section" className="schedule-section">
          <div className="container">
            <h2 className="section-title">
              Event Schedule
            </h2>
            <div className="schedule-grid">
              <div className="schedule-day">
                <h3 className="day-title">
                  <i className="fas fa-calendar-day"></i>
                  Day 1 - February 15, 2025
                </h3>
                <div className="schedule-timeline">
                  <div className="timeline-item">
                    <span className="time">9:00 AM</span>
                    <span className="event">Registration & Welcome</span>
                  </div>
                  <div className="timeline-item">
                    <span className="time">10:00 AM</span>
                    <span className="event">Solo Events Begin</span>
                  </div>
                  <div className="timeline-item">
                    <span className="time">2:00 PM</span>
                    <span className="event">Lunch Break</span>
                  </div>
                  <div className="timeline-item">
                    <span className="time">3:00 PM</span>
                    <span className="event">Dual Events</span>
                  </div>
                  <div className="timeline-item">
                    <span className="time">6:00 PM</span>
                    <span className="event">Cultural Evening</span>
                  </div>
                </div>
              </div>
              
              <div className="schedule-day">
                <h3 className="day-title">
                  <i className="fas fa-calendar-day"></i>
                  Day 2 - February 16, 2025
                </h3>
                <div className="schedule-timeline">
                  <div className="timeline-item">
                    <span className="time">9:00 AM</span>
                    <span className="event">Group Events Begin</span>
                  </div>
                  <div className="timeline-item">
                    <span className="time">12:00 PM</span>
                    <span className="event">Finals & Competitions</span>
                  </div>
                  <div className="timeline-item">
                    <span className="time">2:00 PM</span>
                    <span className="event">Lunch Break</span>
                  </div>
                  <div className="timeline-item">
                    <span className="time">4:00 PM</span>
                    <span className="event">Prize Distribution</span>
                  </div>
                  <div className="timeline-item">
                    <span className="time">6:00 PM</span>
                    <span className="event">Closing Ceremony</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section id="prizes-section" className="prizes-section">
          <div className="container">
            <h2 className="section-title">
              Prize Pool
            </h2>
            <div className="prizes-stats">
              <div className="prize-stat">
                <div className="stat-icon">🏆</div>
                <div className="stat-number">₹2,50,000+</div>
                <div className="stat-label">Total Prize Money</div>
              </div>
              <div className="prize-stat">
                <div className="stat-icon">🥇</div>
                <div className="stat-number">15</div>
                <div className="stat-label">First Prizes</div>
              </div>
              <div className="prize-stat">
                <div className="stat-icon">🎖️</div>
                <div className="stat-number">45</div>
                <div className="stat-label">Total Winners</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-section" className="contact-section">
          <div className="container">
            <h2 className="section-title">
              Get In Touch
            </h2>
            <div className="contact-grid">
              <div className="contact-info">
                <h3>Event Coordinators</h3>
                <div className="coordinator">
                  <h4>Cultural Secretary</h4>
                  <p><i className="fas fa-phone"></i> +91 98765 43210</p>
                  <p><i className="fas fa-envelope"></i> cultural@kec.edu.in</p>
                </div>
                <div className="coordinator">
                  <h4>Student Coordinator</h4>
                  <p><i className="fas fa-phone"></i> +91 87654 32109</p>
                  <p><i className="fas fa-envelope"></i> enthusia@kec.edu.in</p>
                </div>
              </div>
              
              <div className="venue-info">
                <h3>Venue Details</h3>
                <div className="venue-details">
                  <p><i className="fas fa-map-marker-alt"></i> Kongu Engineering College</p>
                  <p><i className="fas fa-road"></i> Perundurai, Erode - 638060</p>
                  <p><i className="fas fa-clock"></i> 9:00 AM - 6:00 PM</p>
                  <p><i className="fas fa-calendar"></i> February 15-16, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      
      </main>
    </div>
  );
};

export default Enthusia;