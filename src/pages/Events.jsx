import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/Event.css';
// Example local images (replace with your actual images)
import pos1 from '../assets/images/events/poster/1.png';
import pos2 from '../assets/images/events/poster/2.png';
import pos3 from '../assets/images/events/poster/3.png';
import pos4 from '../assets/images/events/poster/4.png';
import pos5 from '../assets/images/events/poster/5.png';
import pos6 from '../assets/images/events/poster/6.png';
import pos7 from '../assets/images/events/poster/7.png';
// onam
import ona1 from '../assets/images/events/onam/1.JPG';
import ona2 from '../assets/images/events/onam/2.JPG';
import ona3 from '../assets/images/events/onam/3.jpg';
import ona4 from '../assets/images/events/onam/4.JPG';
//ina
import ina1 from '../assets/images/events/ina/1.JPG';
import ina2 from '../assets/images/events/ina/2.JPG';
import ina3 from '../assets/images/events/ina/3.JPG';
import ina4 from '../assets/images/events/ina/4.JPG';
import ina5 from '../assets/images/events/ina/5.JPG';
//raaga

// Image skeleton loader component
const ImageSkeleton = () => (
  <div className="image-skeleton">
    <div className="skeleton-shimmer"></div>
    <div className="skeleton-pulse"></div>
  </div>
);

// Image with loading state component
const LazyImage = ({ src, alt, className, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [shouldLoad, setShouldLoad] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px' // Start loading 50px before image enters viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!src || !shouldLoad) {
      return;
    }

    // Add a small delay to show skeleton briefly for better UX
    const timer = setTimeout(() => {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
        setIsError(false);
      };
      
      img.onerror = () => {
        setIsError(true);
        setIsLoading(false);
      };
      
      // Start loading the image
      img.src = src;
    }, 150); // Small delay to show skeleton

    return () => clearTimeout(timer);
  }, [src, shouldLoad]);

  if (isError) {
    return (
      <div className="image-error" ref={containerRef}>
        <span>🖼️ Image not available</span>
      </div>
    );
  }

  return (
    <div className="lazy-image-container" onClick={onClick} ref={containerRef}>
      {isLoading && <ImageSkeleton />}
      {shouldLoad && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className={className}
          style={{ 
            display: isLoading ? 'none' : 'block',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.4s ease'
          }}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      )}
    </div>
  );
};

// Event data with timestamps and images
const eventsData = [
  {
    id: 1,
    title: "Inauguration",
    date: "2025-07-15T10:00:00",
    endDate: "2025-07-15T18:00:00",
    description: "Inauguration of the new cultural Club",
    category: "completed",
    images: [pos1 , ina1, ina2, ina3, ina4, ina5]
  },
  {
    id: 2,
    title: "Techno Cultural Fest",
    date: "2025-08-21T14:30:00",
    endDate: "2025-08-23T22:00:00",
    description: "Two days of music, art, and culture for School students",
    category: "completed",
    images: [pos2]
  },
  {
    id: 3,
    title: "Founder's Day",
    date: "2025-08-23T09:00:00",
    endDate: "2025-08-23T18:00:00",
    description: "Celebrating the founding of our institution",
    category: "completed",
    images: [pos3]
  },
  {
    id: 4,
    title: "Onam Celebration-2k25",
    date: "2025-08-31T23:45:00",
    endDate: "2025-09-02T10:44:00",
    description: "This Onam is the 1st time in KEC.",
    category: "upcoming",
    images: [pos4, ona1, ona2, ona3 , ona4]
   
  },
  {
    id: 5,
    title: "Raaga-2k25",
    date: "2025-09-22T13:11:00",
    endDate: "2025-09-26T16:15:00",
    description: "Group singing competition for KEC students only. Form your group and showcase your talent.",
    category: "upcoming",
    images: [pos5]
  },

  {
    id: 6,
    title: "Enthusia-2k26",
    date: "2026-02-14T07:00:00",
    endDate: "2026-02-04T17:00:00",
    description: "The biggest 2-day cultural event in KEC! Open only for KEC students. Experience music, dance, art, and more.",
    category: "upcoming",
    images: [pos7]
    
  },
];

// Image Carousel Component
const ImageCarousel = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const carouselRef = useRef(null);

  // Preload images for smoother transitions
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((imageSrc, index) => {
        if (!loadedImages.has(index)) {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]));
          };
          img.src = imageSrc;
        }
      });
    };

    // Preload current and next few images
    preloadImages();
  }, [images, currentIndex]);

  useEffect(() => {
    if (images.length <= 1) return;
    

    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }
    }, 3000); // Faster: 1 second per slide

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
                <LazyImage 
                  src={image} 
                  alt={`Event ${index + 1}`} 
                  className="carousel-image"
                />
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
      // Auto-close after 8 seconds instead of 5 for better visibility
      const timer = setTimeout(() => {
        setShowOngoingPopup(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [events]);

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
    
    // Preload first few event images for better performance
    useEffect(() => {
      const preloadEventImages = () => {
        categoryEvents.slice(0, 3).forEach(event => {
          if (event.images && event.images[0]) {
            const img = new Image();
            img.src = event.images[0];
          }
        });
      };
      
      preloadEventImages();
    }, [categoryEvents]);
    
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
            <LazyImage 
              src={(event.images && event.images[0]) ? event.images[0] : pos1} 
              alt={event.title}
              className="event-card-image"
            />
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
                <Link to="/raaga" className="register-btn center-btn">Register Now</Link>
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
            className={`category-btn ${activeCategory === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveCategory('upcoming')}
          >
            Upcoming Events ({categorizedEvents.upcoming.length})
          </button>
          <button 
            className={`category-btn ${activeCategory === 'ongoing' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ongoing')}
          >
            Ongoing Events ({categorizedEvents.ongoing.length})
          </button>
          <button 
            className={`category-btn ${activeCategory === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveCategory('completed')}
          >
            Completed Events ({categorizedEvents.completed.length})
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
                <Link to="/raaga-registration" className="register-btn center-btn">Register Now</Link>
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
            <button className="close-popup-btn" onClick={() => setShowOngoingPopup(false)}>×</button>
            <h3>🎉 Live Events Happening Now!</h3>
            {categorizedEvents.ongoing.length > 0 ? (
              <>
                <p>Don't miss out on these exciting events currently running:</p>
                {categorizedEvents.ongoing.map(ev => (
                  <div key={ev.id} className="event-info">
                    <span>{ev.title}</span>
                    <span>📅 Started: {new Date(ev.date).toLocaleDateString('en-GB')} at {new Date(ev.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    {ev.endDate && (
                      <span>⏰ Ends: {new Date(ev.endDate).toLocaleDateString('en-GB')} at {new Date(ev.endDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    )}
                    <div className="popup-register-section">
                      <Link to="/raaga" className="popup-register-btn">
                        🎯 Register Now
                      </Link>
                    </div>
                  </div>
                ))}
                <p style={{marginTop: '15px', fontSize: '0.95rem', opacity: '0.9'}}>
                  Click "Register Now" to join the event or explore more details below!
                </p>
              </>
            ) : (
              <>
                <p>🎊 Great news! You have events happening right now!</p>
                <div className="event-info">
                  <span>Check the "Ongoing Events" section below to see what's currently active</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Events = EventPage;
export default Events;