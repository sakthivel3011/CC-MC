import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { 
  FaMicrophone, 
  FaMusic, 
  FaTheaterMasks, 
  FaGuitar, 
  FaVideo, 
  FaTshirt,
  FaUsers, 
  FaUser, 
  FaUserFriends,
  FaStar,
  FaTrophy,
  FaTicketAlt,
  FaFire,
  FaAward,
  FaDrum,
  FaPaintBrush,
  FaCamera,
  FaMask,
  FaRunning,
  FaLaugh,
  FaBullhorn
} from 'react-icons/fa';
import { 
  MdMusicNote,
  MdTheaters,
  MdVideocam,
  MdBrush,
  MdClose
} from 'react-icons/md';
import { Link } from 'react-router-dom';
//removed AOS for better performance
import '../styles/EEvents.css';

const EEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Removed AOS initialization for better performance

  const allEvents = [
    {
      id: 1,
      name: 'Comic Satire',
      icon: FaTheaterMasks,
      participants: '1',
      type: 'solo',
      color: '#FF6B6B',
      description: 'Hilarious solo comedy performance'
    },
    {
      id: 2,
      name: 'Solo Instrumental',
      icon: FaGuitar,
      participants: '1',
      type: 'solo',
      color: '#4ECDC4',
      description: 'Showcase your musical talent with any instrument'
    },
    {
      id: 3,
      name: 'Solo Dance',
      icon: FaRunning,
      participants: '1',
      type: 'solo',
      color: '#45B7D1',
      description: 'Express yourself through solo dance performance'
    },
    {
      id: 4,
      name: 'Solo Singing',
      icon: FaMicrophone,
      participants: '1',
      type: 'solo',
      color: '#96CEB4',
      description: 'Showcase your vocal talent in solo performance'
    },
    {
      id: 5,
      name: 'Mime',
      icon: FaMask,
      participants: '1',
      type: 'solo',
      color: '#FFEAA7',
      description: 'Silent acting performance without words'
    },
    {
      id: 6,
      name: 'Imitation',
      icon: FaTheaterMasks,
      participants: '1',
      type: 'solo',
      color: '#DDA0DD',
      description: 'Impersonate famous personalities or characters'
    },
    {
      id: 7,
      name: 'Stand Up Comedy',
      icon: FaLaugh,
      participants: '1',
      type: 'solo',
      color: '#FFA500',
      description: 'Make the audience laugh with your comedy routine'
    },
    {
      id: 8,
      name: 'Anchoring',
      icon: FaBullhorn,
      participants: '1',
      type: 'solo',
      color: '#9370DB',
      description: 'Show your hosting and public speaking skills'
    },
    {
      id: 9,
      name: 'Dual Dance',
      icon: FaRunning,
      participants: '2',
      type: 'dual',
      color: '#FF7675',
      description: 'Synchronized dance performance with partner'
    },
    {
      id: 10,
      name: 'Group Instrumental',
      icon: FaMusic,
      participants: '3-8',
      type: 'group',
      color: '#74B9FF',
      description: 'Musical performance with group coordination'
    },
    {
      id: 11,
      name: 'Group Dance',
      icon: FaRunning,
      participants: '3-8',
      type: 'group',
      color: '#00B894',
      description: 'Energetic group dance performance'
    },
    {
      id: 12,
      name: 'Group Singing',
      icon: MdMusicNote,
      participants: '3-8',
      type: 'group',
      color: '#FDCB6E',
      description: 'Harmonious group singing performance'
    },
    {
      id: 13,
      name: 'Fashion Parade',
      icon: FaTshirt,
      participants: '5-10',
      type: 'group',
      color: '#E17055',
      description: 'Showcase fashion and modeling talent'
    },
    {
      id: 14,
      name: 'Movie Depiction',
      icon: MdVideocam,
      participants: '3-8',
      type: 'group',
      color: '#A29BFE',
      description: 'Recreate famous movie scenes'
    },
    {
      id: 15,
      name: 'Skit',
      icon: MdTheaters,
      participants: '3-8',
      type: 'group',
      color: '#FD79A8',
      description: 'Short dramatic or comedy play performance'
    },
    {
      id: 16,
      name: 'Short Film',
      icon: FaCamera,
      participants: '3-10',
      type: 'group',
      color: '#00CEC9',
      description: 'Create and present short film projects'
    }
  ];

  const EventCard = ({ event, isSmall = false }) => {
    const IconComponent = event.icon;
    const cardClass = isSmall ? "event-card-small" : "event-card";
    
    return (
      <div className={cardClass} data-aos="zoom-in">
        <div className="event-icon-container">
          <IconComponent className="event-icon" style={{ color: event.color }} />
        </div>
        <h4 className="event-name">{event.name}</h4>
        <p className="event-description">{event.description}</p>
        <div className="event-participants">
          {event.participants === '1' && <FaUser className="participant-icon" />}
          {event.participants === '2' && <FaUserFriends className="participant-icon" />}
          {event.participants.includes('-') && <FaUsers className="participant-icon" />}
          <span>{event.participants} {event.participants === '1' ? 'Participant' : 'Participants'}</span>
        </div>
        <Link to="/enthusia/registration" className="event-register-btn">
          <FaFire />
          <span>Register Now</span>
        </Link>
      </div>
    );
  };

  const EventsModal = () => {
    if (!showModal) return null;

    const modalContent = (
      <div className="events-modal-overlay" onClick={() => setShowModal(false)}>
        <div className="events-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="events-modal-header">
            <h3>All 16 Events</h3>
            <button className="events-close-btn" onClick={() => setShowModal(false)}>
              <MdClose />
            </button>
          </div>
          <div className="events-modal-grid">
            {allEvents.map((event, index) => (
              <div key={event.id} data-aos="fade-up" data-aos-delay={index * 50}>
                <EventCard event={event} isSmall={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  };

  return (
    <div className={`eevents-page ${isLoaded ? 'loaded' : ''}`} id="events">

      
      {/* Animated Background Elements */}
      <div className="bg-animation">
        <div className="floating-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
        </div>
      </div>

      {/* Header Section */}
      <div className="events-page-header">
        <span className="header-subtitle">Discover The Magic Events</span>
        <div className="header-title-wrap">
          <h1 className="title-word">ENTHUSIA</h1>
          <span className="title-year">2026</span>
        </div>
        
        
        <div className="header-stats">
          <div className="stat-item glass-effect">
            <span className="stat-number">8</span>
            <span className="stat-label">Solo Events</span>
          </div>
          <div className="stat-item glass-effect">
            <span className="stat-number">1</span>
            <span className="stat-label">Dual Event</span>
          </div>
          <div className="stat-item glass-effect">
            <span className="stat-number">7</span>
            <span className="stat-label">Group Events</span>
          </div>
        </div>
      </div>

      {/* Main Events Grid - First 4 Events */}
      <div className="events-main-grid events-main-grid-4">
        {allEvents.slice(0, 4).map((event, index) => (
          <div 
            key={event.id} 
            className="event-grid-item"
            data-aos="zoom-in-up"
            data-aos-delay={index * 100}
            data-aos-duration="800"
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {/* View All Events Button */}
      <div className="events-action-section">
        <button 
          className="view-all-events-btn glass-effect"
          onClick={() => setShowModal(true)}
        >
          <div className="btn-content">
            <FaAward className="btn-icon" />
            <span>Explore All Events</span>
          </div>
          <div className="btn-glow"></div>
        </button>
      </div>

      {/* Events Modal */}
      <EventsModal />
    </div>
  );
};

export default EEvents;