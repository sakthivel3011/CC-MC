import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/AIChatbot.css';
import { clubData, botResponses } from '../services/AIchartbot';

// Utility function to make links clickable
const makeLinksClickable = (text) => {
  // Regular expressions for different types of links
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[^\s]*)/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const phoneRegex = /(\+91-?\d{5}-?\d{5}|\+91-?\d{10}|\d{10})/g;

  // Split text by newlines to preserve formatting
  return text.split('\n').map((line, lineIndex) => {
    let parts = [line];
    
    // Process URLs
    parts = parts.flatMap(part => {
      if (typeof part === 'string') {
        return part.split(urlRegex).map((segment, index) => {
          if (urlRegex.test(segment)) {
            // Add https:// if it's missing
            let href = segment;
            if (!href.startsWith('http')) {
              href = `https://${segment}`;
            }
            return (
              <a 
                key={`url-${lineIndex}-${index}`}
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#ff0000ff',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {segment}
              </a>
            );
          }
          return segment;
        });
      }
      return part;
    });

    // Process Email addresses
    parts = parts.flatMap(part => {
      if (typeof part === 'string') {
        return part.split(emailRegex).map((segment, index) => {
          if (emailRegex.test(segment)) {
            return (
              <a 
                key={`email-${lineIndex}-${index}`}
                href={`mailto:${segment}`}
                style={{
                  color: '#28a745',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {segment}
              </a>
            );
          }
          return segment;
        });
      }
      return part;
    });

    // Process Phone numbers
    parts = parts.flatMap(part => {
      if (typeof part === 'string') {
        return part.split(phoneRegex).map((segment, index) => {
          if (phoneRegex.test(segment)) {
            return (
              <a 
                key={`phone-${lineIndex}-${index}`}
                href={`tel:${segment}`}
                style={{
                  color: '#17a2b8',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {segment}
              </a>
            );
          }
          return segment;
        });
      }
      return part;
    });

    return (
      <span key={`line-${lineIndex}`}>
        {parts}
        {lineIndex < text.split('\n').length - 1 && <br />}
      </span>
    );
  });
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const messagesEndRef = useRef(null);

  // Popup messages that will cycle
  const popupMessages = [
    "Need help? ",
    "Ask me! ",
    "I'm here! "
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        text: botResponses.welcome
          .replace('{clubName}', clubData.name)
          .replace('{collegeName}', clubData.college),
        isBot: true,
        options: botResponses.mainMenu
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Auto popup cycling effect - always show when closed
  useEffect(() => {
    if (!isOpen) {
      // Show popup immediately when closed
      setShowPopup(true);

      // Cycle through messages every 4 seconds continuously
      const cycleTimer = setInterval(() => {
        if (!isOpen) {
          setCurrentPopupIndex((prev) => (prev + 1) % popupMessages.length);
        }
      }, 4000);

      return () => {
        clearInterval(cycleTimer);
      };
    } else {
      // Hide popup when chatbot is open
      setShowPopup(false);
    }
  }, [isOpen, popupMessages.length]);

  const handleOptionClick = (option) => {
    // Add user message
    const userMessage = { text: option, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setShowOptions(false);
    setIsTyping(true);

    // Bot response based on option
    setTimeout(() => {
      let botResponse = { isBot: true };
      
      switch(option) {
        // Main Menu Options
        case "Club Events":
          botResponse.text = "🎉 What would you like to know about our events?";
          botResponse.options = botResponses.clubEventsMenu;
          break;
          
        case "Contact Details":
          botResponse.text = "📞 Choose the contact information you need:";
          botResponse.options = botResponses.contactDetailsMenu;
          break;
          
        case "About Club":
          botResponse.text = "ℹ️ What would you like to learn about?";
          botResponse.options = botResponses.aboutClubMenu;
          break;
          
        case "Website Info":
          botResponse.text = "🌐 Choose what website information you need:";
          botResponse.options = botResponses.websiteInfoMenu;
          break;
          
        case "Help":
          botResponse.text = "🆘 How can I help you today?";
          botResponse.options = botResponses.helpMenu;
          break;
          
        case "Feedback":
          botResponse.text = "📝 We value your feedback! What would you like to do?";
          botResponse.options = botResponses.feedbackMenu;
          break;

        // Club Events Sub-menu
        case "Upcoming Events":
          const upcomingEvents = clubData.events.upcoming
            .map(event => ` ${event.name}\n     📍 ${event.venue}\n   📝 ${event.description}\n   🎯 Registration: ${event.registrationlink}\n   🏆 ${event.prizes}`)
            .join('\n\n');
          botResponse.text = `Upcoming Events:\n\n${upcomingEvents}`;
          botResponse.options = ["Past Events", "Event Coordinator Number", "Back to Main Menu"];
          break;
          
        case "Past Events":
          const pastEvents = clubData.events.past
            .map(event => ` ${event.name}\n      📝 ${event.description}\n   👥 ${event.participants}\n  `)
            .join('\n\n');
          botResponse.text = `Past Events:\n\n${pastEvents}`;
          botResponse.options = ["Upcoming Events", "Event Coordinator Number", "Back to Main Menu"];
          break;
          
        case "Event Coordinator Number":
          const coordinator = clubData.events.eventCoordinator;
          botResponse.text = `📞 Event Coordinator Details:\n\n👤 ${coordinator.name}\n🎯 ${coordinator.designation}\n🏢 ${coordinator.department}\n📱 ${coordinator.phone}\n`;
          botResponse.options = ["Upcoming Events", "Past Events", "Back to Main Menu"];
          break;

        // Contact Details Sub-menu
        case "Faculty Coordinator":
          const facultyCoord = clubData.contact.faculty.coordinator;
          const assistantCoord1 = clubData.contact.faculty.assistantCoordinator1;
          const assistantCoord2 = clubData.contact.faculty.assistantCoordinator2;
          const assistantCoord3 = clubData.contact.faculty.assistantCoordinator3;
          botResponse.text = `👨‍🏫 Faculty Coordinators:\n\n🌟 Main Coordinator:\n   ${facultyCoord.name}\n   ${facultyCoord.department}\n   📱 ${facultyCoord.phone}\n   ⏰ ${facultyCoord.availability}\n\n🌟 Assistant Coordinator 1:\n   ${assistantCoord1.name}\n   ${assistantCoord1.department}\n   📱 ${assistantCoord1.phone}\n   ⏰ ${assistantCoord1.availability}\n\n🌟 Assistant Coordinator 2:\n   ${assistantCoord2.name}\n   ${assistantCoord2.department}\n   📱 ${assistantCoord2.phone}\n   ⏰ ${assistantCoord2.availability}\n\n🌟 Assistant Coordinator 3:\n   ${assistantCoord3.name}\n   ${assistantCoord3.department}\n   📱 ${assistantCoord3.phone}\n   ⏰ ${assistantCoord3.availability}\n\n`;
          botResponse.options = ["Student Coordinator", "General Contact Info", "Back to Main Menu"];
          break;
          
        case "Student Coordinator":
          const student = clubData.contact.student;
          botResponse.text = `👨‍🎓 Student Coordinators:\n\n🎖️ ${student.coordinator.name}\n   ${student.coordinator.designation}\n   ${student.coordinator.department} - ${student.coordinator.year}\n   📱 ${student.coordinator.phone}\n   📧 ${student.coordinator.email}\n   🎫 ${student.coordinator.rollNumber}\n\n🎖️ ${student.viceCoordinator.name}\n   ${student.viceCoordinator.designation}\n   ${student.viceCoordinator.department} - ${student.viceCoordinator.year}\n   📱 ${student.viceCoordinator.phone}\n   📧 ${student.viceCoordinator.email}\n   🎫 ${student.viceCoordinator.rollNumber}\n\n📝 ${student.secretary.name} - ${student.secretary.designation}\n   📱 ${student.secretary.phone} | 📧 ${student.secretary.email}\n\n💰 ${student.treasurer.name} - ${student.treasurer.designation}\n   📱 ${student.treasurer.phone} | 📧 ${student.treasurer.email}`;
          botResponse.options = ["Faculty Coordinator", "General Contact Info", "Back to Main Menu"];
          break;
          
        case "General Contact Info":
          const general = clubData.contact.general;
          botResponse.text = `📞 General Contact Information:\n\n📧 Email: ${general.email}\n📱 Phone: ${general.phone}\n🌐 Website: ${general.website}\n� Address: ${general.address}`;
          botResponse.options = ["Faculty Coordinator", "Student Coordinator", "Back to Main Menu"];
          break;

        // About Club Sub-menu
        case "About College":
          const college = clubData.collegeInfo;
          botResponse.text = `🏫 About ${college.name}:\n\n📅 Established: ${college.establishedYear}\n📍 Location: ${college.location}\n🏢 Type: ${college.type}\n🎓 Affiliation: ${college.affiliation}\n\n📖 ${college.description}\n\n🌐 Website: ${college.website}`;
          botResponse.options = ["About Club", "Club Official Website", "Back to Main Menu"];
          break;
          
        case "About Club":
          const about = clubData.about;
          botResponse.text = `🎭 About Our Club:\n\n📖 ${about.club}\n\n🎯 Vision: ${about.vision}\n\n📋 Mission: ${about.mission}\n\n🎪 Our Activities:\n${about.activities.join('\n')}\n\n🏆 Our Achievements:\n${about.achievements.join('\n')}`;
          botResponse.options = ["About College", "Club Official Website", "Back to Main Menu"];
          break;
          
        case "Club Official Website":
          botResponse.text = `🌐 Our Official Websites:\n\n Main Club Site: ${clubData.websites.main}\n🎊 Enthusia Portal: ${clubData.websites.enthusia}\n College Site: ${clubData.websites.college}\n\n✨ Website Features:\n${clubData.websites.features.map(feature => `• ${feature}`).join('\n')}`;
          botResponse.options = ["About College", "About Club", "Back to Main Menu"];
          break;

        // Website Info Sub-menu  
        case "Website Languages":
          botResponse.text = `🌍 Our websites support multiple languages:\n\n${clubData.websites.languages.map(lang => `• ${lang}`).join('\n')}\n\n💻 Built by Sakthivel – AIDS`;
          botResponse.options = ["Club Official Website", "Social Media", "Back to Main Menu"];
          break;
          
        case "Social Media":
          const social = clubData.contact.socialMedia;
          botResponse.text = `📱 Follow Us on Social Media:\n\n📸 Instagram: ${social.instagram.handle}\n   ${social.instagram.url}\n   👥 ${social.instagram.followers}\n\n👥 Facebook: ${social.facebook.handle}\n   ${social.facebook.url}\n   👥 ${social.facebook.followers}\n\n🐦 Twitter: ${social.twitter.handle}\n   ${social.twitter.url}\n   👥 ${social.twitter.followers}\n\n📺 YouTube: ${social.youtube.handle}\n   ${social.youtube.url}\n   👥 ${social.youtube.subscribers}\n\n💼 LinkedIn: ${social.linkedin.handle}\n   ${social.linkedin.url}\n   👥 ${social.linkedin.followers}\n\n🌐 Visit our main website: ${clubData.websites.main}`;
          botResponse.options = ["Club Official Website", "Website Languages", "Back to Main Menu"];
          break;

        // Help Sub-menu
        case "Event Registration Help":
          botResponse.text = `📝 Event Registration Help:\n\n${clubData.help.categories[0].items.map(item => `• ${item}`).join('\n')}\n\nFor more help, contact our support team!`;
          botResponse.options = ["Contact Support", "Membership Queries", "Back to Main Menu"];
          break;
          
        case "Membership Queries":
          botResponse.text = `� Membership Information:\n\n${clubData.help.categories[1].items.map(item => `• ${item}`).join('\n')}\n\n� Benefits:\n${clubData.membership.benefits.slice(0, 5).join('\n')}\n\n📝 Process: ${clubData.membership.process}`;
          botResponse.options = ["Event Registration Help", "Technical Support", "Back to Main Menu"];
          break;
          
        case "Technical Support":
          botResponse.text = `💻 Technical Support:\n\n${clubData.help.categories[2].items.map(item => `• ${item}`).join('\n')}\n\nNeed immediate help? Contact our tech support team!`;
          botResponse.options = ["Contact Support", "General Information", "Back to Main Menu"];
          break;
          
        case "General Information":
          botResponse.text = `ℹ️ General Information:\n\n${clubData.help.categories[3].items.map(item => `• ${item}`).join('\n')}\n\nFor any other queries, feel free to contact us!`;
          botResponse.options = ["Contact Support", "Event Registration Help", "Back to Main Menu"];
          break;
          
        case "Contact Support":
          const support = clubData.help.contactSupport;
          botResponse.text = `🆘 Contact Support:\n\n📧 Email: ${support.email}\n📱 Phone: ${support.phone}\n💬 WhatsApp: ${support.whatsapp}\n🕒 Hours: ${support.hours}\n\n🌐 You can also visit our website: ${clubData.websites.main}\n\nOur support team is here to help you with any queries!`;
          botResponse.options = ["Event Registration Help", "Technical Support", "Back to Main Menu"];
          break;

        // Feedback Sub-menu
        case "Submit Feedback":
          botResponse.text = `📝 Submit Your Feedback:\n\n🎯 Feedback Types:\n${clubData.feedback.types.map(type => `• ${type}`).join('\n')}\n\n� You can submit feedback through multiple channels - choose what's convenient for you!`;
          botResponse.options = ["Feedback Channels", "Feedback Process", "Back to Main Menu"];
          break;
          
        case "Feedback Process":
          botResponse.text = `📋 Feedback Process:\n\n${clubData.feedback.process}\n\n⏱️ Response Time: ${clubData.feedback.responseTime}\n🔒 Anonymous Option: ${clubData.feedback.anonymousOption}`;
          botResponse.options = ["Submit Feedback", "Feedback Channels", "Back to Main Menu"];
          break;
          
        case "Feedback Channels":
          botResponse.text = `📞 Feedback Channels:\n\n${clubData.feedback.channels.map(channel => 
            `🔸 ${channel.method}:\n   ${channel.email || channel.phone || channel.url || channel.location}\n   📝 ${channel.description}`
          ).join('\n\n')}\n\n🌐 Main Website: ${clubData.websites.main}`;
          botResponse.options = ["Submit Feedback", "Feedback Process", "Back to Main Menu"];
          break;
          
        // Navigation
        case "Back to Main Menu":
        case "Main Menu":
          botResponse.text = "🏠 What would you like to know about our club?";
          botResponse.options = botResponses.mainMenu;
          break;
          
        default:
          botResponse.text = botResponses.fallback;
          botResponse.options = botResponses.mainMenu;
      }
      
      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
      setShowOptions(true);
    }, 1000);
  };



  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, isBot: false };
      setMessages(prev => [...prev, userMessage]);
      const query = inputValue.toLowerCase();
      setInputValue('');
      setIsTyping(true);
      
      setTimeout(() => {
        let botResponse = { isBot: true };
        
        // Enhanced keyword matching for better user experience
        if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
          botResponse.text = "👋 Hello! Welcome to our Cultural & Music Club! How can I help you today?";
          botResponse.options = botResponses.mainMenu;
        } else if (query.includes('thanks') || query.includes('thank you') || query.includes('thx')) {
          botResponse.text = "😊 You're welcome! Is there anything else you'd like to know about our club?";
          botResponse.options = botResponses.mainMenu;
        } else if (query.includes('event') || query.includes('competition') || query.includes('festival') || query.includes('show') || query.includes('upcoming') || query.includes('past')) {
          setIsTyping(false);
          handleOptionClick('Club Events');
          return;
        } else if (query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('reach') || query.includes('faculty') || query.includes('student') || query.includes('coordinator')) {
          setIsTyping(false);
          handleOptionClick('Contact Details');
          return;
        } else if (query.includes('about') || query.includes('club') || query.includes('college') || query.includes('kongu') || query.includes('information')) {
          setIsTyping(false);
          handleOptionClick('About Club');
          return;
        } else if (query.includes('website') || query.includes('site') || query.includes('enthusia') || query.includes('web') || query.includes('social') || query.includes('instagram') || query.includes('facebook')) {
          setIsTyping(false);
          handleOptionClick('Website Info');
          return;
        } else if (query.includes('help') || query.includes('support') || query.includes('assistance') || query.includes('problem') || query.includes('issue')) {
          setIsTyping(false);
          handleOptionClick('Help');
          return;
        } else if (query.includes('feedback') || query.includes('suggestion') || query.includes('complaint') || query.includes('review') || query.includes('opinion')) {
          setIsTyping(false);
          handleOptionClick('Feedback');
          return;
        } else {
          botResponse.text = botResponses.error;
          botResponse.options = botResponses.mainMenu;
        }
        
        setIsTyping(false);
        setMessages(prev => [...prev, botResponse]);
        setShowOptions(true);
      }, 800);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowOptions(true);
    setIsTyping(false);
    
    // Re-add welcome message after clearing
    setTimeout(() => {
      const welcomeMessage = {
        text: botResponses.welcome
          .replace('{clubName}', clubData.name)
          .replace('{collegeName}', clubData.college),
        isBot: true,
        options: botResponses.mainMenu
      };
      setMessages([welcomeMessage]);
    }, 300);
  };

  return (
    <div className="ai-chatbot-container">
      {/* Auto Popup Message */}
      {showPopup && !isOpen && (
        <div className="chatbot-popup" onClick={() => setIsOpen(true)}>
          <div className="popup-message">
            {popupMessages[currentPopupIndex]}
          </div>
          <div className="popup-arrow"></div>
        </div>
      )}

      {/* Chatbot Button */}
      <div 
        className={`chatbot-button ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="chatbot-icon">
          <span>🤖</span>
        </div>
      </div>

      {/* Chatbot Window */}
      <div className={`chatbot-window ${isOpen ? 'active' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="club-logo">
            <div className="logo-image">
              <img 
                src="/icon.png" 
                alt="Club Logo" 
                className="club-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="logo-fallback" style={{display: 'none'}}>
                🎵
              </div>
            </div>
            <div className="club-info">
              <h3>{clubData.name}</h3>
              <span>AI Assistant • Online</span>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="close-btn" 
              onClick={() => setIsOpen(false)}
              title="Close Chat"
              aria-label="Close chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}>
              {message.isBot && (
                <div className="bot-avatar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5c-.55.55-.15 1.5.64 1.5H8c.55 0 1-.45 1-1v-1h6v1c0 .55.45 1 1 1h1.36c.79 0 1.19-.95.64-1.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM9 12c-.83 0-1.5-.67-1.5-1.5S8.17 9 9 9s1.5.67 1.5 1.5S9.83 12 9 12zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 9 15 9s1.5.67 1.5 1.5S15.83 12 15 12z"/>
                  </svg>
                </div>
              )}
              <div className="message-bubble">
                {makeLinksClickable(message.text)}
              </div>
              {!message.isBot && (
                <div className="user-avatar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="message bot-message">
              <div className="bot-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5c-.55.55-.15 1.5.64 1.5H8c.55 0 1-.45 1-1v-1h6v1c0 .55.45 1 1 1h1.36c.79 0 1.19-.95.64-1.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM9 12c-.83 0-1.5-.67-1.5-1.5S8.17 9 9 9s1.5.67 1.5 1.5S9.83 12 9 12zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 9 15 9s1.5.67 1.5 1.5S15.83 12 15 12z"/>
                </svg>
              </div>
              <div className="message-bubble typing-indicator">
                <div className="simple-loader"></div>
              </div>
            </div>
          )}
          
          {/* Options Buttons */}
          {showOptions && messages.length > 0 && !isTyping && (
            <div className="options-container">
              {messages[messages.length - 1].options?.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="message-input"
            />
            <button 
              onClick={handleSendMessage}
              className="send-button"
              disabled={!inputValue.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;