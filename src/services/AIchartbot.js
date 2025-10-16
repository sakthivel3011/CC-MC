// AI Chart Bot Data Storage
// This file contains all the club data and configuration

const clubData = {
  name: "Cultural & Music Club",
  fullName: "Cultural & Music Club, Kongu Engineering College",
  college: "Kongu Engineering College",
  websites: {
    main: "cmc.kongu.edu",
    enthusia: "enthusia.kongu.edu"
  },
  
  // Club Events Data
  events: {
    cultural: [
      {
        name: "Dance Competition",
        description: "Inter-college dance competition with various categories",
        date: "March 15, 2024",
        venue: "Main Auditorium"
      },
      {
        name: "Music Festival",
        description: "Annual music festival featuring bands and solo performers",
        date: "April 5, 2024", 
        venue: "Open Air Theater"
      },
      {
        name: "Drama Night",
        description: "Theatrical performances by college drama teams",
        date: "March 25, 2024",
        venue: "Mini Auditorium"
      },
      {
        name: "Art Exhibition",
        description: "Display of student artwork and creative projects",
        date: "April 10, 2024",
        venue: "Art Gallery"
      }
    ],
    
    music: [
      {
        name: "Band Performance",
        description: "Live performances by college bands",
        date: "March 20, 2024",
        venue: "Open Air Theater"
      },
      {
        name: "Solo Singing",
        description: "Individual singing competition",
        date: "April 1, 2024",
        venue: "Music Room"
      },
      {
        name: "Instrumental",
        description: "Musical instrument performance competition", 
        date: "April 8, 2024",
        venue: "Music Room"
      },
      {
        name: "Karaoke Night",
        description: "Fun karaoke session for all students",
        date: "March 30, 2024",
        venue: "Student Center"
      }
    ]
  },
  
  // Committee Members
  committee: {
    president: {
      name: "John Doe",
      department: "Computer Science",
      year: "Final Year",
      contact: "john.doe@kongu.edu"
    },
    vicePresident: {
      name: "Jane Smith", 
      department: "Electronics",
      year: "Third Year",
      contact: "jane.smith@kongu.edu"
    },
    secretary: {
      name: "Mike Johnson",
      department: "Mechanical", 
      year: "Third Year",
      contact: "mike.johnson@kongu.edu"
    },
    treasurer: {
      name: "Sarah Wilson",
      department: "Civil",
      year: "Second Year", 
      contact: "sarah.wilson@kongu.edu"
    }
  },
  
  // Contact Information
  contact: {
    email: "cmc@kongu.edu",
    phone: "+91-123-456-7890",
    instagram: "@kongu_cmc",
    facebook: "KonguCMC",
    twitter: "@Kongu_CMC"
  },
  
  // Upcoming Activities
  upcoming: [
    {
      title: "Annual Cultural Fest",
      date: "March 15-17, 2024222",
      description: "3-day cultural extravaganza with various events"
    },
    {
      title: "Music Workshop", 
      date: "April 5, 202994",
      description: "Workshop by professional musicians"
    },
    {
      title: "Inter-College Competition",
      date: "May 10-12, 2024", 
      description: "Competition with other engineering colleges"
    }
  ],
  
  // Club Description
  about: "The Cultural & Music Club of Kongu Engineering College promotes artistic and musical talents among students. We organize various events, workshops, and competitions throughout the year to nurture creativity and provide platforms for students to showcase their talents.",
  
  // Membership Info
  membership: {
    process: "Open to all students of Kongu Engineering College. Simply visit our office or contact any committee member to join!",
    benefits: [
      "🎭 Participation in all club events and competitions",
      "🎵 Access to music instruments and practice rooms",
      "📚 Exclusive workshops and training sessions",
      "🎤 Performance opportunities on campus",
      "🤝 Networking with like-minded creative students",
      "🏆 Priority registration for popular events",
      "📸 Feature in club publications and social media"
    ],
    requirements: [
      "Must be a current student at Kongu Engineering College",
      "Enthusiasm for cultural and musical activities",
      "Commitment to participate in club activities"
    ]
  },
  
  // FAQ Data
  faq: [
    {
      question: "How do I register for events?",
      answer: "Visit our websites (cmc.kongu.edu or enthusia.kongu.edu) or contact our committee members. Registration links are also shared on our social media."
    },
    {
      question: "Are events free for members?",
      answer: "Most events are free for club members! Some special workshops may have nominal fees for materials."
    },
    {
      question: "Can I propose my own event idea?",
      answer: "Absolutely! We encourage creative ideas. Contact our committee members to discuss your proposal."
    }
  ],
  
  // Club Statistics
  stats: {
    establishedYear: "2018",
    totalMembers: "150+",
    eventsPerYear: "25+",
    achievementsCount: "10+"
  }
};

// Bot Responses Configuration
const botResponses = {
  welcome: "Welcome to {clubName}, {collegeName}! 🎉 I'm your virtual assistant. How can I help you today?",
  fallback: "I'm here to help with club information! Please choose from the options below or ask about our events, committee, or contact details.",
  error: "🤔 I'm not sure about that, but I can help you with club information! Please choose from the options below:",
  
  // Menu Options
  mainMenu: [
    "Club Events",
    "Committee Members", 
    "Website Info",
    "Contact Details",
    "Upcoming Activities",
    "About Club"
  ],
  
  eventsMenu: [
    "Cultural Events",
    "Music Events", 
    "Back to Main Menu"
  ],
  
  contactMenu: [
    "Contact Details",
    "Social Media",
    "Back to Main Menu"
  ],
  
  // Additional responses for better interaction
  greetings: [
    "Hello! Welcome to our Cultural & Music Club! 👋",
    "Hi there! Ready to explore our amazing events? 🎉",
    "Hey! How can I assist you with club information today? 😊"
  ],
  
  thanks: [
    "You're welcome! Is there anything else you'd like to know? 😊",
    "Happy to help! Feel free to ask more questions! 🎵",
    "Glad I could assist! Explore more club features! 🎭"
  ]
};

// Export for use in React component
export { clubData, botResponses };

// For server-side usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { clubData, botResponses };
}