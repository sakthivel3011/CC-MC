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
  FaRunning
} from 'react-icons/fa';
import { 
  MdMusicNote,
  MdTheaters,
  MdVideocam,
  MdBrush
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import '../styles/EEvents.css';

const EEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalEvents, setModalEvents] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    // Initialize AOS with custom settings
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
    AOS.refresh();
  }, []);

  const events = {
    solo: [
      { id: 1, name: 'Comic Satire', icon: FaTheaterMasks, participants: '1',  color: '#FF6B6B' },
      { id: 2, name: 'Solo Instrumental', icon: FaGuitar, participants: '1', color: '#4ECDC4' },
      { id: 4, name: 'Solo Dance', icon: FaRunning, participants: '1', color: '#45B7D1' },
      { id: 7, name: 'Solo Singing', icon: FaMicrophone, participants: '1', color: '#96CEB4' },
      { id: 9, name: 'Mime', icon: FaMask, participants: '1', color: '#FFEAA7' },
      { id: 10, name: 'Imitation', icon: FaTheaterMasks, participants: '1', color: '#DDA0DD' }
    ],
    dual: [
      { id: 5, name: 'Dual Dance', icon: FaRunning, participants: '2', color: '#FF7675' },
    ],
    group: [
      { id: 3, name: 'Group Instrumental', icon: FaMusic, participants: '3-8', color: '#74B9FF' },
      { id: 6, name: 'Group Dance', icon: FaRunning, participants: '3-8', color: '#00B894' },
      { id: 8, name: 'Group Singing', icon: MdMusicNote, participants: '3-8', color: '#FDCB6E' },
      { id: 11, name: 'Fashion Parade', icon: FaTshirt, participants: '5-10', color: '#E17055' },
      { id: 12, name: 'Movie Depiction', icon: MdVideocam, participants: '3-8', color: '#A29BFE' },
      { id: 13, name: 'Skit', icon: MdTheaters, participants: '3-8', color: '#FD79A8' },
      { id: 14, name: 'Short Film', icon: FaCamera, participants: '3-10', color: '#00CEC9' }
    ]
  };

  // Calculate total events
  const totalEvents = events.solo.length + events.dual.length + events.group.length;
  
  // Show only 3 specific events initially
  const featuredEvents = [
    events.solo.find(event => event.name === 'Comic Satire'),
    events.group.find(event => event.name === 'Group Dance'),
    events.group.find(event => event.name === 'Group Singing')
  ].filter(Boolean);

  // Handle modal functions
  const openModal = (eventsList, title) => {
    setModalEvents(eventsList);
    setModalTitle(title);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalEvents([]);
    setModalTitle('');
  };

  const handleStatClick = (type) => {
    let eventsList = [];
    let title = '';
    
    switch(type) {
      case 'solo':
        eventsList = events.solo;
        title = `Solo Events (${events.solo.length})`;
        break;
      case 'dual':
        eventsList = events.dual;
        title = `Dual Events (${events.dual.length})`;
        break;
      case 'group':
        eventsList = events.group;
        title = `Group Events (${events.group.length})`;
        break;
      default:
        eventsList = [...events.solo, ...events.dual, ...events.group];
        title = `All Events (${totalEvents})`;
    }
    
    openModal(eventsList, title);
  };

  const getIconColor = (color) => {
    return color || '#FF6B6B';
  };

  const EventCard = ({ event, type, isSmall = false }) => {
    const IconComponent = event.icon;
    const cardClass = isSmall ? "event-card small-event-card" : "event-card";
    
    return (
      <div className={cardClass} data-aos="zoom-in" data-aos-duration="600">
        <div className="event-card-header">
          <div className="event-icon-wrapper">
            <IconComponent 
              className="event-icon" 
              style={{ color: getIconColor(event.color) }}
            />
          </div>
        </div>
        
        <h4 className="event-name">{event.name}</h4>
        
        <div className="event-details">
          
          
          <div className="participants-info">
            {event.participants === '1' && <FaUser className="participant-icon" />}
            {event.participants === '2' && <FaUserFriends className="participant-icon" />}
            {event.participants.includes('-') && <FaUsers className="participant-icon" />}
            <span>{event.participants} {event.participants === '1' ? 'Participant' : 'Participants'}</span>
          </div>
        </div>
        
        <Link to="/enthusia/registration" className="register-btn">
          <FaFire />
          <span>Join Now</span>
        </Link>
      </div>
    );
  };

  // Modal Component
  const EventsModal = () => {
    if (!showModal) return null;

    const modalContent = (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{modalTitle}</h3>
            <button className="close-btn" onClick={closeModal}>×</button>
          </div>
          <div className="modal-events-grid">
            {modalEvents.map((event) => {
              const eventType = event.participants === '1' ? 'solo' : 
                              event.participants === '2' ? 'dual' : 'group';
              return (
                <EventCard key={event.id} event={event} type={eventType} isSmall={true} />
              );
            })}
          </div>
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  };

  return (
    <div className="eevents-container section" id="events" data-aos="fade-in">
      <div className="eevents-wrapper">
        {/* Header Section */}
        <div className="events-header">
          <div className="header-content">
            <h2 className="section-title" data-aos="fade-down" data-aos-duration="1000">
              <FaTrophy className="title-icon" />
              Enthusia Events
            </h2>
            
          </div>
          
          {/* Category Stats */}
          <div className="category-stats" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-card solo-stat" onClick={() => handleStatClick('solo')} data-aos="zoom-in" data-aos-delay="300">
              <FaUser className="stat-icon" />
              <div className="stat-info">
                <h4>{events.solo.length}</h4>
                <span>Solo Events</span>
                <small className="click-hint">Click here</small>
              </div>
            </div>
            <div className="stat-card dual-stat" onClick={() => handleStatClick('dual')} data-aos="zoom-in" data-aos-delay="400">
              <FaUserFriends className="stat-icon" />
              <div className="stat-info">
                <h4>{events.dual.length}</h4>
                <span>Dual Events</span>
                <small className="click-hint">Click here</small>
              </div>
            </div>
            <div className="stat-card group-stat" onClick={() => handleStatClick('group')} data-aos="zoom-in" data-aos-delay="500">
              <FaUsers className="stat-icon" />
              <div className="stat-info">
                <h4>{events.group.length}</h4>
                <span>Group Events</span>
                <small className="click-hint">Click here</small>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Events */}
        <div className="events-category">
          <div className="category-header" data-aos="fade-right" data-aos-delay="600">
            <div className="category-title">
              <FaTrophy className="category-icon featured-icon" />
              <h3>Featured Events</h3>
            </div>
            <div className="category-description">
              Showcase your talents across 14 exciting events in 3 categories
            </div>
          </div>
          <div className="events-grid">
            {featuredEvents.map((event, index) => {
              const eventType = event.participants === '1' ? 'solo' : 
                              event.participants === '2' ? 'dual' : 'group';
              return (
                <div key={event.id} data-aos="fade-up" data-aos-delay={700 + (index * 100)}>
                  <EventCard event={event} type={eventType} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="events-actions" data-aos="fade-up" data-aos-delay="1000">
          <button 
            className="show-more-btn"
            onClick={() => handleStatClick('all')}
            data-aos="slide-right" 
            data-aos-delay="1100"
          >
            <FaFire />
            <span>Explore All {totalEvents} Events</span>
          </button>
          
          <Link to="/enthusia/registration" className="register-all-btn" data-aos="slide-left" data-aos-delay="1200">
            <FaAward />
            <span>Start Your Journey</span>
          </Link>
        </div>

        {/* Events Modal */}
        <EventsModal />
      </div>
    </div>
  );
};

export default EEvents;