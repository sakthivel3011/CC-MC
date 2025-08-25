import { useState, useEffect } from 'react';
import logo from '/logo.png';
import '../assets/styles/Navbar.css';

const ContactPopup = ({ onClose }) => {
  const contacts = [
    { name: "Faculty Coordinator :", number: "", highlight: "faculty" },
    { name: "Dr.V.N.Kowshalaya -", number: "70108 77103" },
    { name: "Mr.K.V.Satheesh Kumar -", number: "95783 67576" },
    { name: "Ms.S.Keerthana -", number: "8870756287" },
    { name: "Ms.S.Sharvanthika -", number: "8778955508" },
    { name: "Student Coordinators :", number: "", highlight: "student" },
    { name: "Mr.V.Mahashwin -", number: "9942621479" },
    { name: "Mr.S.Kavin -", number: "8610177301" },
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
            <div key={index} className="contact-item">
              <h3>{contact.name}</h3>
              <a href={`tel:${contact.number.replace(/[^0-9]/g, "")}`}>
                {contact.number}
              </a>
              {index < contacts.length - 1 && <hr />}
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
            <a href="/">
              <img src={logo} alt="Cultural And Music Club Logo" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/event" className="nav-link">Events</a>
            <a href="/office-bearers" className="nav-link">Office Bearers</a>
            <a href="/gallery" className="nav-link">Gallery</a>
            <a href="/enthusia" className="nav-link">Enthusia</a>
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
            <a href="/" className="nav-link" onClick={toggleMenu}>Home</a>
            <a href="/event" className="nav-link" onClick={toggleMenu}>Events</a>
            <a href="/office-bearers" className="nav-link" onClick={toggleMenu}>Office Bearers</a>
            <a href="/gallery" className="nav-link" onClick={toggleMenu}>Gallery</a>
            <a href="/enthusia" className="nav-link" onClick={toggleMenu}>Enthusia</a>
            <button className="nav-link contact-btn" onClick={() => {
              toggleContact();
              toggleMenu();
            }}>Contact</button>
          </div>
        </div>
      </nav>

      {showContact && <ContactPopup onClose={() => setShowContact(false)} />}
    </>
  );
};

export default Navbar;