import React, { useState } from 'react';
import { FaUser, FaUsers, FaUserFriends, FaEye, FaCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/EEvents.css';

const EEvents = () => {
  const [showAll, setShowAll] = useState(false);

  const events = {
    solo: [
      { id: 1, name: 'Comic Satire', icon: '🎭', participants: '1' },
      { id: 2, name: 'Solo Instrumental', icon: '🎸', participants: '1' },
      { id: 4, name: 'Solo Dance', icon: '💃', participants: '1' },
      { id: 7, name: 'Solo Singing', icon: '🎤', participants: '1' },
      { id: 9, name: 'Mime', icon: '🎭', participants: '1' },
      { id: 10, name: 'Imitation', icon: '🎪', participants: '1' }
    ],
    dual: [
      { id: 5, name: 'Dual Dance', icon: '👯', participants: '2' },
    ],
    group: [
      { id: 3, name: 'Group Instrumental', icon: '🎵', participants: '3-8' },
      { id: 6, name: 'Group Dance', icon: '🕺', participants: '3-8' },
      { id: 8, name: 'Group Singing', icon: '🎶', participants: '3-8' },
      { id: 11, name: 'Fashion Parade', icon: '👗', participants: '5-10' },
      { id: 12, name: 'Movie Depiction', icon: '🎬', participants: '3-8' },
      { id: 13, name: 'Skit', icon: '🎪', participants: '3-8' },
      { id: 14, name: 'Short Film', icon: '📹', participants: '3-10' }
    ]
  };

  const displayedEvents = showAll ? events : {
    solo: events.solo.slice(0, 2),
    dual: events.dual,
    group: events.group.slice(0, 2)
  };

  const EventCard = ({ event, type }) => (
    <div className="event-card">
      <div className="event-icon">{event.icon}</div>
      <h4 className="event-name">{event.name}</h4>
      <div className="event-info">
        <span className="participants">
          {type === 'solo' && <FaUser />}
          {type === 'dual' && <FaUserFriends />}
          {type === 'group' && <FaUsers />}
          {event.participants} {event.participants === '1' ? 'Participant' : 'Participants'}
        </span>
      </div>
      <Link to={`/enthusia/registration`} className="register-btn">
        <FaCalendarCheck />
        Register Now!
      </Link>
    </div>
  );

  return (
    <div className="eevents-container section" id="events">
      <div className="eevents-wrapper">
        <h2 className="section-title">Events Categories</h2>
        
        {/* Solo Events */}
        <div className="events-category">
          <div className="category-header">
            <FaUser className="category-icon" />
            <h3>Solo Events</h3>
          </div>
          <div className="events-grid">
            {displayedEvents.solo.map(event => (
              <EventCard key={event.id} event={event} type="solo" />
            ))}
          </div>
        </div>

        {/* Dual Events */}
        <div className="events-category">
          <div className="category-header">
            <FaUserFriends className="category-icon" />
            <h3>Dual Events</h3>
          </div>
          <div className="events-grid">
            {displayedEvents.dual.map(event => (
              <EventCard key={event.id} event={event} type="dual" />
            ))}
          </div>
        </div>

        {/* Group Events */}
        <div className="events-category">
          <div className="category-header">
            <FaUsers className="category-icon" />
            <h3>Group Events</h3>
          </div>
          <div className="events-grid">
            {displayedEvents.group.map(event => (
              <EventCard key={event.id} event={event} type="group" />
            ))}
          </div>
        </div>

        {/* Show More/Less Button */}
        <div className="events-actions">
          <button 
            className="show-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show All Events'}
          </button>
          
          <Link to="/enthusia/events" className="view-all-btn">
            <FaEye />
            View All Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EEvents;