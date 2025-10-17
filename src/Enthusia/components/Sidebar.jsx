import React, { useState } from 'react';

const Sidebar = ({ isOpen, onToggle }) => {
  const [activeSection, setActiveSection] = useState('hero');

  const navigationItems = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'events', label: 'Events', icon: '🎭' },
    { id: 'solo-events', label: 'Solo Events', icon: '🎤' },
    { id: 'dual-events', label: 'Dual Events', icon: '👥' },
    { id: 'group-events', label: 'Group Events', icon: '🎪' },
    { id: 'registration', label: 'Register', icon: '📝' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'prizes', label: 'Prizes', icon: '🏆' },
    { id: 'rules', label: 'Rules', icon: '📋' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    
    // Smooth scroll to section
    const targetSection = document.getElementById(sectionId === 'hero' ? 'enthusia-hero' : `${sectionId}-section`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      onToggle();
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label="Toggle Sidebar"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Sidebar */}
      <nav className={`enthusia-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>E</span>
          </div>
          <h3 className="sidebar-title">ENTHUSIA 2025</h3>
        </div>

        <div className="sidebar-nav">
          {navigationItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="event-info">
            <h4>Event Details</h4>
            <p><strong>Date:</strong> Feb 15-16, 2025</p>
            <p><strong>Venue:</strong> KEC Campus</p>
            <p><strong>Time:</strong> 9:00 AM onwards</p>
          </div>
          
          <div className="quick-contact">
            <h4>Quick Contact</h4>
            <p><i className="fas fa-phone"></i> +91 98765 43210</p>
            <p><i className="fas fa-envelope"></i> enthusia@kec.edu.in</p>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;