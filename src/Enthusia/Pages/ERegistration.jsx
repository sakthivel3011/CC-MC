import React, { useState } from 'react';
import { FaUser, FaUserFriends, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ERegistrationForm from '../components/ERegistrationForm';
import '../styles/ERegistration.css';

const ERegistration = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      name: 'Comic Satire',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎭',
      image: '/src/assets/images/events/comic-satire.jpg',
      description: 'Showcase your wit and humor through satirical performances that entertain and enlighten.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 5 minutes',
        'Performance must be original',
        'Props allowed (self-arranged)',
        'Content must be appropriate'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 2,
      name: 'Solo Instrumental',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎸',
      image: '/src/assets/images/events/solo-instrumental.jpg',
      description: 'Display your musical prowess with any instrument of your choice.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 6 minutes',
        'Any musical instrument allowed',
        'Accompaniment track permitted',
        'Own instrument required',
        'Classical or contemporary styles welcome'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 3,
      name: 'Group Instrumental',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 8,
      icon: '🎵',
      image: '/src/assets/images/events/group-instrumental.jpg',
      description: 'Collaborate with your team to create mesmerizing musical harmony.',
      rules: [
        'Team size: 3-8 members (Minimum 3, Maximum 8)',
        'Maximum duration: 8 minutes',
        'Mixed instruments encouraged',
        'Fusion styles welcome',
        'No vocal accompaniment'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 4,
      name: 'Solo Dance',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '💃',
      image: '/src/assets/images/events/solo-dance.jpg',
      description: 'Express yourself through the art of dance with grace and rhythm.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 4 minutes',
        'Any dance style allowed',
        'Costume and props permitted',
        'Background music required',
        'Original choreography preferred'
      ],
      coordinator: 'Arjun Kumar',
      phone: '+91 9876543212'
    },
    {
      id: 5,
      name: 'Dual Dance',
      category: 'dual',
      minParticipants: 2,
      maxParticipants: 2,
      icon: '👯',
      image: '/src/assets/images/events/dual-dance.jpg',
      description: 'Partner up for a synchronized dance performance that captivates the audience.',
      rules: [
        'Team size: Exactly 2 members (No more, no less)',
        'Maximum duration: 5 minutes',
        'Synchronization is key',
        'Props and costumes allowed',
        'Any dance style permitted'
      ],
      coordinator: 'Arjun Kumar',
      phone: '+91 9876543212'
    },
    {
      id: 6,
      name: 'Group Dance',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 8,
      icon: '🕺',
      image: '/src/assets/images/events/group-dance.jpg',
      description: 'Unite your team to deliver a spectacular group dance performance.',
      rules: [
        'Team size: 3-8 members (Minimum 3, Maximum 8)',
        'Maximum duration: 7 minutes',
        'Theme-based performances encouraged',
        'Elaborate costumes welcome',
        'Creative formations appreciated'
      ],
      coordinator: 'Arjun Kumar',
      phone: '+91 9876543212'
    },
    {
      id: 7,
      name: 'Solo Singing',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎤',
      image: '/src/assets/images/events/solo-singing.jpg',
      description: 'Let your voice soar and touch hearts with melodious solo performances.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 5 minutes',
        'Any language permitted',
        'Karaoke tracks allowed',
        'Live accompaniment welcome',
        'Original compositions encouraged'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 8,
      name: 'Group Singing',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 8,
      icon: '🎶',
      image: '/src/assets/images/events/group-singing.jpg',
      description: 'Harmonize with your team to create beautiful musical arrangements.',
      rules: [
        'Team size: 3-8 members (Minimum 3, Maximum 8)',
        'Maximum duration: 6 minutes',
        'Harmonies and arrangements valued',
        'A cappella or accompanied',
        'Choir arrangements welcome'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 9,
      name: 'Mime',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎭',
      image: '/src/assets/images/events/mime.jpg',
      description: 'Tell compelling stories without words through the art of mime.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 4 minutes',
        'No spoken words allowed',
        'Minimal props only',
        'White face paint mandatory',
        'Expressive storytelling essential'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 10,
      name: 'Imitation',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎪',
      image: '/src/assets/images/events/imitation.jpg',
      description: 'Master the art of mimicry and bring famous personalities to life.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 4 minutes',
        'Celebrity or character imitation',
        'Costume and makeup encouraged',
        'Voice modulation important',
        'Props allowed for authenticity'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 11,
      name: 'Fashion Parade',
      category: 'group',
      minParticipants: 5,
      maxParticipants: 10,
      icon: '👗',
      image: '/src/assets/images/events/fashion-parade.jpg',
      description: 'Strut down the ramp and showcase creativity in fashion and style.',
      rules: [
        'Team size: 5-10 members (Minimum 5, Maximum 10)',
        'Theme-based styling required',
        'Original designs preferred',
        'Ramp walk training recommended',
        'Sustainable fashion encouraged'
      ],
      coordinator: 'Meera Joshi',
      phone: '+91 9876543215'
    },
    {
      id: 12,
      name: 'Movie Depiction',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 8,
      icon: '🎬',
      image: '/src/assets/images/events/movie-depiction.jpg',
      description: 'Recreate iconic movie scenes with your creative interpretation.',
      rules: [
        'Team size: 3-8 members (Minimum 3, Maximum 8)',
        'Maximum duration: 7 minutes',
        'Famous movie scenes only',
        'Costumes and props mandatory',
        'Dialogue delivery important'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 13,
      name: 'Skit',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 8,
      icon: '🎪',
      image: '/src/assets/images/events/skit.jpg',
      description: 'Perform original theatrical pieces that entertain and convey meaningful messages.',
      rules: [
        'Team size: 3-8 members (Minimum 3, Maximum 8)',
        'Maximum duration: 8 minutes',
        'Original script required',
        'Social themes encouraged',
        'Props and costumes allowed'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 14,
      name: 'Short Film',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 10,
      icon: '📹',
      image: '/src/assets/images/events/short-film.jpg',
      description: 'Create compelling short films that tell powerful stories.',
      rules: [
        'Team size: 3-10 members (Minimum 3, Maximum 10)',
        'Maximum duration: 10 minutes',
        'Original content only',
        'All genres welcome',
        'Technical quality matters'
      ],
      coordinator: 'Meera Joshi',
      phone: '+91 9876543215'
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'solo': return <FaUser />;
      case 'dual': return <FaUserFriends />;
      case 'group': return <FaUsers />;
      default: return <FaUser />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'solo': return '#ff6b6b';
      case 'dual': return '#4ecdc4';
      case 'group': return '#45b7d1';
      default: return '#ddd';
    }
  };

  const soloEvents = events.filter(event => event.category === 'solo');
  const dualEvents = events.filter(event => event.category === 'dual');
  const groupEvents = events.filter(event => event.category === 'group');

  if (selectedEvent) {
    return <ERegistrationForm event={selectedEvent} onBack={() => setSelectedEvent(null)} />;
  }

  return (
    <div className="eregistration-page">
      <div className="eregistration-header">
        <Link to="/enthusia" className="back-btn">
          <FaArrowLeft />
          Back to Enthusia
        </Link>
        <h1>Event Registration</h1>
        <p>Choose your event and register now!</p>
      </div>

      <div className="events-container">
        {/* Solo Events */}
        <div className="events-section">
          <div className="section-header solo">
            <FaUser className="section-icon" />
            <h2>Solo Events</h2>
          </div>
          <div className="events-grid">
            {soloEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`event-card ${index % 2 === 0 ? 'left' : 'right'}`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="event-image">
                  <div className="image-placeholder">
                    <span className="event-icon">{event.icon}</span>
                  </div>
                </div>
                <div className="event-content">
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span className="category" style={{ backgroundColor: getCategoryColor(event.category) }}>
                      {getCategoryIcon(event.category)}
                      {event.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Events */}
        <div className="events-section">
          <div className="section-header dual">
            <FaUserFriends className="section-icon" />
            <h2>Dual Events</h2>
          </div>
          <div className="events-grid">
            {dualEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`event-card ${index % 2 === 0 ? 'left' : 'right'}`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="event-image">
                  <div className="image-placeholder">
                    <span className="event-icon">{event.icon}</span>
                  </div>
                </div>
                <div className="event-content">
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span className="category" style={{ backgroundColor: getCategoryColor(event.category) }}>
                      {getCategoryIcon(event.category)}
                      {event.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Group Events */}
        <div className="events-section">
          <div className="section-header group">
            <FaUsers className="section-icon" />
            <h2>Group Events</h2>
          </div>
          <div className="events-grid">
            {groupEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`event-card ${index % 2 === 0 ? 'left' : 'right'}`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="event-image">
                  <div className="image-placeholder">
                    <span className="event-icon">{event.icon}</span>
                  </div>
                </div>
                <div className="event-content">
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span className="category" style={{ backgroundColor: getCategoryColor(event.category) }}>
                      {getCategoryIcon(event.category)}
                      {event.category.toUpperCase()}
                    </span>
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

export default ERegistration;