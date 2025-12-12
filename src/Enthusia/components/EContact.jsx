import React, { useState } from 'react';
import { 
  FaTheaterMasks, FaGuitar, FaRunning, FaMicrophone, FaMask, 
  FaLaugh, FaBullhorn, FaMusic, FaTshirt, FaCamera,
  FaPhone, FaEnvelope, FaWhatsapp, FaUser, FaCalendar, FaMapMarkerAlt
} from 'react-icons/fa';
import { MdMusicNote, MdVideocam, MdTheaters } from 'react-icons/md';
import '../styles/EContact.css';

const EContacts = () => {
  const [activeTab, setActiveTab] = useState('general');

  const generalContacts = [
    {
      id: 1,
      title: 'Registration Help',
      name: 'Sakthivel S',
      role: 'Registration Coordinator',
      phone: '+91 8925490989',
     
      email: 'kecculturalclub@kongu.edu',
      available: '24/7 Support'
    },
    {
      id: 2,
      title: 'Event Information',
      name: 'Kavin ',
      role: 'Information Desk',
      phone: '+91 98765 43211',
      whatsapp: '+91 98765 43211',
      email: 'info@enthusia2025.com',
      available: '9 AM - 9 PM'
    },
    {
      id: 3,
      title: 'Event Information',
      name: 'Priya Sharma',
      role: 'Information Desk',
      phone: '+91 98765 43211',
      whatsapp: '+91 98765 43211',
      email: 'info@enthusia2025.com',
      available: '9 AM - 9 PM'
    },
    
  ];

  const eventCoordinators = [
    {
      id: 1,
      name: 'Comic Satire',
      icon: FaTheaterMasks,
      coordinator: 'Vikram Patel',
      phone: '+91 98765 43213',

      color: '#FF6B6B'
    },
    {
      id: 2,
      name: 'Solo Inst',
      icon: FaGuitar,
      coordinator: 'Meera Iyer',
      phone: '+91 98765 43214',

    },
    {
      id: 3,
      name: 'Solo Dance',
      icon: FaRunning,
      coordinator: 'Aisha Khan',
      phone: '+91 98765 43215',

    },
    {
      id: 4,
      name: 'Solo Singing',
      icon: FaMicrophone,
      coordinator: 'Rohan Desai',
      phone: '+91 98765 43216',

    },
    {
      id: 5,
      name: 'Mime',
      icon: FaMask,
      coordinator: 'Ananya Reddy',
      phone: '+91 98765 43217',

    },
    {
      id: 6,
      name: 'Imitation',
      icon: FaTheaterMasks,
      coordinator: 'Karan Singh',
      phone: '+91 98765 43218',

    },
    {
      id: 7,
      name: 'Stand Up Comedy',
      icon: FaLaugh,
      coordinator: 'Sneha Gupta',
      phone: '+91 98765 43219',

    },
    {
      id: 8,
      name: 'Anchoring',
      icon: FaBullhorn,
      coordinator: 'Aditya Nair',
      phone: '+91 98765 43220',

    },
    {
      id: 9,
      name: 'Dual Dance',
      icon: FaRunning,
      coordinator: 'Divya Krishnan',
      phone: '+91 98765 43221',

    },
    {
      id: 10,
      name: 'Group Inst',
      icon: FaMusic,
      coordinator: 'Aryan Malhotra',
      phone: '+91 98765 43222',

    },
    {
      id: 11,
      name: 'Group Dance',
      icon: FaRunning,
      coordinator: 'Pooja Menon',
      phone: '+91 98765 43223',

    },
    {
      id: 12,
      name: 'Group Singing',
      icon: MdMusicNote,
      coordinator: 'Siddharth Rao',
      phone: '+91 98765 43224',

    },
    {
      id: 13,
      name: 'Fashion Parade',
      icon: FaTshirt,
      coordinator: 'Ishita Kapoor',
      phone: '+91 98765 43225',

    },
    {
      id: 14,
      name: 'Movie Depiction',
      icon: MdVideocam,
      coordinator: 'Nikhil Joshi',
      phone: '+91 98765 43226',

    },
    {
      id: 15,
      name: 'Skit',
      icon: MdTheaters,
      coordinator: 'Kavya Pillai',
      phone: '+91 98765 43227',

    },
    {
      id: 16,
      name: 'Short Film',
      icon: FaCamera,
      coordinator: 'Aarav Sharma',
      phone: '+91 98765 43228',

    }
  ];

  return (
    <div className="contacts-container">
      {/* Hero Section */}
      <div className="contacts-hero">
        <div className="hero-content">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">We're here to help you with registration and event queries</p>
          
          {/* Event Details Card */}
          <div className="event-details-card">
            
            
            <div className="detail-item">
              <FaCalendar className="detail-icon" />
              <div>
                <p className="detail-label">Registration Deadline</p>
                <p className="detail-value">March 10, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="contacts-content">
        {/* NEW Tab Switcher */}
        <div className="tab-switcher">
          <button
            className={`tab-option ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <FaPhone /> General Contacts
          </button>
          <button
            className={`tab-option ${activeTab === 'coordinators' ? 'active' : ''}`}
            onClick={() => setActiveTab('coordinators')}
          >
            <FaUser /> Event Coordinators
          </button>
          <div className={`tab-glider ${activeTab}`}></div>
        </div>

        {activeTab === 'general' ? (
          <div className="general-contacts">
            <h2 className="section-title">Registration & Help Desk</h2>
            <p className="section-description">
              Need help with registration or have questions? Our team is ready to assist you!
            </p>
            <div className="general-grid">
              {generalContacts.map((contact) => (
                <div key={contact.id} className="general-card">
                  <div className="general-card-header">
                    <h3 className="general-card-title">{contact.title}</h3>
                    <span className="availability-badge">{contact.available}</span>
                  </div>
                  <div className="coordinator-info">
                    <FaUser className="info-icon" />
                    <div>
                      <p className="coordinator-name">{contact.name}</p>
                      <p className="coordinator-role">{contact.role}</p>
                    </div>
                  </div>
                  
                  <div className="contact-details">
                    <p><FaPhone /> {contact.phone}</p>
                    <p><FaEnvelope /> {contact.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="event-coordinators">
            <h2 className="section-title">Event Coordinators</h2>
            <p className="section-description">
              Contact the specific event coordinator for detailed information about your event
            </p>
            <div className="coordinators-grid">
              {eventCoordinators.map((event) => {
                const IconComponent = event.icon;
                return (
                  <div key={event.id} className="coordinator-card">
                    <div className="card-header">
                      <IconComponent className="event-icon" />
                      <h3 className="event-name">{event.name}</h3>
                    </div>
                    <div className="card-body">
                      <div className="coordinator-info">
                        <FaUser className="info-icon" />
                        <div>
                          <p className="coordinator-label">Coordinator</p>
                          <p className="coordinator-name">{event.coordinator}</p>
                        </div>
                      </div>
                      
                      <div className="contact-info">
                        <a href={`tel:${event.phone.replace(/\s/g, '')}`} className="contact-detail">
                          <FaPhone /> {event.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EContacts;