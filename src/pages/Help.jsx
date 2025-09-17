import React, { useState } from 'react';
import '../assets/styles/Help.css'; // Adjust the path as necessary

const Help = () => {
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faqActive, setFaqActive] = useState(null);

  // Google Apps Script URL (replace with your own)
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwFdZNT6GDosObNXaKxpl72nQMFCcNVHlzM2ca9mi9l8wenHQwf86SLf-aY8QajgkdP/exec';

  const toggleMessageBox = () => {
    setIsMessageBoxOpen(!isMessageBoxOpen);
    if (isSubmitted) {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to Google Apps Script
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // Even with no-cors, we can't read the response but we assume it succeeded
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsMessageBoxOpen(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setFaqActive(faqActive === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I join the Cultural & Music Club?",
      answer: "You can join by attending our weekly meetings every Thursday at 4 PM in the Student Center, or by signing up through the student portal."
    },
    {
      question: "Do I need prior experience to participate?",
      answer: "No prior experience is needed! We welcome students of all skill levels who are passionate about culture and music."
    },
    {
      question: "What types of events does the club organize?",
      answer: "We organize cultural festivals, music workshops, open mic nights, and annual performances showcasing diverse cultural traditions."
    },
    {
      question: "How can I contact the club leadership?",
      answer: "You can reach out to our office bearers through the Contact page or visit us during our office hours (Mon-Wed, 3-5 PM)."
    },
    {
      question: "Are there membership fees?",
      answer: "There's a nominal annual membership fee of $20 that helps cover event costs and resources. Fee waivers are available for those in need."
    }
  ];

  return (
    <div className="help-page">
      {/* Header Section */}

    
    <main className="help-main container">
        <div className="row">
            

            <div className="col-lg-4">
                <aside className="help-sidebar">
                    <div className="support-card">
                        <h3>Need Immediate Help?</h3>
                        <p>Our support team is available during office hours to assist you</p>
                        <div className="support-info">
                            <p>
                                <i className="fas fa-clock"></i> Mon-Fri: 9AM-4PM
                            </p>
                            <p>
                                <i className="fas fa-phone"></i>{' '}
                                <a href="tel:8925490989" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    8925490989
                                </a>
                            </p>
                            <p>
                                <i className="fas fa-envelope"></i>{' '}
                                <a href="mailto:kecculturalclub@kongu.edu" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    kecculturalclub@kongu.edu
                                </a>
                            </p>
                        </div>
                        <button className="btn-support" onClick={toggleMessageBox}>
                            Send Message
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </main>
      {isMessageBoxOpen && (
        <div className="message-box">
          <div className="message-box-content">
            <div className="message-box-header">
              <h3>Send us a Message</h3>
              <button className="close-btn" onClick={toggleMessageBox}>×</button>
            </div>
            {isSubmitted ? (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <p>Your message has been sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows="4" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Help;