import React from 'react';
import { FaPhone, FaEnvelope, FaUser, FaUsers, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import '../styles/EContact.css';

const EContact = () => {
  const generalContacts = [
    {
      name: 'Rahul Sharma',
      position: 'Event Coordinator',
      phone: '+91 9876543210',
      email: 'rahul.sharma@college.edu',
      whatsapp: '+91 9876543210'
    },
    {
      name: 'Priya Patel',
      position: 'Cultural Secretary',
      phone: '+91 9876543211',
      email: 'priya.patel@college.edu',
      whatsapp: '+91 9876543211'
    }
  ];

  const eventContacts = [
    {
      category: 'Dance Events',
      contact: {
        name: 'Arjun Kumar',
        phone: '+91 9876543212',
        email: 'dance.enthusia@college.edu',
        whatsapp: '+91 9876543212'
      }
    },
    {
      category: 'Music Events',
      contact: {
        name: 'Sneha Reddy',
        phone: '+91 9876543213',
        email: 'music.enthusia@college.edu',
        whatsapp: '+91 9876543213'
      }
    },
    {
      category: 'Drama & Theatre',
      contact: {
        name: 'Vikram Singh',
        phone: '+91 9876543214',
        email: 'drama.enthusia@college.edu',
        whatsapp: '+91 9876543214'
      }
    },
    {
      category: 'Art & Literature',
      contact: {
        name: 'Meera Joshi',
        phone: '+91 9876543215',
        email: 'art.enthusia@college.edu',
        whatsapp: '+91 9876543215'
      }
    }
  ];

  const ContactCard = ({ person, isGeneral = false }) => (
    <div className="contact-card">
      <div className="contact-header">
        <div className="contact-avatar">
          <FaUser />
        </div>
        <div className="contact-info">
          <h4 className="contact-name">{person.name}</h4>
          {person.position && <p className="contact-position">{person.position}</p>}
        </div>
      </div>
      
      <div className="contact-details">
        <div className="contact-item">
          <FaPhone />
          <span>{person.phone}</span>
        </div>
        <div className="contact-item">
          <FaEnvelope />
          <span>{person.email}</span>
        </div>
        <div className="contact-actions">
          <a 
            href={`https://wa.me/${person.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn whatsapp"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
          <a 
            href={`tel:${person.phone}`}
            className="contact-btn call"
          >
            <FaPhone />
            Call
          </a>
        </div>
      </div>
    </div>
  );

  const EventContactCard = ({ category, contact }) => (
    <div className="event-contact-card">
      <div className="event-category">
        <h4>{category}</h4>
      </div>
      <ContactCard person={contact} />
    </div>
  );

  return (
    <div className="econtact-container section" id="contact">
      <div className="econtact-wrapper">
        <h2 className="section-title">Contact Us</h2>
        
        <div className="contact-sections">
          {/* General Contacts */}
          <div className="contact-section">
            <div className="section-header">
              <FaUsers className="section-icon" />
              <h3>General Contacts</h3>
            </div>
            <div className="contacts-grid">
              {generalContacts.map((person, index) => (
                <ContactCard key={index} person={person} isGeneral={true} />
              ))}
            </div>
          </div>

          {/* Event Specific Contacts */}
          <div className="contact-section">
            <div className="section-header">
              <FaPhone className="section-icon" />
              <h3>Event Coordinators</h3>
            </div>
            <div className="events-contacts-grid">
              {eventContacts.map((item, index) => (
                <EventContactCard 
                  key={index} 
                  category={item.category} 
                  contact={item.contact} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Social Media & General Info */}
        <div className="contact-footer">
          <div className="social-links">
            <h4>Follow Us</h4>
            <div className="social-buttons">
              <a href="#" className="social-btn instagram">
                <FaInstagram />
                @enthusia2025
              </a>
              <a href="#" className="social-btn whatsapp">
                <FaWhatsapp />
                WhatsApp Group
              </a>
            </div>
          </div>
          
          <div className="general-info">
            <h4>Event Details</h4>
            <p><strong>Dates:</strong> March 15-16, 2025</p>
            <p><strong>Venue:</strong> College Campus</p>
            <p><strong>Registration Deadline:</strong> March 10, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EContact;