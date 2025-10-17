// Enthusia Event Data and API Functions
export const eventCategories = {
  SOLO: 'solo',
  DUAL: 'dual', 
  GROUP: 'group'
};

export const eventData = [
  // Solo Events
  {
    id: 1,
    name: "Comic Satire",
    category: eventCategories.SOLO,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZkNzAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OHB4IiBmaWxsPSIjMWExYTJlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q29taWMgU2F0aXJlPC90ZXh0Pjwvc3ZnPg==",
    description: "Express your wit and humor through satirical performance",
    rules: [
      "Time limit: 5-7 minutes per participant",
      "Content must be original and appropriate",
      "Props are allowed but not mandatory",
      "Performance should be in English, Hindi, or Regional languages",
      "Vulgarity and offensive content will lead to disqualification"
    ],
    prizes: ["₹5000", "₹3000", "₹2000"],
    registrationFee: 100,
    maxParticipants: 1,
    minParticipants: 1
  },
  {
    id: 2,
    name: "Solo Instrumental",
    category: eventCategories.SOLO,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY2YjZiIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U29sbyBJbnN0cnVtZW50YWw8L3RleHQ+PC9zdmc+",
    description: "Showcase your musical talent with any instrument",
    rules: [
      "Time limit: 5-8 minutes per performance",
      "Any musical instrument allowed",
      "Backing tracks permitted",
      "Original compositions encouraged",
      "Sound system will be provided for electronic instruments"
    ],
    prizes: ["₹8000", "₹5000", "₹3000"],
    registrationFee: 150,
    maxParticipants: 1,
    minParticipants: 1
  },
  {
    id: 3,
    name: "Solo Dance", 
    category: eventCategories.SOLO,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGVjZGM0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U29sbyBEYW5jZTwvdGV4dD48L3N2Zz4=",
    description: "Express yourself through the art of dance",
    rules: [
      "Time limit: 4-6 minutes per performance",
      "Any dance form allowed (Classical, Contemporary, Hip-hop, etc.)",
      "Costume changes not allowed during performance",
      "Music track should be submitted 2 hours before the event",
      "Props are allowed but safety is participant's responsibility"
    ],
    prizes: ["₹7000", "₹4000", "₹2500"],
    registrationFee: 120,
    maxParticipants: 1,
    minParticipants: 1
  },
  {
    id: 4,
    name: "Solo Singing",
    category: eventCategories.SOLO,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDViN2QxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U29sbyBTaW5naW5nPC90ZXh0Pjwvc3ZnPg==",
    description: "Mesmerize the audience with your vocal prowess",
    rules: [
      "Time limit: 4-6 minutes per performance",
      "Karaoke tracks allowed",
      "Any language permitted",
      "Live accompaniment allowed",
      "No lip-syncing allowed"
    ],
    prizes: ["₹8000", "₹5000", "₹3000"],
    registrationFee: 100,
    maxParticipants: 1,
    minParticipants: 1
  },
  {
    id: 5,
    name: "Mime",
    category: eventCategories.SOLO,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOWI1OWI2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI1NnB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TWltZTwvdGV4dD48L3N2Zz4=",
    description: "Tell a story without words through the art of mime",
    rules: [
      "Time limit: 4-6 minutes per performance",
      "No speaking allowed during performance",
      "Theme should be conveyed clearly",
      "Simple props allowed",
      "Face painting/makeup encouraged"
    ],
    prizes: ["₹6000", "₹4000", "₹2000"],
    registrationFee: 80,
    maxParticipants: 1,
    minParticipants: 1
  },

  // Dual Events
  {
    id: 6,
    name: "Dual Dance",
    category: eventCategories.DUAL,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTc0YzNjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHVhbCBEYW5jZTwvdGV4dD48L3N2Zz4=",
    description: "Synchronize your moves with your partner",
    rules: [
      "Time limit: 5-7 minutes per performance",
      "Both participants must be from the same institution",
      "Any dance form allowed",
      "Costume coordination encouraged",
      "Music track should be submitted 2 hours before event"
    ],
    prizes: ["₹10000", "₹6000", "₹4000"],
    registrationFee: 200,
    maxParticipants: 2,
    minParticipants: 2
  },
  {
    id: 7,
    name: "Imitation",
    category: eventCategories.DUAL,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjM5YzEyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1pdGF0aW9uPC90ZXh0Pjwvc3ZnPg==",
    description: "Imitate famous personalities, characters, or celebrities",
    rules: [
      "Time limit: 5-7 minutes per performance",
      "Can imitate any famous personality",
      "Props and costumes encouraged",
      "Both participants should actively participate",
      "Content should be entertaining and appropriate"
    ],
    prizes: ["₹8000", "₹5000", "₹3000"],
    registrationFee: 150,
    maxParticipants: 2,
    minParticipants: 2
  },

  // Group Events
  {
    id: 8,
    name: "Group Instrumental",
    category: eventCategories.GROUP,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmVjYzcxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzNnB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+R3JvdXAgSW5zdHJ1bWVudGFsPC90ZXh0Pjwvc3ZnPg==",
    description: "Create harmony with your musical ensemble",
    rules: [
      "Time limit: 8-10 minutes per performance",
      "Minimum 3, Maximum 8 participants",
      "Mix of instruments encouraged",
      "Original compositions get extra points",
      "Sound equipment will be provided"
    ],
    prizes: ["₹15000", "₹10000", "₹6000"],
    registrationFee: 500,
    maxParticipants: 8,
    minParticipants: 3
  },
  {
    id: 9,
    name: "Group Dance",
    category: eventCategories.GROUP,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzQ5OGRiIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+R3JvdXAgRGFuY2U8L3RleHQ+PC9zdmc+",
    description: "Showcase coordinated choreography with your team",
    rules: [
      "Time limit: 6-8 minutes per performance",
      "Minimum 4, Maximum 12 participants",
      "Any dance form or fusion allowed",
      "Costume coordination mandatory",
      "Formation changes encouraged"
    ],
    prizes: ["₹20000", "₹12000", "₹8000"],
    registrationFee: 600,
    maxParticipants: 12,
    minParticipants: 4
  },
  {
    id: 10,
    name: "Group Singing",
    category: eventCategories.GROUP,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTZhMDg1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+R3JvdXAgU2luZ2luZzwvdGV4dD48L3N2Zz4=",
    description: "Harmonize voices in perfect symphony",
    rules: [
      "Time limit: 6-8 minutes per performance",
      "Minimum 3, Maximum 10 participants", 
      "Acapella or with instruments both allowed",
      "Harmony and coordination will be judged",
      "Any language permitted"
    ],
    prizes: ["₹15000", "₹10000", "₹6000"],
    registrationFee: 500,
    maxParticipants: 10,
    minParticipants: 3
  },
  {
    id: 11,
    name: "Fashion Parade",
    category: eventCategories.GROUP,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGIzODY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzNnB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RmFzaGlvbiBQYXJhZGU8L3RleHQ+PC9zdmc+",
    description: "Walk the ramp and showcase style and creativity",
    rules: [
      "Time limit: 8-10 minutes per performance",
      "Minimum 5, Maximum 15 participants",
      "Theme-based presentation encouraged",
      "Creative costumes and styling required",
      "Music and choreography coordination important"
    ],
    prizes: ["₹18000", "₹12000", "₹8000"],
    registrationFee: 750,
    maxParticipants: 15,
    minParticipants: 5
  },
  {
    id: 12,
    name: "Movie Depiction",
    category: eventCategories.GROUP,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzNnB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TW92aWUgRGVwaWN0aW9uPC90ZXh0Pjwvc3ZnPg==",
    description: "Recreate iconic movie scenes with your team",
    rules: [
      "Time limit: 8-12 minutes per performance",
      "Minimum 3, Maximum 10 participants",
      "Can depict any movie scene or create mashup",
      "Dialogue delivery and acting will be judged",
      "Props and costumes encouraged"
    ],
    prizes: ["₹15000", "₹10000", "₹6000"],
    registrationFee: 600,
    maxParticipants: 10,
    minParticipants: 3
  },
  {
    id: 13,
    name: "Skit",
    category: eventCategories.GROUP,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDU5NjY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2tpdDwvdGV4dD48L3N2Zz4=",
    description: "Present a social message through dramatic performance",
    rules: [
      "Time limit: 10-15 minutes per performance",
      "Minimum 4, Maximum 12 participants",
      "Should convey a social message",
      "Original script preferred",
      "Props and background music allowed"
    ],
    prizes: ["₹20000", "₹15000", "₹10000"],
    registrationFee: 700,
    maxParticipants: 12,
    minParticipants: 4
  },
  {
    id: 14,
    name: "Stand-up Comedy / Short Film",
    category: eventCategories.GROUP,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDU5NjY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q29tZWR5IC8gU2hvcnQgRmlsbTwvdGV4dD48L3N2Zz4=",
    description: "Make everyone laugh or tell a story through film",
    rules: [
      "Time limit: 8-15 minutes per performance/screening",
      "For stand-up: Minimum 1, Maximum 3 participants",
      "For short film: Minimum 2, Maximum 8 participants",
      "Original content mandatory",
      "Technical equipment will be provided for screening"
    ],
    prizes: ["₹15000", "₹10000", "₹6000"],
    registrationFee: 400,
    maxParticipants: 8,
    minParticipants: 1
  },
  {
    id: 15,
    name: "Unique Talent",
    category: eventCategories.GROUP,
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDU5NjY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VW5pcXVlIFRhbGVudDwvdGV4dD48L3N2Zz4=",
    description: "Showcase any unique skill or talent not covered in other events",
    rules: [
      "Time limit: 5-10 minutes per performance",
      "Minimum 1, Maximum 8 participants",
      "Should be a unique talent not covered in other categories",
      "Creativity and originality will be highly valued",
      "Prior approval of act from organizers required"
    ],
    prizes: ["₹12000", "₹8000", "₹5000"],
    registrationFee: 300,
    maxParticipants: 8,
    minParticipants: 1
  }
];

