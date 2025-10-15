import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner, FaCalendarAlt, FaUsers, FaPhone, FaMusic, FaGlobe, FaCode } from 'react-icons/fa';
import AOS from 'aos';
import '../assets/styles/AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 Welcome to CC-MC Cultural & Music Club!\n\nI'm your personal AI assistant here to help you with everything about our club. To get started, could you please tell me your name? 😊",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userName, setUserName] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);

  // Direct club data - no Google Sheets needed
  const clubData = {
    coordinators: [
      { name: "Sakthivel Kumar", role: "President", contact: "+91 9876543210", email: "sakthi@kongu.edu", department: "CSE" },
      { name: "Priya Sharma", role: "Vice President", contact: "+91 9876543211", email: "priya@kongu.edu", department: "ECE" },
      { name: "Arjun Raj", role: "Secretary", contact: "+91 9876543212", email: "arjun@kongu.edu", department: "MECH" },
      { name: "Kavitha Devi", role: "Treasurer", contact: "+91 9876543213", email: "kavitha@kongu.edu", department: "EEE" },
      { name: "Rahul Krishna", role: "Cultural Head", contact: "+91 9876543214", email: "rahul@kongu.edu", department: "IT" },
      { name: "Deepika Nair", role: "Music Head", contact: "+91 9876543215", email: "deepika@kongu.edu", department: "CSE" }
    ],
    events: [
      { 
        name: "Onam Celebration 2025", 
        date: "September 15, 2025", 
        venue: "Main Auditorium", 
        contact: "Sakthivel Kumar",
        description: "Traditional Onam celebration with Pookalam, cultural programs, and Sadhya",
        time: "10:00 AM - 4:00 PM"
      },
      { 
        name: "Raaga - Annual Music Festival", 
        date: "November 20-22, 2025", 
        venue: "College Ground", 
        contact: "Deepika Nair",
        description: "3-day music festival featuring classical, folk, and contemporary performances",
        time: "6:00 PM onwards"
      },
      { 
        name: "Cultural Night - Abhivyakti", 
        date: "December 15, 2025", 
        venue: "Open Air Theatre", 
        contact: "Rahul Krishna",
        description: "Grand cultural evening with dance, drama, music and talent showcase",
        time: "7:00 PM - 10:00 PM"
      },
      { 
        name: "Inter-Department Music Competition", 
        date: "October 30, 2025", 
        venue: "Main Auditorium", 
        contact: "Priya Sharma",
        description: "Competitive music event across all departments",
        time: "2:00 PM - 6:00 PM"
      },
      { 
        name: "Traditional Dance Workshop", 
        date: "November 5, 2025", 
        venue: "Dance Hall", 
        contact: "Kavitha Devi",
        description: "Learn classical and folk dance forms from expert instructors",
        time: "4:00 PM - 6:00 PM"
      }
    ],
    contacts: [
      { type: "Official Email", value: "ccmc@kongu.edu", description: "For all official communications" },
      { type: "Phone", value: "+91 4294 226000", description: "College main office" },
      { type: "WhatsApp Group", value: "+91 9876543210", description: "Join our WhatsApp group for updates" },
      { type: "Instagram", value: "@ccmc_kongu", description: "Follow us for event updates and photos" },
      { type: "Address", value: "Kongu Engineering College, Perundurai, Tamil Nadu 638060", description: "Visit us at campus" }
    ],
    activities: [
      "🎵 Classical Music Training",
      "💃 Traditional Dance Classes", 
      "🎭 Drama and Theatre Workshops",
      "🎤 Singing Competitions",
      "🥁 Instrument Learning Sessions",
      "🎨 Art and Craft Workshops",
      "📚 Cultural Literature Events",
      "🌺 Festival Celebrations"
    ],
    developer: {
      name: "Sakthivel S",
      department: "AIDS",
      contact: "8925490989",
      portfolio: "sakthis.netlify.app"
    },
    college: {
      name: "Kongu Engineering College",
      location: "Perundurai, Tamil Nadu",
      website: "kongu.ac.in",
      description: "A premier engineering institution fostering innovation and excellence in technical education."
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setShowTooltip(false);
    }
  }, [isOpen]);

  // Show tooltip after 3 seconds when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse = generateBotResponse(currentInput);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // First time - ask for name
    if (!hasGreeted && !userName) {
      setUserName(userInput);
      setHasGreeted(true);
      return `Hi ${userInput}! 🎉 Nice to meet you!\n\nWelcome to Cultural & Music Club of Kongu Engineering College! 🏛️\n\nWhat do you want to know about?\n\n🎪 **UPCOMING EVENTS**\n🎭 **COORDINATORS INFO**\n📱 **CONTACT DETAILS**\n🌐 **WEBSITE INFO**\n👨‍💻 **DEVELOPER INFO**\n🏫 **ABOUT COLLEGE**\n🎵 **CLUB ACTIVITIES**\n\nJust type what interests you most! 😊`;
    }

    // After greeting, provide personalized responses
    const name = userName || "friend";

    // Developer info queries
    if (input.includes('developer') || input.includes('created') || input.includes('built') || input.includes('sakthivel')) {
      return `${name}, here's information about who created this website and AI bot:\n\n👨‍💻 **DEVELOPER INFO**\n\n🔸 **Name:** ${clubData.developer.name}\n🔸 **Department:** ${clubData.developer.department}\n🔸 **Contact:** ${clubData.developer.contact}\n🔸 **Portfolio:** Visit my work at ${clubData.developer.portfolio}\n\n💡 This AI chatbot and website were built with modern React technology to help you get instant information about CC-MC!\n\nNeed help with web development or AI bots? Feel free to reach out! 🚀`;
    }

    // Website info queries
    if (input.includes('website') || input.includes('official') || input.includes('site') || input.includes('web')) {
      return `${name}, here's our official website information:\n\n🌐 **OFFICIAL WEBSITE**\n\n🔗 **CC-MC Official:** ${clubData.college.website}\n\n📋 **Website Features:**\n• Office Bearers Information\n• Event Details & Gallery\n• Club Activities & Programs\n• Registration Forms\n• News & Updates\n• Contact Information\n\n💻 **Developer Portfolio:** ${clubData.developer.portfolio}\n\n✨ Visit our official site for complete information and online registrations!`;
    }

    // College info queries
    if (input.includes('college') || input.includes('kongu') || input.includes('about college') || input.includes('institution')) {
      return `${name}, here's about our college:\n\n🏫 **${clubData.college.name.toUpperCase()}**\n\n📍 **Location:** ${clubData.college.location}\n🌐 **Website:** ${clubData.college.website}\n\n📝 **About:**\n${clubData.college.description}\n\n🎓 **Departments:** Engineering, Technology, Management\n🏆 **Achievements:** Premier institution with excellent placement records\n🌟 **Culture:** Rich tradition of academic excellence and cultural activities\n\n💫 Our Cultural & Music Club is proud to be part of this prestigious institution!`;
    }

    // Specific coordinator queries
    if (input.includes('coordinator') || input.includes('contact') || input.includes('president') || input.includes('secretary')) {
      return `${name}, here are all our coordinators:\n\n🎭 **CLUB COORDINATORS**\n\n${clubData.coordinators.map(coord => `👤 **${coord.name}** - ${coord.role}\n📱 ${coord.contact}\n📧 ${coord.email}\n🏢 ${coord.department} Department`).join('\n\n')}\n\n💡 You can contact any coordinator for club activities, registrations, or queries!`;
    }

    // Event queries  
    if (input.includes('event') || input.includes('program') || input.includes('celebration') || input.includes('festival') || input.includes('upcoming')) {
      return `${name}, here are our exciting upcoming events:\n\n🎪 **UPCOMING EVENTS**\n\n${clubData.events.map(event => `🎊 **${event.name}**\n📅 ${event.date}\n⏰ ${event.time}\n📍 ${event.venue}\n📝 ${event.description}\n👤 Contact: ${event.contact}`).join('\n\n')}\n\n🎉 Mark your calendars and join us for these amazing events!`;
    }

    // Activities queries
    if (input.includes('activit') || input.includes('workshop') || input.includes('class') || input.includes('training')) {
      return `${name}, we offer these amazing activities:\n\n🎵 **CLUB ACTIVITIES**\n\n${clubData.activities.join('\n')}\n\n🌟 **Benefits:**\n• Develop cultural skills\n• Build confidence\n• Make new friends\n• Showcase talents\n• Learn from experts\n\n💫 Join any activity that interests you! All are welcome!`;
    }

    // Join/registration queries
    if (input.includes('join') || input.includes('register') || input.includes('membership') || input.includes('how')) {
      return `Great to hear you want to join us, ${name}! 🎉\n\n📋 **HOW TO JOIN CC-MC:**\n\n1️⃣ **Contact President**\n   ${clubData.coordinators[0].name}: ${clubData.coordinators[0].contact}\n\n2️⃣ **Visit Official Website**\n   ${clubData.college.website}\n\n3️⃣ **Fill Registration Form**\n   Available online and offline\n\n4️⃣ **Attend Orientation**\n   Learn about activities & events\n\n5️⃣ **Start Participating!**\n   Join workshops, events & competitions\n\n💰 **Membership is FREE!** 🌟\n\nReady to be part of our cultural family?`;
    }

    // General help
    if (input.includes('help') || input.includes('info') || input.includes('tell')) {
      return `I'm here to help, ${name}! 😊\n\n🎯 **WHAT I CAN HELP WITH:**\n\n🎪 Event information & schedules\n🎭 Coordinator contacts\n📱 Contact details\n🌐 Website information\n👨‍💻 Developer details\n🏫 College information\n🎵 Club activities\n📝 How to join\n\n💬 Just ask me anything about CC-MC!`;
    }

    // Thank you responses
    if (input.includes('thank') || input.includes('thanks')) {
      return `You're welcome, ${name}! 😊\n\nAlways happy to help with CC-MC information!\n\n🎭✨ Enjoy being part of our cultural community!`;
    }

    // Default response
    return `Hey ${name}! 😊\n\nI can help you with:\n\n🎪 **Events** - "Tell me about events"\n🎭 **Coordinators** - "Show coordinators"\n🌐 **Website** - "Official website info"\n👨‍💻 **Developer** - "Who built this?"\n🏫 **College** - "About Kongu college"\n🎵 **Activities** - "What activities?"\n📝 **Join** - "How to join?"\n\nWhat would you like to know? 🎭✨`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Widget */}
      <div className={`chatbot-widget ${isOpen ? 'active' : ''}`} data-aos="zoom-in-up" data-aos-duration="800">
        {/* Chat Button */}
        <div className="chat-button" onClick={toggleChat}>
          {isOpen ? (
            <FaTimes className="chat-icon" />
          ) : (
            <>
              <FaRobot className="chat-icon" />
              {unreadCount > 0 && (
                <div className="unread-badge" data-aos="pulse">
                  {unreadCount}
                </div>
              )}
            </>
          )}
          <div className="pulse-ring"></div>
          <div className="pulse-ring-2"></div>
          
          {/* Tooltip */}
          {showTooltip && !isOpen && (
            <div className="chat-tooltip" data-aos="fade-left" data-aos-duration="500">
              <div className="tooltip-content">
                <span>💬 Hi! I'm your CC-MC AI assistant!</span>
                <small>Ask me about events, coordinators, and more!</small>
              </div>
              <div className="tooltip-arrow"></div>
            </div>
          )}
        </div>

        {/* Chat Window */}
        {isOpen && (
          <div className="chat-window" data-aos="slide-up" data-aos-duration="500">
            {/* Header */}
            <div className="chat-header">
              <div className="header-left">
                <div className="club-logo">
                  <img src="/logo.png" alt="CC-MC Logo" className="logo-image" />
                </div>
                <div className="bot-info">
                  <h4>CC-MC Assistant</h4>
                  <span className="status">
                    <div className="status-dot"></div>
                    Online
                  </span>
                </div>
              </div>
              <div className="bot-avatar">
                <FaRobot />
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}
                  data-aos="fade-up"
                  data-aos-duration="300"
                >
                  {message.isBot && (
                    <div className="message-avatar">
                      <FaRobot />
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message bot-message typing" data-aos="fade-up">
                  <div className="message-avatar">
                    <FaRobot />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <FaSpinner className="spinner" />
                      <span>Assistant is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-container">
              <div className="chat-input">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about coordinators, events, contacts..."
                  rows="1"
                />
                <button onClick={handleSendMessage} disabled={!inputText.trim()}>
                  <FaPaperPlane />
                </button>
              </div>
              <div className="quick-actions">
                <button onClick={() => setInputText('Tell me about events')}>
                  <FaCalendarAlt /> Events
                </button>
                <button onClick={() => setInputText('Show coordinators')}>
                  <FaUsers /> Coordinators
                </button>
                <button onClick={() => setInputText('Developer info')}>
                  <FaCode /> Developer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AIChatbot;