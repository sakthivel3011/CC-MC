import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/root.css';
import '../styles/ESchedule.css';

const ESchedule = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 50,
    });
  }, []);

  const prelimsEvents = [
    { 
      time: '09:00 AM', 
      name: 'Comic Satire', 
      venue: 'Main Stage',
      description: 'Show your humor through stand-up comedy, mimicry, or any form of comic expression'
    },
    { 
      time: '09:45 AM', 
      name: 'Solo Instrumental', 
      venue: 'Music Hall',
      description: 'Showcase your musical talent with any instrument of your choice'
    },
    { 
      time: '10:30 AM', 
      name: 'Solo Dance', 
      venue: 'Dance Arena',
      description: 'Express yourself through dance - any style welcome'
    },
    { 
      time: '11:15 AM', 
      name: 'Solo Singing', 
      venue: 'Auditorium',
      description: 'Showcase your vocal talent - any language, any genre'
    },
    { 
      time: '12:00 PM', 
      name: 'Mime', 
      venue: 'Stage B',
      description: 'Tell a story through actions without words'
    },
    { 
      time: '12:45 PM', 
      name: 'Imitation', 
      venue: 'Main Stage',
      description: 'Showcase your talent in imitating famous personalities'
    },
    { 
      time: '01:30 PM', 
      name: 'Stand Up Comedy', 
      venue: 'Comedy Corner',
      description: 'Make the audience laugh with your original content'
    },
    { 
      time: '02:15 PM', 
      name: 'Anchoring', 
      venue: 'Conference Hall',
      description: 'Show your hosting skills and stage presence'
    },
    { 
      time: '03:00 PM', 
      name: 'Dual Dance', 
      venue: 'Dance Arena',
      description: 'Partner dance performance - any style'
    },
    { 
      time: '03:45 PM', 
      name: 'Group Instrumental', 
      venue: 'Music Hall',
      description: 'Band performance with multiple instruments'
    },
    { 
      time: '04:30 PM', 
      name: 'Group Dance', 
      venue: 'Main Stage',
      description: 'Group dance performance - minimum 4 members'
    },
    { 
      time: '05:15 PM', 
      name: 'Group Singing', 
      venue: 'Auditorium',
      description: 'Choir or group singing performance'
    },
    { 
      time: '06:00 PM', 
      name: 'Fashion Parade', 
      venue: 'Runway Hall',
      description: 'Showcase your fashion sense and runway skills'
    },
    { 
      time: '06:45 PM', 
      name: 'Movie Depiction', 
      venue: 'Theater',
      description: 'Recreate a famous movie scene'
    },
    { 
      time: '07:30 PM', 
      name: 'Skit', 
      venue: 'Stage B',
      description: 'Group drama performance'
    },
    { 
      time: '08:15 PM', 
      name: 'Short Film', 
      venue: 'Cinema Hall',
      description: 'Screen your original short film'
    },
  ];

  return (
    <div className="event-schedule-universe">
      {/* Hero Header */}
      <div className="event-hero-section" data-aos="fade-down">
        <div className="hero-badge-pill">DISCOVER THE MAGIC EVENTS</div>
        <h1 className="event-mega-heading">
          <span className="heading-primary">ENTHUSIA</span>
          <span className="heading-secondary">2026</span>
        </h1>
        <div className="hero-divider-line">
          <span className="divider-orb"></span>
          <span className="divider-beam"></span>
          <span className="divider-orb"></span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="schedule-main-container">
        {/* Prelims Schedule Box */}
        <div className="prelims-mega-box" data-aos="zoom-in" data-aos-delay="100">
          <div className="mega-box-header">
            <div className="header-icon-badge">
              <span className="icon-large">🎭</span>
            </div>
            <div className="header-title-group">
              <h2 className="box-main-title">Prelims Day</h2>
              <p className="box-subtitle">January 15, 2026</p>
              <div className="box-accent-line"></div>
            </div>
          </div>

          <div className="events-grid-container">
            {prelimsEvents.map((event, index) => (
              <div
                key={index}
                className="event-card-modern"
                data-aos="fade-up"
                data-aos-delay={index * 30}
              >
                <div className="card-body-section">
                  <h3 className="card-event-title">{event.name}</h3>
                  <div className="card-details">
                    <div className="card-time-venue">
                      <p className="card-time">{event.time}</p>
                      <p className="card-venue">{event.venue}</p>
                    </div>
                    <div className="card-description">{event.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ESchedule;