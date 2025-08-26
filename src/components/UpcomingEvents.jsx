import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/UpcomingEvents.css'; // Assuming you have a CSS file for styling
import video from '../assets/videos/final.mp4';
import AOS from 'aos';
import 'aos/dist/aos.css';

const UpcomingEvents = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  // Events listed here are open to everyone and are not restricted to KEC students. 
  // These are outside the college curriculum, focusing on activities like dance, music, and art.
  const events = [
    {
      id: 1,
      title: "Sketch-2k25",
      date: "September, 2025",
      description: "A spectacular cultural extravaganza featuring music, dance, and art from around the world. Open to all, not for KEC students.",
      price: "RS 500",
    },
    {
      id: 2,
      title: "Raaga-2k25",
      date: "November, 2025",
      description: " Group singing competition for KEC students only. Form your group and showcase your talent.",
      price: "FREE",
    },
    {
      id: 3,
      title: "Enthusia-2k25",
      date: "January, 2025",
      description: "The biggest 2-day cultural event in KEC! Open only for KEC students. Experience music, dance, art, and more.",
      price: "FREE",
    }
  ];

  return (
    <section className="events-section" id="events">
      {/* Background Video */}
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>
        
      <div className="events-container">
        <h2 className="section-title" data-aos="fade-down">Upcoming Events..</h2>
        <p className="section-subtitle" data-aos="fade-down" data-aos-delay="100">Don't miss out on these exciting events coming soon!</p>
        
        <div className="events-grid">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className="event-card"
              data-aos="fade-up"
              data-aos-delay={200 + (index * 100)}
            >
              <div className="event-category">{event.category}</div>
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p className="event-description">{event.description}</p>
                <div className="event-footer">
                  <span className="event-price">{event.price}</span>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;