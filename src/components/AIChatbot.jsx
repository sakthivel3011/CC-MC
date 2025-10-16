import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/AIChatbot.css';
import { clubData, botResponses } from '../services/AIchartbot';

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
        case "Club Events":
          botResponse.text = "🎉 Here are our exciting events:";
          botResponse.options = botResponses.eventsMenu;
          break;
          
        case "Cultural Events":
          const culturalEvents = clubData.events.cultural
            .map(event => `🎭 ${event.name}\n   📅 ${event.date}\n   📍 ${event.venue}\n   📝 ${event.description}`)
            .join('\n\n');
          botResponse.text = `Cultural Events:\n\n${culturalEvents}`;
          botResponse.options = ["Music Events", "Back to Events", "Main Menu"];
          break;
          
        case "Music Events":
          const musicEvents = clubData.events.music
            .map(event => `🎵 ${event.name}\n   📅 ${event.date}\n   📍 ${event.venue}\n   📝 ${event.description}`)
            .join('\n\n');
          botResponse.text = `Music Events:\n\n${musicEvents}`;
          botResponse.options = ["Cultural Events", "Back to Events", "Main Menu"];
          break;
          
        case "Committee Members":
          const committee = Object.entries(clubData.committee)
            .map(([role, member]) => `${getRoleEmoji(role)} ${formatRole(role)}: ${member.name}\n   📚 ${member.department} - ${member.year}\n   📧 ${member.contact}`)
            .join('\n\n');
          botResponse.text = `👥 Club Committee:\n\n${committee}`;
          botResponse.options = ["Contact Details", "About Club", "Main Menu"];
          break;
          
        case "Website Info":
          botResponse.text = `🌐 Our Websites:\n\n🌟 Main Site: ${clubData.websites.main}\n🎊 Enthusia Portal: ${clubData.websites.enthusia}\n\nVisit our websites for latest updates and event registrations!`;
          botResponse.options = ["Contact Details", "Social Media", "Main Menu"];
          break;
          
        case "Contact Details":
          botResponse.text = `📞 Contact Information:\n\n📧 Email: ${clubData.contact.email}\n📱 Phone: ${clubData.contact.phone}\n\nFor quick updates, follow us on social media!`;
          botResponse.options = ["Social Media", "Committee Members", "Main Menu"];
          break;
          
        case "Social Media":
          botResponse.text = `🌐 Follow Us:\n\n📸 Instagram: ${clubData.contact.instagram}\n👥 Facebook: ${clubData.contact.facebook}\n🐦 Twitter: ${clubData.contact.twitter}\n\nStay connected for latest updates!`;
          botResponse.options = ["Contact Details", "Main Menu"];
          break;
          
        case "Upcoming Activities":
          const upcomingEvents = clubData.upcoming
            .map(event => `🚀 ${event.title}\n   📅 ${event.date}\n   📝 ${event.description}`)
            .join('\n\n');
          botResponse.text = `Upcoming Activities:\n\n${upcomingEvents}`;
          botResponse.options = ["Club Events", "Contact Details", "Main Menu"];
          break;
          
        case "About Club":
          botResponse.text = `ℹ️ About Our Club:\n\n${clubData.about}\n\n🎯 Membership Benefits:\n${clubData.membership.benefits.map(benefit => `• ${benefit}`).join('\n')}\n\n📝 How to Join: ${clubData.membership.process}`;
          botResponse.options = ["Committee Members", "Club Events", "Main Menu"];
          break;
          
        case "Back to Events":
          botResponse.text = "Which type of events interests you?";
          botResponse.options = botResponses.eventsMenu;
          break;
          
        case "Back to Main Menu":
        case "Main Menu":
          botResponse.text = "What would you like to know about our club?";
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

  const getRoleEmoji = (role) => {
    const emojis = {
      president: '👑',
      vicePresident: '🎖️',
      secretary: '📝',
      treasurer: '💰'
    };
    return emojis[role] || '👤';
  };

  const formatRole = (role) => {
    const formatted = {
      president: 'President',
      vicePresident: 'Vice President',
      secretary: 'Secretary',
      treasurer: 'Treasurer'
    };
    return formatted[role] || role;
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
        } else if (query.includes('event') || query.includes('competition') || query.includes('festival') || query.includes('show')) {
          botResponse.text = "🎉 I see you're interested in events! Here are our main categories:";
          botResponse.options = botResponses.eventsMenu;
        } else if (query.includes('committee') || query.includes('members') || query.includes('president') || query.includes('secretary') || query.includes('team')) {
          setIsTyping(false);
          handleOptionClick('Committee Members');
          return;
        } else if (query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('reach')) {
          setIsTyping(false);
          handleOptionClick('Contact Details');
          return;
        } else if (query.includes('website') || query.includes('site') || query.includes('enthusia') || query.includes('web')) {
          setIsTyping(false);
          handleOptionClick('Website Info');
          return;
        } else if (query.includes('about') || query.includes('club') || query.includes('membership') || query.includes('join')) {
          setIsTyping(false);
          handleOptionClick('About Club');
          return;
        } else if (query.includes('upcoming') || query.includes('future') || query.includes('next') || query.includes('soon')) {
          setIsTyping(false);
          handleOptionClick('Upcoming Activities');
          return;
        } else if (query.includes('social') || query.includes('instagram') || query.includes('facebook') || query.includes('twitter')) {
          setIsTyping(false);
          handleOptionClick('Social Media');
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
                {message.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
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