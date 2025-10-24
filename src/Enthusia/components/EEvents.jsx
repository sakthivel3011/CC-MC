import React, { useState, useEffect } from 'react';
import { 
  FaMicrophone, 
  FaMusic, 
  FaTheaterMasks, 
  FaGuitar, 
  FaTshirt,
  FaUsers, 
  FaUser, 
  FaUserFriends,
  FaFire,
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
import { useNavigate } from 'react-router-dom';
import '../styles/EEvents.css';

const EEvents = () => {
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
      description: 'Showcase your wit and humor through satirical performances that entertain and enlighten.'
    },
    {
      id: 2,
      name: 'Solo Instrumental',
      icon: FaGuitar,
      participants: '1',
      type: 'solo',
      color: '#4ECDC4',
      description: 'Display your musical prowess with any instrument of your choice.'
    },
    {
      id: 4,
      name: 'Solo Dance',
      icon: FaRunning,
      participants: '1',
      type: 'solo',
      color: '#45B7D1',
      description: 'Express yourself through the art of dance with grace and rhythm'
    },
    {
      id: 7,
      name: 'Solo Singing',
      icon: FaMicrophone,
      participants: '1',
      type: 'solo',
      color: '#96CEB4',
      description: 'Let your voice soar and touch hearts with melodious solo performances'
    },
    {
      id: 9,
      name: 'Mime',
      icon: FaMask,
      participants: '1',
      type: 'solo',
      color: '#FFEAA7',
      description: 'Tell compelling stories without words through the art of mime'
    },
    {
      id: 10,
      name: 'Imitation',
      icon: FaTheaterMasks,
      participants: '1',
      type: 'solo',
      color: '#DDA0DD',
      description: 'Master the art of mimicry and bring famous personalities to life'
    },
    {
      id: 15,
      name: 'Stand Up Comedy',
      icon: FaLaugh,
      participants: '1',
      type: 'solo',
      color: '#FFA500',
      description: 'Make the audience laugh with your original comedic material'
    },
    {
      id: 16,
      name: 'Beat Boxing',
      icon: FaBullhorn,
      participants: '1',
      type: 'solo',
      color: '#9370DB',
      description: 'Create incredible rhythms and sounds using only your voice'
    },
    {
      id: 5,
      name: 'Dual Dance',
      icon: FaRunning,
      participants: '2',
      type: 'dual',
      color: '#FF7675',
      description: 'Partner up for a synchronized dance performance that captivates the audience'
    },
    {
      id: 3,
      name: 'Group Instrumental',
      icon: FaMusic,
      participants: '3-8',
      type: 'group',
      color: '#74B9FF',
      description: 'Collaborate with your team to create mesmerizing musical harmony'
    },
    {
      id: 6,
      name: 'Group Dance',
      icon: FaRunning,
      participants: '3-8',
      type: 'group',
      color: '#00B894',
      description: 'Unite your team to deliver a spectacular group dance performance'
    },
    {
      id: 8,
      name: 'Group Singing',
      icon: MdMusicNote,
      participants: '3-8',
      type: 'group',
      color: '#FDCB6E',
      description: 'Harmonize with your team to create beautiful musical arrangements'
    },
    {
      id: 11,
      name: 'Fashion Parade',
      icon: FaTshirt,
      participants: '5-10',
      type: 'group',
      color: '#E17055',
      description: 'Strut down the ramp and showcase creativity in fashion and style'
    },
    {
      id: 12,
      name: 'Movie Depiction',
      icon: MdVideocam,
      participants: '3-8',
      type: 'group',
      color: '#A29BFE',
      description: 'Recreate iconic movie scenes with your creative interpretation'
    },
    {
      id: 13,
      name: 'Skit',
      icon: MdTheaters,
      participants: '3-8',
      type: 'group',
      color: '#FD79A8',
      description: 'Perform original theatrical pieces that entertain and convey meaningful messages'
    },
    {
      id: 14,
      name: 'Short Film',
      icon: FaCamera,
      participants: '3-10',
      type: 'group',
      color: '#00CEC9',
      description: 'Create compelling short films that tell powerful stories'
    }
  ];

  const EventCard = ({ event, isSmall = false }) => {
    const navigate = useNavigate();
    const IconComponent = event.icon;
    const cardClass = isSmall ? "event-card-small" : "event-card";
    
    const handleClick = () => {
      window.location.href = `/enthusia/registration?eventId=${event.id}`;
    };
    
    return (
      <div className={cardClass} onClick={handleClick} style={{ cursor: 'pointer' }}>
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
        <button className="event-register-btn">
          <FaFire />
          <span>Register Now</span>
        </button>
      </div>
    );
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
        
        
        <div className="event-header-stats">
          <div className="event-stat-item glass-effect">
            <span className="stat-number">8</span>
            <span className="stat-label">Solo Events</span>
          </div>
          <div className="event-stat-item glass-effect">
            <span className="stat-number">1</span>
            <span className="stat-label">Dual Event</span>
          </div>
          <div className="event-stat-item glass-effect">
            <span className="stat-number">7</span>
            <span className="stat-label">Group Events</span>
          </div>
        </div>
      </div>

      {/* Main Events Grid - All Events */}
      <div className="events-main-grid events-main-grid-4">
        {allEvents.map((event) => (
          <div 
            key={event.id} 
            className="event-grid-item"
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EEvents;