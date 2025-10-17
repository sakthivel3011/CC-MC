// AI Chart Bot Data Storage
// This file contains all the club data and configuration

const clubData = {
  name: "Cultural & Music Club",
  fullName: "Cultural & Music Club, Kongu Engineering College",
  college: "Kongu Engineering College",
  
  // College Information
  collegeInfo: {
    name: "Kongu Engineering College",
    establishedYear: "1984",
    location: "Perundurai, Tamil Nadu, India",
    type: "Private Engineering College",
    affiliation: "Anna University",
    description: "Kongu Engineering College is one of the premier engineering institutions in Tamil Nadu, known for its excellence in technical education and research.",
    website: "https://www.kongu.ac.in"
  },
  
  // Website Information
  websites: {
    main: "https://cmc.kongu.edu",
    enthusia: "https://enthusia.kongu.edu",
    college: "https://www.kongu.ac.in",
    languages: ["Built with React", "Database powered by Google Apps Script", "Integrated AI Bot developed using React."],
    features: [
      "Event Registration Portal",
      "Gallery & Photo Albums", 
      "News & Updates",
      "Member Directory",
      "Built with React, Google Apps Script, and AI Bot (React).",
      "Developed by Sakthivel – AIDS | Tel: +91-8925490989"
      
    ]
  },
  
  // Club Events Data
  events: {
    upcoming: [
      {
        name: "Sketch-2k25",
        description: "featuring music, dance, and art from around the world. Open to all, not for KEC students.",
        venue: "College Auditorium",
        registrationlink: "https://cmc.kongu.edu/#/event",
        prizes: "Trophy & Cash Prizes"
      },
      {
        name: "Enthusia-2k26",
        description: "The biggest 2-day cultural event in KEC! Open only for KEC students. Experience music, dance, art, and more.",
        venue: "kongu convention center",
        registrationlink: "https://cmc.kongu.edu/#/event",
        prizes: "Trophy & Best Department Award"
      },
    ],
    
    past: [
      {
        name: "Inauguration",
        description: "Inauguration of the new cultural Club",
        participants: "200+ students",
      },
      {
        name: "Techno Cultural Fest",
        description: "Two days of music, art, and culture for School students",
        participants: "5000+ students",
      },
      {
        name: "Founder's Day",
        description: "Celebrating the founding of our institution",
        participants: "1000+ Faculty & Students",
      },
      {
        name: "Onam Celebration-2k25",
        description: "This Onam is the 1st time in KEC.",
        participants: "900+ students",
      },
      {
        name: "Raaga-2k25",
        description: "Group singing competition for KEC students only. Form your group and showcase your talent.",
        participants: "300+ students",
      },
    ],
    
    eventCoordinator: {
      name: "Mr.S.Kavin",
      designation: "Student Coordinator - Events",
      department: "Department of AIDS",
      phone: "8610177301",
    }
  },
  
  // Contact Information
  contact: {
    faculty: {
      coordinator: {
        name: "Mr.K.V.Satheesh Kumar",
        department: "Department of MECH",
        phone: "+91-6383219802",
        availability: "Mon-Fri, 10:00 AM - 4:00 PM"
      },
      assistantCoordinator1: {
        name: "Dr.V.N.Kowshalaya",
        department: "Department of S&H",
        phone: "+91-7010877103", 
        availability: "Mon-Fri, 9:00 AM - 5:00 PM"
      },
      assistantCoordinator2: {
        name: "Ms.S.Keerthana",
        department: "Department of CT-UG",
        phone: "+91-8870756287", 
        availability: "Mon-Fri, 10:00 AM - 4:00 PM"
      },
      assistantCoordinator3: {
        name: "Ms.S.Sharvanthika",
        department: "Department of CT-UG",
        phone: "+91-8778955508", 
        availability: "Mon-Fri, 10:00 AM - 4:00 PM"
      }
    },
    
    student: {
      secretary: {
        name: "Mr.V.Mahashwin",
        position: "Secretary",
        year: "Final Year",
        phone: "9942621479"
      },
      treasurer: {
        name: "Mr.S.Kavin",
        position: "Treasurer",
        year: "Final Year",
        phone: "8610177301"
      },
      jointSecretary1: {
        name: "Mr.Krishnakumar",
        position: "Joint Secretary",
        year: "Final Year",
        phone: "9025380910"
      },
      jointSecretary2: {
        name: "Mr.M.Sudharsan",
        position: "Joint Secretary",
        year: "Final Year",
        phone: "8667352688"
      },
      jointSecretary3: {
        name: "Mr.Sanjay",
        position: "Joint Secretary",
        year: "Final Year",
        phone: "9751608263"
      },
      webDeveloper: {
        name: "Mr.S.Sakthivel",
        position: "Web Developer",
        year: "Third Year",
        phone: "8925490989"
      }
    },
    
    general: {
      email: "kecculturalclub@kongu.edu",
      phone: "+91-8925490989",
      website: "https://cmc.kongu.edu",
      address: "Cultural & Music Club, Kongu Engineering College, Perundurai, Erode - 638060, Tamil Nadu"
    },
    
    socialMedia: {
      instagram: {
        handle: "@kec_cultural_and_music_clubs",
        url: "instagram.com/kec_cultural_and_music_clubs",
        followers: "2.5K+"
      },
      youtube: {
        handle: "@kecculturalclub",
        url: "youtube.com/@kecculturalclub",
        subscribers: "1.2K+"
      },
      email: {
        handle: "kecculturalclub@kongu.edu",
        url: "kecculturalclub@kongu.edu"
      }
    }
  },
  
  // Club Description & About
  about: {
  club: "The Cultural & Music Club of Kongu Engineering College, established in 1998, celebrates art, culture, and music. With 200+ active members, it’s one of KEC’s most dynamic student communities.",
  
  vision: "To inspire creativity and promote cultural diversity across the campus.",
  
  mission: "To provide a platform for students to showcase and develop their artistic and musical talents.",
  
  activities: [
    "🎭 Cultural Events",
    "💃 Dance Performances",
    "🎤 Open Mic & Talent Shows",
    "🎊 Festival Celebrations",
    "🏆 Inter-College Fests"
  ],
  
  achievements: [
    "🏆 Best Cultural Club Award - 2025",
    "🥇 Winners - Inter-College Fest 2023",
    "🎖️ State-Level Performance Award"
  ]
},

  
  // Help & Support
  help: {
    categories: [
      {
        title: "Event Registration Help",
        items: [
          "How to register for events online",
          "Payment process and fees",
          "Registration deadlines and requirements",
          "Cancellation and refund policies"
        ]
      },
      {
        title: "Membership Queries",
        items: [
          "How to join the club",
          "Membership benefits and privileges", 
          "Annual membership fees",
          "Member ID card process"
        ]
      },
      {
        title: "Technical Support",
        items: [
          "Website login issues",
          "Mobile app problems",
          "Payment gateway errors",
          "Profile update help"
        ]
      },
      {
        title: "General Information",
        items: [
          "Club rules and regulations",
          "Event schedules and venues",
          "Contact information",
          "Social media updates"
        ]
      }
    ],
    
    contactSupport: {
      email: "kecculturalclub@kongu.edu",
      phone: "+91-8925490989",
      whatsapp: "+91-6383219802",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM"
    }
  },
  
  // Feedback System
  feedback: {
    types: [
      "Event Experience",
      "Website/App Issues", 
      "Suggestions for Improvement",
      "Complaints & Grievances",
      "General Feedback",
      "Technical Problems"
    ],
    
    process: "We value your feedback! You can submit feedback through our website form, email, or speak directly to our committee members. All feedback is reviewed and appropriate action is taken within 48 hours.",
    
    channels: [
      {
        method: "Online Form",
        url: "https://cmc.kongu.edu/#/feedback",
        description: "Fill out our detailed feedback form"
      },
      {
        method: "Email",
        email: "kecculturalclub@kongu.edu",
        description: "Send detailed feedback via email"
      },
      {
        method: "Direct Contact",
        phone: "+91-8925490989",
        description: "Speak directly to our feedback coordinator"
      },
      {
        method: "Suggestion Box",
        location: "Department of Mechanical Engineering, Arts Building",
        description: "Drop anonymous suggestions in our physical box"
      }
    ],
    
    responseTime: "All feedback receives a response within 48 hours",
    anonymousOption: "Yes, anonymous feedback is welcomed and encouraged"
  },
  
  // Membership Info
  membership: {
    process: "Open to all students of Kongu Engineering College. Visit our office or contact any committee member to join!",
    benefits: [
      "🎭 Participation in all club events and competitions",
      "🎵 Access to music instruments and practice rooms",
      "📚 Exclusive workshops and training sessions",
      "🎤 Performance opportunities on campus",
      "🤝 Networking with like-minded creative students",
      "🏆 Priority registration for popular events",
      "📸 Feature in club publications and social media",
      "💰 Discounted entry fees for external events",
      "🎁 Exclusive merchandise and goodies"
    ],
    requirements: [
      "Must be a current student at Kongu Engineering College",
      "Enthusiasm for cultural and musical activities",
      "Commitment to participate in club activities",
      "One-time membership fee of ₹500"
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
    establishedYear: "1998",
    totalMembers: "250+",
    eventsPerYear: "10+",
    achievementsCount: "10+"
  }
};

// Bot Responses Configuration
const botResponses = {
  welcome: "Welcome to {clubName}, {collegeName}! 🎉 I'm your virtual assistant. How can I help you today?",
  fallback: "I'm here to help with club information! Please choose from the options below or ask about our events, contacts, or other services.",
  error: "🤔 I'm not sure about that, but I can help you with club information! Please choose from the options below:",
  
  // Main Menu Options
  mainMenu: [
    "Club Events",
    "Contact Details",
    "About Club", 
    "Website Info",
    "Social Media",
    "Help",
    "Feedback"
  ],
  
  // Sub Menu Options
  clubEventsMenu: [
    "Upcoming Events",
    "Past Events", 
    "Event Coordinator Number",
    "Back to Main Menu"
  ],
  
  contactDetailsMenu: [
    "Faculty Coordinator",
    "Student Coordinator",
    "General Contact Info",
    "Back to Main Menu"
  ],
  
  aboutClubMenu: [
    "About College",
    "About Club", 
    "Club Official Website",
    "Back to Main Menu"
  ],
  
  websiteInfoMenu: [
    "Club Official Website",
    "Website Languages",
    "Social Media",
    "Back to Main Menu"
  ],
  
  helpMenu: [
    "Event Registration Help",
    "Membership Queries",
    "Technical Support", 
    "General Information",
    "Contact Support",
    "Back to Main Menu"
  ],
  
  feedbackMenu: [
    "Submit Feedback",
    "Feedback Process",
    "Feedback Channels",
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