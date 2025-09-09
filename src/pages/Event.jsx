import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/Event.css';

// Event data with timestamps and images
const eventsData = [
  {
    id: 1,
    title: "Inauguration",
    date: "2025-07-15T10:00:00",
    endDate: "2025-07-15T18:00:00",
    description: "Inauguration of the new cultural Club",
    category: "completed",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 2,
    title: "Techno Cultural Fest",
    date: "2025-08-21T14:30:00",
    endDate: "2025-08-23T22:00:00",
    description: "Two days of music, art, and culture for School students",
    category: "completed",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501281667305-0d4e0ab15754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1472653525502-fc569e405a74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ]
  },
  // Add images to other events as needed
  {
    id: 3,
    title: "Founder's Day",
    date: "2025-08-23T09:00:00",
    endDate: "2025-08-23T18:00:00",
    description: "Celebrating the founding of our institution",
    category: "completed",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501281667305-0d4e0ab15754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 4,
    title: "Onam Celebration-2k25",
    date: "2025-08-31T23:45:00",
    endDate: "2025-09-02T10:44:00",
    description: "This Onam is the 1st time in KEC.",
    category: "upcoming",
    images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1472653525502-fc569e405a74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 5,
    title: "Sketch-2k25",
    date: "2025-09-30T09:00:00",
    endDate: "2025-10-01T17:00:00",
    description: "featuring music, dance, and art from around the world. Open to all, not for KEC students.",
    category: "upcoming",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1472653525502-fc569e405a74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 6,
    title: "Workshop",
    date: "2025-09-10T20:00:00",
    endDate: "2025-10-15T23:59:59",
    description: "Celebrate the new year in style",
    category: "upcoming",
    images: [
      "https://images.unsplash.com/photo-1472653525502-fc569e405a74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 7,
    title: "Raaga-2k25",
    date: "2025-10-11T09:18:00",
    endDate: "2025-10-15T09:30:00",
    description: "Group singing competition for KEC students only. Form your group and showcase your talent.",
    category: "upcoming",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: 8,
    title: "Enthusia-2k26",
    date: "2025-12-24T07:00:00",
    endDate: "2026-01-04T17:00:00",
    description: "The biggest 2-day cultural event in KEC! Open only for KEC students. Experience music, dance, art, and more.",
    category: "upcoming",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501281667305-0d4e0ab15754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1472653525502-fc569e405a74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    ]
  },
];