// Google Sheets Configuration
export const GOOGLE_SHEETS_CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  SHEET_NAME: 'EnthuisiaRegistrations'
};

// Form submission function
export const submitRegistration = async (formData) => {
  try {
    const response = await fetch(GOOGLE_SHEETS_CONFIG.SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'submitRegistration',
        data: formData
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting registration:', error);
    throw error;
  }
};

// Get all registrations
export const getRegistrations = async () => {
  try {
    const response = await fetch(`${GOOGLE_SHEETS_CONFIG.SCRIPT_URL}?action=getRegistrations`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw error;
  }
};

// Utility functions
export const getEventById = (id) => {
  return eventData.find(event => event.id === id);
};

export const getEventsByCategory = (category) => {
  return eventData.filter(event => event.category === category);
};

export const formatEventDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateRegistrationFee = (events) => {
  return events.reduce((total, event) => total + event.registrationFee, 0);
};

// Countdown timer utility
export const getCountdownTimer = (targetDate) => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

// Form validation utilities
export const validateForm = (formData) => {
  const errors = {};

  // Team Leader validation
  if (!formData.teamLeader.name.trim()) {
    errors.teamLeaderName = 'Team leader name is required';
  }

  if (!formData.teamLeader.rollNo.trim()) {
    errors.teamLeaderRollNo = 'Team leader roll number is required';
  }

  if (!formData.teamLeader.department.trim()) {
    errors.teamLeaderDepartment = 'Team leader department is required';
  }

  if (!formData.teamLeader.year.trim()) {
    errors.teamLeaderYear = 'Team leader year is required';
  }

  if (!formData.teamLeader.contact.trim()) {
    errors.teamLeaderContact = 'Team leader contact is required';
  } else if (!/^\d{10}$/.test(formData.teamLeader.contact)) {
    errors.teamLeaderContact = 'Contact number must be 10 digits';
  }

  if (!formData.teamLeader.email.trim()) {
    errors.teamLeaderEmail = 'Team leader email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.teamLeader.email)) {
    errors.teamLeaderEmail = 'Please enter a valid email address';
  }

  if (!formData.selectedEvent) {
    errors.selectedEvent = 'Please select an event';
  }

  // Team members validation for group events
  const selectedEvent = getEventById(formData.selectedEvent);
  if (selectedEvent && selectedEvent.maxParticipants > 1) {
    if (formData.teamMembers.length < selectedEvent.minParticipants - 1) {
      errors.teamMembers = `Minimum ${selectedEvent.minParticipants - 1} additional team members required`;
    }
    
    if (formData.teamMembers.length > selectedEvent.maxParticipants - 1) {
      errors.teamMembers = `Maximum ${selectedEvent.maxParticipants - 1} additional team members allowed`;
    }

    // Validate each team member
    formData.teamMembers.forEach((member, index) => {
      if (!member.name.trim()) {
        errors[`teamMember${index}Name`] = 'Team member name is required';
      }
      if (!member.rollNo.trim()) {
        errors[`teamMember${index}RollNo`] = 'Team member roll number is required';
      }
      if (!member.department.trim()) {
        errors[`teamMember${index}Department`] = 'Team member department is required';
      }
      if (!member.contact.trim()) {
        errors[`teamMember${index}Contact`] = 'Team member contact is required';
      } else if (!/^\d{10}$/.test(member.contact)) {
        errors[`teamMember${index}Contact`] = 'Contact number must be 10 digits';
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Event date - Update this to your actual event date
export const EVENT_DATE = '2025-02-15T09:00:00'; // February 15, 2025, 9:00 AM

// College departments
export const DEPARTMENTS = [
  'Computer Science Engineering',
  'Electronics and Communication Engineering', 
  'Electrical and Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Information Technology',
  'Automobile Engineering',
  'Aeronautical Engineering',
  'Biotechnology',
  'Other'
];

// Academic years
export const ACADEMIC_YEARS = ['I', 'II', 'III', 'IV'];

export default {
  eventData,
  eventCategories,
  getEventById,
  getEventsByCategory,
  submitRegistration,
  getRegistrations,
  validateForm,
  getCountdownTimer,
  EVENT_DATE,
  DEPARTMENTS,
  ACADEMIC_YEARS
};