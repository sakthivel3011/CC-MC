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
      id: 2,
      name: 'Solo Instrumental',
      icon: FaGuitar,
      participants: '1',
      type: 'solo',
      color: '#4ECDC4',
      description: 'Solo performance, 4 minutes duration. Own composition or cine songs. Pre-recorded music & Karaoke strictly prohibited. Must bring own instruments.'
    },
    {
      id: 3,
      name: 'Group Instrumental',
      icon: FaMusic,
      participants: '2-7',
      type: 'group',
      color: '#74B9FF',
      description: '5 minutes group performance. 2-7 members. Own composition or cine songs. Pre-recorded music & Karaoke strictly prohibited. Must bring own instruments.'
    },
    {
      id: 4,
      name: 'Solo Dance',
      icon: FaRunning,
      participants: '1',
      type: 'solo',
      color: '#45B7D1',
      description: '4 minutes solo performance. High-quality audio required. No vulgarity in lyrics, dress, or movements. Judged on theme, attire, expressions, steps, and song selection.'
    },
    {
      id: 5,
      name: 'Dual Dance',
      icon: FaRunning,
      participants: '2',
      type: 'dual',
      color: '#FF7675',
      description: '4 minutes duo performance. High-quality audio required. No vulgarity in lyrics, attire, or movements. Judged on theme, attire, expression, steps, coordination.'
    },
    {
      id: 6,
      name: 'Group Dance',
      icon: FaRunning,
      participants: '8-15',
      type: 'group',
      color: '#00B894',
      description: '5 minutes group performance. 8-15 members. High-quality audio required. No dangerous props or vulgarity. Judged on theme, costumes, expression, coordination.'
    },
    {
      id: 7,
      name: 'Solo Singing',
      icon: FaMicrophone,
      participants: '1',
      type: 'solo',
      color: '#96CEB4',
      description: '5 minutes solo performance. Karaoke allowed. No vulgarity in lyrics. Judged on singing nuances and general impression.'
    },
    {
      id: 8,
      name: 'Group Singing',
      icon: MdMusicNote,
      participants: '2-6',
      type: 'group',
      color: '#FDCB6E',
      description: '5 minutes group performance. Minimum 2 members. Own composition required. No vulgarity in lyrics. Judged on singing nuances, song selection, group harmony.'
    },
    {
      id: 1,
      name: 'Comic Satire',
      icon: FaTheaterMasks,
      participants: '1-10',
      type: 'solo-group',
      color: '#FF6B6B',
      description: 'Kalakka Povadhu Yaaru style performance. Solo or team up to 10 members. 5 minutes duration. No vulgarity. Judged on concept, timing, and performance.'
    },
    {
      id: 9,
      name: 'Imitate Personate',
      icon: FaTheaterMasks,
      participants: '1',
      type: 'solo',
      color: '#DDA0DD',
      description: '5 minutes solo act as a famous person. Background scores only, no recorded voices/dialogues. No vulgarity. Judged on acting, expression, theme delivery.'
    },
    {
      id: 10,
      name: 'Fashion Parade',
      icon: FaTshirt,
      participants: '7-15',
      type: 'group',
      color: '#E17055',
      description: '6 minutes showcase. 7-15 members. Costumes required for prelims. No vulgar attire. Judged on creativity in costumes, themes, and formations.'
    },
    {
      id: 11,
      name: 'Movie Depiction',
      icon: MdVideocam,
      participants: '8-15',
      type: 'group',
      color: '#A29BFE',
      description: '5 minutes to recreate movie scenes. 8-15 members. No spoofing or vulgarity. High-quality audio required. Judged on acting, coordination, impression.'
    },
    {
      id: 12,
      name: 'Skit',
      icon: MdTheaters,
      participants: '8-15',
      type: 'group',
      color: '#FD79A8',
      description: '5 minutes theatrical performance. 8-15 members. High-quality audio required. No vulgarity. Judged on theme, expression, music, coordination.'
    },
    
    {
      id: 14,
      name: 'Anchoring',
      icon: FaBullhorn,
      participants: '1',
      type: 'solo',
      color: '#9370DB',
      description: '5 minutes solo presentation. Original content required. No vulgarity/offensive language. Judged on voice modulation, confidence, content, and audience engagement.'
    },
    {
      id: 13,
      name: 'Short Film',
      icon: FaCamera,
      participants: '1-12',
      type: 'team',
      color: '#00CEC9',
      description: '15 minutes film. Max 12 crew members. Submit during prelims. No vulgarity. Judged on story, direction, acting, editing, audio/video quality.'
    },
    {
      id: 15,
      name: 'Rangoli',
      icon: MdBrush,
      participants: '2-5',
      type: 'group',
      color: '#FF6B9D',
      description: 'Preliminary round only. 2-5 members. Theme announced 1 day before prelims. Bring own rangoli materials. No ready-made designs. Create on spot within time limit.'
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
    <div className={`eevents-page ${isLoaded ? 'loaded' : ''}`} id="events-section">

      
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
          <h1 className="title-word">ENTHUSIA '26</h1>
          
        </div>
        
        
        <div className="event-header-stats">
          <div className="event-stat-item glass-effect">
            <span className="stat-number">5</span>
            <span className="stat-label">Solo Events</span>
          </div>
          <div className="event-stat-item glass-effect">
            <span className="stat-number">1</span>
            <span className="stat-label">Dual Event</span>
          </div>
          <div className="event-stat-item glass-effect">
            <span className="stat-number">9</span>
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