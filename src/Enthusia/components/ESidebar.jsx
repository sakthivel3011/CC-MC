import React from 'react';
import { FaTimes, FaHome, FaCalendarAlt, FaUsers, FaPhone, FaInfoCircle, FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/ESidebar.css';

const ESidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: FaHome, label: 'Home', path: '/enthusia' },
    { icon: FaInfoCircle, label: 'About', path: '#about' },
    { icon: FaTrophy, label: 'Events', path: '#events' },
    { icon: FaCalendarAlt, label: 'Schedule', path: '#schedule' },
    { icon: FaUsers, label: 'Registration', path: '/enthusia/registration' },
    { icon: FaPhone, label: 'Contact', path: '#contact' },
  ];

  const handleItemClick = (path) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="enthusia-sidebar-overlay" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`enthusia-sidebar ${isOpen ? 'enthusia-sidebar-open' : ''}`}>
        {/* Header */}
        <div className="enthusia-sidebar-header">
          <h2 className="enthusia-sidebar-title">ENTHUSIA</h2>
          <button 
            className="enthusia-sidebar-close-btn"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Menu Items */}
        <nav className="enthusia-sidebar-nav">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="enthusia-nav-item">
                {item.path.startsWith('#') ? (
                  <button 
                    onClick={() => handleItemClick(item.path)}
                    className="enthusia-nav-link"
                  >
                    <IconComponent className="enthusia-nav-icon" />
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link 
                    to={item.path}
                    className="enthusia-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="enthusia-nav-icon" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="enthusia-sidebar-footer">
          <p>Cultural Club</p>
          <p>2025</p>
        </div>
      </div>
    </>
  );
};

export default ESidebar;
