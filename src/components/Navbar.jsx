import { useState, useEffect } from 'react';
import logo from '/logo.png';
import '../assets/styles/Navbar.css';

const ContactPopup = ({ onClose }) => {
  const contacts = [
    { name: "Faculty Coordinator ", number: "", type: "faculty-header" },
    { name: "Mr.K.V.Satheesh Kumar", number: "6383219802", type: "faculty" },
    { name: "Dr.V.N.Kowshalaya", number: "70108 77103", type: "faculty" },
    { name: "Ms.S.Keerthana", number: "8870756287", type: "faculty" },
    { name: "Ms.S.Sharvanthika", number: "8778955508", type: "faculty" },
    { name: "Student Coordinators", number: "", type: "student-header" },
    { name: "Mr.V.Mahashwin-secretary", number: "9942621479", type: "student" },
    { name: "Mr.S.Kavin-Treasurer", number: "8610177301", type: "student" },
    { name: "Web Designer", number: "", type: "faculty-header" },
    { name: "Mr.S.Sakthivel", number: "8925490989", type: "faculty" },
  ];

  return (
    <div className="contact-popup-overlay" onClick={onClose}>
      <div className="contact-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="contact-popup-header">
          <h2>Club Contacts</h2>
          <button className="contact-popup-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="contact-popup-body">
          {contacts.map((contact, index) => (
            <div key={index} className={`contact-item ${contact.type}`}>
              <div className="contact-info">
                <h3 className="contact-name">{contact.name}</h3>
                {contact.number && (
                  <a href={`tel:${contact.number.replace(/[^0-9]/g, "")}`} className="contact-number">
                    {contact.number}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleContact = () => {
    setShowContact(!showContact);
    if (isOpen) setIsOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo on the left */}
          <div className="navbar-logo">
            <a href="http://cmc.kongu.edu/">
              <img src={logo} alt="Cultural And Music Club Logo" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/events" className="nav-link">Events</a>
            <a href="/office-bearers" className="nav-link">Office Bearers</a>
            <a href="/gallery" className="nav-link">Gallery</a>
            
            <button className="nav-link contact-btn" onClick={toggleContact}>Contact</button>
          </div>
          <div className="mobile-menu-btn" onClick={toggleMenu}>
            <div className={`hamburger ${isOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
            
            <div className="mobile-nav-content">
              <div className="mobile-nav-item">
                <a href="/" className="nav-link" onClick={toggleMenu}>
                  Home
                </a>
              </div>
              <div className="mobile-nav-item">
                <a href="/events" className="nav-link" onClick={toggleMenu}>
                  Events
                </a>
              </div>
              <div className="mobile-nav-item">
                <a href="/office-bearers" className="nav-link" onClick={toggleMenu}>
                  Office Bearers
                </a>
              </div>
              <div className="mobile-nav-item">
                <a href="/gallery" className="nav-link" onClick={toggleMenu}>
                  Gallery
                </a>
              </div>
              <div className="mobile-nav-item">
                <a href="/enthusia" className="nav-link" onClick={toggleMenu}>
                  Enthusia
                </a>
              </div>
              <div className="mobile-nav-item">
                <button className="nav-link contact-btn" onClick={() => {
                  toggleContact();
                  toggleMenu();
                }}>
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showContact && <ContactPopup onClose={() => setShowContact(false)} />}
    </>
  );
};

export default Navbar;