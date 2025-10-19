import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/ESidebar.css';

const ESidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    
    { label: 'ABOUT', number: '01', path: '#about' },
    { label: 'EVENTS', number: '02', path: '#events' },
    { label: 'CONTACT', number: '03', path: '#contact' },
    { label: 'HELP', number: '04', path: '/help' },

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
        {/* Close Button */}
        <button 
          className="enthusia-sidebar-close-btn"
          onClick={() => setIsOpen(false)}
        >
          <span>Close</span>
          <FaTimes />
        </button>
        
        {/* Menu Items */}
        <nav className="enthusia-sidebar-nav">
          {menuItems.map((item, index) => {
            return (
              <div key={index} className="enthusia-nav-item">
                {item.path.startsWith('#') ? (
                  <button 
                    onClick={() => handleItemClick(item.path)}
                    className="enthusia-nav-link"
                  >
                    <span className="enthusia-nav-label">{item.label}</span>
                    <span className="enthusia-nav-number">{item.number}</span>
                  </button>
                ) : (
                  <Link 
                    to={item.path}
                    className="enthusia-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="enthusia-nav-label">{item.label}</span>
                    <span className="enthusia-nav-number">{item.number}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default ESidebar;
