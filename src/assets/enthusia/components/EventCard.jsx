import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';

const EventCard = ({ event, onRegister }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleRegisterClick = () => {
    setShowRegistration(true);
    if (onRegister) {
      onRegister(event);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'solo':
        return '#ff6b6b';
      case 'dual': 
        return '#4ecdc4';
      case 'group':
        return '#45b7d1';
      default:
        return '#ffd700';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'solo':
        return '🎤';
      case 'dual':
        return '👥';
      case 'group':
        return '🎪';
      default:
        return '🎭';
    }
  };

  return (
    <>
      <div className="event-card">
        <div className="event-image-container">
          <img 
            src={event.image} 
            alt={event.name}
            className="event-image"
            loading="lazy"
            onError={(e) => {
              e.target.src = '';
            }}
          />
          <div className="event-overlay">
            <span className="event-category-badge" style={{ backgroundColor: getCategoryColor(event.category) }}>
              {getCategoryIcon(event.category)} {event.category.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="event-content">
          <h3 className="event-title">{event.name}</h3>
          
          <div className="event-meta">
            <span className="event-participants">
              <i className="fas fa-users"></i>
              {event.minParticipants === event.maxParticipants 
                ? `${event.maxParticipants} participant${event.maxParticipants > 1 ? 's' : ''}`
                : `${event.minParticipants}-${event.maxParticipants} participants`
              }
            </span>
            <span className="event-fee">
              <i className="fas fa-rupee-sign"></i>
              ₹{event.registrationFee}
            </span>
          </div>

          <p className="event-description">{event.description}</p>

          <div className="event-prizes">
            <h4><i className="fas fa-trophy"></i> Prizes</h4>
            <div className="prizes-list">
              {event.prizes.map((prize, index) => (
                <span key={index} className={`prize-badge prize-${index + 1}`}>
                  {index === 0 && '🥇'} {index === 1 && '🥈'} {index === 2 && '🥉'}
                  {prize}
                </span>
              ))}
            </div>
          </div>

          <div className="event-actions">
            <button 
              className="btn-primary"
              onClick={handleRegisterClick}
            >
              <i className="fas fa-user-plus"></i>
              Register Now
            </button>
            <button 
              className="btn-secondary"
              onClick={() => setShowDetails(!showDetails)}
            >
              <i className="fas fa-info-circle"></i>
              {showDetails ? 'Hide' : 'View'} Rules
            </button>
          </div>

          {showDetails && (
            <div className="event-details">
              <h4><i className="fas fa-clipboard-list"></i> Rules & Regulations</h4>
              <ul className="rules-list">
                {event.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <RegistrationForm 
          event={event}
          onClose={() => setShowRegistration(false)}
        />
      )}
    </>
  );
};

export default EventCard;