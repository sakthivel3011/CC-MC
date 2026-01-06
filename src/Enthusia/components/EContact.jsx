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
      name: 'Kavin S',
      role: ' Event Coordinator',
      phone: '+91 8610177301',
     
      email: 'kecculturalclub@kongu.edu',
      available: '9 AM - 4 PM'
    },
    {
      id: 3,
      title: 'General Enquiry Desk',
      name: 'Mahashwin V',
      role: 'Information Desk',
      phone: '+91 9942621479',
     
      email: 'kecculturalclub@kongu.edu',
      available: '9 AM - 4 PM'
    },
    
  ];

  const eventCoordinators = [
    {
      id: 1,
      name: 'Comic Satire',
      icon: FaTheaterMasks,
      coordinator: 'Rithanya',
      phone: '74186 83495',

      color: '#FF6B6B'
    },
    {
      id: 2,
      name: 'Solo Inst',
      icon: FaGuitar,
      coordinator: 'Aadhi',
      phone: '93422 31358',

    },
    {
      id: 3,
      name: 'Solo Dance',
      icon: FaRunning,
      coordinator: 'Monika',
      phone: '97885 83223',

    },
    {
      id: 4,
      name: 'Solo Singing',
      icon: FaMicrophone,
      coordinator: 'Sathya',
      phone: '86106 77648',

    },

    {
      id: 6,
      name: 'Imitate',
      icon: FaTheaterMasks,
      coordinator: 'Tamilmaran',
      phone: '63696 88659',

    },

    {
      id: 8,
      name: 'Anchoring',
      icon: FaBullhorn,
      coordinator: 'Ram Ganesh',
      phone: '9791760308',

    },
    {
      id: 9,
      name: 'Dual Dance',
      icon: FaRunning,
      coordinator: 'Kaviya',
      phone: '93603 38092',

    },
    {
      id: 10,
      name: 'Group Inst',
      icon: FaMusic,
      coordinator: 'Anand Chandru',
      phone: '95664 35713',

    },
    {
      id: 11,
      name: 'Group Dance',
      icon: FaRunning,
      coordinator: 'Ajay',
      phone: '94431 43761',

    },
    {
      id: 12,
      name: 'Group Singing',
      icon: MdMusicNote,
      coordinator: 'Sudheeksha',
      phone: '88700 80939',

    },
    {
      id: 13,
      name: 'Fashion Parade',
      icon: FaTshirt,
      coordinator: 'Sudharshan',
      phone: '99434 48559',

    },
    {
      id: 14,
      name: 'Movie Depiction',
      icon: MdVideocam,
      coordinator: 'Teju',
      phone: '93427 71869',

    },
    {
      id: 15,
      name: 'Skit',
      icon: MdTheaters,
      coordinator: 'Ajay',
      phone: '94431 43761',

    },
    {
      id: 16,
      name: 'Short Film',
      icon: FaCamera,
      coordinator: 'Aadhi',
      phone: '93422 31358',

    },
    {
      id: 17,
      name: 'Rangoli S',
      icon: FaMask,
      coordinator: 'Maria',
      phone: '89460 77932',

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
                <p className="detail-value">  Jan 30, 2026</p>
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
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="contact-detail">
                      <FaPhone /> {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} className="contact-detail">
                      <FaEnvelope /> {contact.email}
                    </a>
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