// Image Carousel Component
const ImageCarousel = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-overlay" onClick={onClose}>
      <div className="carousel-container" onClick={(e) => e.stopPropagation()}>
        <button className="carousel-close-btn" onClick={onClose}>×</button>
        <div 
          className="carousel-slides"
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div className="carousel-slide" key={index}>
                <img src={image} alt={`Event ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <>
            <button className="carousel-btn carousel-btn-prev" onClick={goToPrev}>
              &#10094;
            </button>
            <button className="carousel-btn carousel-btn-next" onClick={goToNext}>
              &#10095;
            </button>
            <div className="carousel-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToImage(index)}
                ></span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const EventPage = () => {
  const [activeCategory, setActiveCategory] = useState('ongoing');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [countdowns, setCountdowns] = useState({});
  const [events, setEvents] = useState(eventsData);
  const [nextEvent, setNextEvent] = useState(null);
  const [showOngoingPopup, setShowOngoingPopup] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Show ongoing events popup on page load
  useEffect(() => {
    const hasOngoingEvents = events.some(event => event.category === 'ongoing');
    if (hasOngoingEvents) {
      setShowOngoingPopup(true);
      const timer = setTimeout(() => {
        setShowOngoingPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Update event statuses based on current time
  useEffect(() => {
    const updateEventStatuses = () => {
      const now = new Date();
      const updatedEvents = events.map(event => {
        const eventDate = new Date(event.date);
        const eventEndDate = event.endDate ? new Date(event.endDate) : null;
        if (eventEndDate && now > eventEndDate) {
          return { ...event, category: 'completed' };
        } else if (now > eventDate && (!eventEndDate || now < eventEndDate)) {
          return { ...event, category: 'ongoing' };
        } else if (now < eventDate) {
          return { ...event, category: 'upcoming' };
        }
        return event;
      });
      setEvents(prevEvents => {
        const prevStr = JSON.stringify(prevEvents);
        const updatedStr = JSON.stringify(updatedEvents);
        if (prevStr !== updatedStr) {
          return updatedEvents;
        }
        return prevEvents;
      });
      // Find the next upcoming event
      const upcomingEvents = updatedEvents.filter(e => e.category === 'upcoming');
      if (upcomingEvents.length > 0) {
        setNextEvent(upcomingEvents[0]);
      } else {
        setNextEvent(null);
      }
    };
    updateEventStatuses();
    const interval = setInterval(updateEventStatuses, 1000); // Update every second for instant switch
    return () => clearInterval(interval);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdowns = {};
      
      // Calculate countdowns for ongoing events
      events.forEach(event => {
        if (event.category === 'ongoing' && event.endDate) {
          const now = new Date();
          const endDate = new Date(event.endDate);
          const distance = endDate - now;
          
          if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            newCountdowns[event.id] = { days, hours, minutes, seconds };
          } else {
            newCountdowns[event.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }
        }
        
        if (event.category === 'upcoming') {
          const now = new Date();
          const eventDate = new Date(event.date);
          const distance = eventDate - now;
          
          if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            newCountdowns[event.id] = { days, hours, minutes, seconds };
          } else {
            newCountdowns[event.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }
        }
      });
      
      setCountdowns(newCountdowns);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [events]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const handleImageClick = (event) => {
    setSelectedEvent(event);
    setShowCarousel(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedEvent(null);
  };

  const closeCarousel = () => {
    setShowCarousel(false);
    setSelectedEvent(null);
  };

  const renderCountdown = (event, isCompact = false) => {
    if (!countdowns[event.id]) return null;
    const { days, hours, minutes, seconds } = countdowns[event.id];
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return null; // Don't show countdown-ended for nextEvent
    }
    return (
      <div className={`countdown ${isCompact ? 'countdown-compact' : 'countdown-row'}`}>
        <div className="countdown-item">
          <span className="countdown-value">{days}</span>
          <span className="countdown-label">DAYS</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{hours}</span>
          <span className="countdown-label">HOURS</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{minutes}</span>
          <span className="countdown-label">MINUTES</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{seconds}</span>
          <span className="countdown-label">SECONDS</span>
        </div>
      </div>
    );
  };

  const renderEvents = (category) => {
    const categoryEvents = events.filter(event => event.category === category);
    return categoryEvents.map(event => {
      const now = new Date();
      const eventDate = new Date(event.date);
      const eventEndDate = event.endDate ? new Date(event.endDate) : null;
      const isRegisterOpen = event.category === 'ongoing' && now >= eventDate && (!eventEndDate || now < eventEndDate);
      return (
        <div 
          key={event.id} 
          className="event-card"
          data-aos="fade-up"
        >
          <div className="event-image" onClick={() => handleImageClick(event)}>
            <img src={event.images[0]} alt={event.title} />
            <div className="image-overlay">
              <span>View Gallery</span>
            </div>
          </div>
          <div className="event-content">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-date">{new Date(event.date).toLocaleDateString('en-GB')}</p>
            <p className="event-description">{event.description}</p>
            {/* Only show countdown for ongoing events */}
            {event.category === 'ongoing' && renderCountdown(event, true)}
            {isRegisterOpen && (
                <button className="register-btn center-btn">Register Now</button>
            )}
            {!isRegisterOpen && event.category === 'ongoing' && (
              <button className="register-btn" disabled>Registration Closed</button>
            )}
          </div>
        </div>
      );
    });
  };

  const categorizedEvents = {
    completed: events.filter(event => event.category === 'completed'),
    ongoing: events.filter(event => event.category === 'ongoing'),
    upcoming: events.filter(event => event.category === 'upcoming'),
  };

  return (
    <div className="event-page">
      <div className="container">
        <header data-aos="fade-down">
          <h1>Event Countdown</h1>
          <p>Stay updated with our latest events</p>
        </header>
        
        {nextEvent && (
          <div className="countdown-container" data-aos="fade-up">
            <h2 className="countdown-title">Next Event: {nextEvent.title}</h2>
            <p className="event-date" style={{textAlign: 'center', fontWeight: 'bold', color: '#39e67b', fontSize: '1.3rem'}}>{new Date(nextEvent.date).toLocaleDateString('en-GB')}</p>
            {renderCountdown(nextEvent) || <div className="countdown-ended">Event has ended</div>}
          </div>
        )}
        
        <div className="categories" data-aos="fade-up">
          <button 
            className={`category-btn ${activeCategory === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveCategory('completed')}
          >
            Completed Events ({categorizedEvents.completed.length})
          </button>
          <button 
            className={`category-btn ${activeCategory === 'ongoing' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ongoing')}
          >
            Ongoing Events ({categorizedEvents.ongoing.length})
          </button>
          <button 
            className={`category-btn ${activeCategory === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveCategory('upcoming')}
          >
            Upcoming Events ({categorizedEvents.upcoming.length})
          </button>
        </div>
        
        <div className="events-grid">
          {renderEvents(activeCategory)}
        </div>
      </div>
      
      {showPopup && selectedEvent && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>×</button>
            <h2>{selectedEvent.title}</h2>
            <p className="popup-date">{new Date(selectedEvent.date).toLocaleDateString('en-GB')}</p>
            <p className="popup-description">{selectedEvent.description}</p>
            {selectedEvent.category === 'ongoing' && (
              <div className="popup-countdown">
                <h3>Time Remaining:</h3>
                {renderCountdown(selectedEvent)}
                <a href="/NotFound" className="register-btn center-btn">Register Now</a>
              </div>
            )}
            {selectedEvent.category === 'upcoming' && (
              <div className="popup-countdown">
                <h3>Time Until Event:</h3>
                {renderCountdown(selectedEvent)}
              </div>
            )}
          </div>
        </div>
      )}

      {showCarousel && selectedEvent && (
        <ImageCarousel images={selectedEvent.images} onClose={closeCarousel} />
      )}

      {showOngoingPopup && (
        <div className="ongoing-popup">
          <div className="ongoing-popup-content">
            <h3>Ongoing Events</h3>
            {categorizedEvents.ongoing.length > 0 ? (
              categorizedEvents.ongoing.map(ev => (
                <div key={ev.id} className="event-info">
                  <span style={{fontWeight:'bold'}}>{ev.title}</span><br/>
                  <span>{new Date(ev.date).toLocaleDateString('en-GB')} {new Date(ev.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              ))
            ) : (
              <p>You have 0 events happening right now!</p>
            )}
            <button className="close-popup-btn" onClick={() => setShowOngoingPopup(false)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Event = EventPage;
export default Event;