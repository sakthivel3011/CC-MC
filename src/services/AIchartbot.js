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
    languages: ["Built with React", "Database powered by Google Apps Script", "Integrated AI Bot developed using React"],
    features: [
      "Event Registration Portal",
      "Gallery & Photo Albums", 
      "News & Updates",
      "Member Directory",
      "Built with React, Google Apps Script, and AI Bot (React).",
      "Developed by Sakthivel – AIDS"
      
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
      coordinator: {
        name: "Arjun Krishnan",
        designation: "Student Coordinator & President",
        department: "Computer Science Engineering",
        year: "Final Year",
        phone: "+91-98765-43211",
        email: "arjun.president@kongu.edu",
        rollNumber: "20CS001"
      },
      viceCoordinator: {
        name: "Priya Menon",
        designation: "Vice President & Event Manager",
        department: "Electronics & Communication",
        year: "Third Year", 
        phone: "+91-98765-43212",
        email: "priya.vice@kongu.edu",
        rollNumber: "21EC025"
      },
      secretary: {
        name: "Karthik Raj",
        designation: "Secretary",
        department: "Mechanical Engineering",
        year: "Third Year",
        phone: "+91-98765-43213",
        email: "karthik.secretary@kongu.edu",
        rollNumber: "21ME048"
      },
      treasurer: {
        name: "Ananya Iyer",
        designation: "Treasurer",
        department: "Information Technology",
        year: "Second Year",
        phone: "+91-98765-43214", 
        email: "ananya.treasurer@kongu.edu",
        rollNumber: "22IT067"
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
        handle: "@kongu_cmc_official",
        url: "https://instagram.com/kongu_cmc_official",
        followers: "2.5K+"
      },
      facebook: {
        handle: "Kongu Cultural Music Club",
        url: "https://facebook.com/KonguCMC",
        followers: "3.2K+"
      },
      twitter: {
        handle: "@Kongu_CMC",
        url: "https://twitter.com/Kongu_CMC",
        followers: "1.8K+"
      },
      youtube: {
        handle: "Kongu CMC Official",
        url: "https://youtube.com/@KonguCMC",
        subscribers: "1.2K+"
      },
      linkedin: {
        handle: "Kongu Cultural & Music Club",
        url: "https://linkedin.com/company/kongu-cmc",
        followers: "800+"
      }
    }
  },
  
  // Club Description & About
  about: {
    club: "The Cultural & Music Club of Kongu Engineering College is a vibrant community that celebrates arts, culture, and music. Established in 2018, we have grown to become one of the most active clubs on campus with 200+ passionate members. Our mission is to promote artistic and musical talents among students while preserving cultural heritage and encouraging creative expression.",
    
    vision: "To be the premier cultural organization that nurtures artistic excellence, promotes cultural diversity, and creates memorable experiences for the college community.",
    
    mission: "To provide platforms for students to explore, develop, and showcase their cultural and musical talents through diverse events, workshops, and competitions.",
    
    activities: [
      "🎭 Cultural Events & Competitions",
      "🎵 Music Concerts & Shows", 
      "💃 Dance Performances & Workshops",
      "🎪 Drama & Theatre Productions",
      "🎨 Art Exhibitions & Creative Workshops",
      "🎤 Talent Shows & Open Mic Events",
      "🎊 Festival Celebrations",
      "🏆 Inter-College Competitions"
    ],
    
    achievements: [
      "🏆 Best Cultural Club Award 2023 - Anna University",
      "🥇 Winner - Inter-College Cultural Fest 2023",
      "⭐ Excellence Award for Student Engagement 2022",
      "🎖️ Outstanding Performance Award - State Level 2022",
      "📺 Featured in Regional TV Programs",
      "📰 Regular coverage in College Magazine"
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
      email: "help.cmc@kongu.edu",
      phone: "+91-94456-78999",
      whatsapp: "+91-94456-78999",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM"
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
        url: "https://cmc.kongu.edu/feedback",
        description: "Fill out our detailed feedback form"
      },
      {
        method: "Email",
        email: "feedback.cmc@kongu.edu",
        description: "Send detailed feedback via email"
      },
      {
        method: "Direct Contact",
        phone: "+91-94456-78998",
        description: "Speak directly to our feedback coordinator"
      },
      {
        method: "Suggestion Box",
        location: "Club Office, Arts Building",
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
    establishedYear: "2018",
    totalMembers: "150+",
    eventsPerYear: "25+",
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