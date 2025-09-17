import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaMusic, FaWhatsapp, FaGoogleDrive, FaUserFriends, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
import '../assets/styles/RaagaRegistration.css';

// Web App URL from Google Apps Script
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyd8yRXlfBieazEKLdE9l7c6NeGUFdU_4vEo_QPHhl17WnEU8saJ-6MzxjnwKulRNkd/exec';

// Main Component
const RaagaRegistration = () => {
  return (
    <div className="raaga-container">
      <RegistrationForm />
    </div>
  );
};

// Popup Component
const Popup = ({ message, type = 'success' }) => {
  return (
    <div className={`popup ${type}`}>
      {message}
    </div>
  );
};

// Confetti Component for celebration
const Confetti = () => {
  return (
    <div className="confetti">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i} 
          className="confetti-piece" 
          style={{
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        ></div>
      ))}
    </div>
  );
};

// Registration Form Component
const RegistrationForm = () => {
  const [eventType, setEventType] = useState('solo');
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    year: '',
    department: '',
    email: '',
    phone: '',
    driveLink: ''
  });
  const [groupMembers, setGroupMembers] = useState([{ name: '', rollNo: '', year: '', department: '' }]);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [showRules, setShowRules] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [nextId, setNextId] = useState(1);

  const departments = [
    'AIDS', 'AIML', 'CSE', 'AUTO', 'CHEM', 'FT', 'CIVIL', 'CSD', 'IT',
    'EEE', 'EIE', 'ECE', 'MECH', 'MTS', 'MSC', 'MCA', 'MBA', 'BSC', 'ME', 'ARCH'
  ];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

  const rules = [
    "Each performance should not exceed 5 minutes",
    "Participants must bring their own instruments (if any)",
    "Background music should be in audio format only",
    "Obscene or offensive content will lead to disqualification",
    "Decision of judges will be final and binding",
    "Participants must report 30 minutes before the event"
  ];

  // Show popup message
  const showPopupMessage = (message, type = 'success') => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  // Fetch the next available ID from Google Sheets
  useEffect(() => {
    const fetchNextId = async () => {
      try {
        // Add timestamp to avoid caching
        const response = await fetch(`${WEB_APP_URL}?action=getNextId&eventType=${eventType}&t=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setNextId(data.nextId || 1);
      } catch (error) {
        console.error('Error fetching next ID:', error);
        setNextId(1);
        showPopupMessage(
          'Could not connect to server. Please check your internet connection or contact the event organizer. Data will not be saved until connection is restored.',
          'error'
        );
      }
    };
    fetchNextId();
  }, [eventType]);

  // Async check for duplicate roll number as user types
  const checkDuplicateRollNo = async (rollNo, eventType) => {
    if (!rollNo || rollNo.length < 8) return;
    try {
      const checkUrl = `${WEB_APP_URL}?action=checkDuplicate&eventType=${eventType}&rollNo=${encodeURIComponent(rollNo)}&t=${Date.now()}`;
      const res = await fetch(checkUrl);
      const data = await res.json();
      if (data.isDuplicate) {
        setErrors(prev => ({ ...prev, rollNo: `Roll No ${rollNo} is already registered for this event.` }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.rollNo;
          return newErrors;
        });
      }
    } catch {
      // Ignore network errors for instant check
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let upperValue = value;
    if (name === 'rollNo') {
      upperValue = value.toUpperCase();
    }
    if (name === 'phone') {
      upperValue = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData({
      ...formData,
      [name]: upperValue
    });

    // Instant phone validation
    if (name === 'phone') {
      if (upperValue.length !== 10) {
        setErrors(prevErrors => ({ ...prevErrors, phone: 'Phone number must be exactly 10 digits.' }));
      } else {
        setErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors.phone;
          return newErrors;
        });
      }
    }

    // Instant rollNo duplicate check
    if (name === 'rollNo') {
      checkDuplicateRollNo(upperValue, eventType);
    }

    // Clear error when user starts typing (except phone/rollNo, handled above)
    if (name !== 'phone' && name !== 'rollNo' && errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Email validation
    if (name === 'email') {
      if (value && !value.endsWith('@kongu.edu')) {
        setErrors(prevErrors => ({ ...prevErrors, email: 'Email must be a kongu.edu address.' }));
      }
    }
  };

  // For group members: instant phone validation
  const handleGroupMemberChange = (index, e) => {
    const { name, value } = e.target;
    let upperValue = value;
    if (name === 'rollNo') {
        upperValue = value.toUpperCase();
    }
    if (name === 'phone') {
      upperValue = value.replace(/\D/g, '').slice(0, 10);
    }
    const updatedMembers = [...groupMembers];
    updatedMembers[index][name] = upperValue;
    setGroupMembers(updatedMembers);

    // Instant phone validation for group
    if (name === 'phone') {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        if (!newErrors.groupMembers) newErrors.groupMembers = [];
        if (!newErrors.groupMembers[index]) newErrors.groupMembers[index] = {};
        if (upperValue.length !== 10) {
          newErrors.groupMembers[index].phone = 'Phone number must be exactly 10 digits.';
        } else if (newErrors.groupMembers[index].phone) {
          delete newErrors.groupMembers[index].phone;
        }
        // Clean up empty error objects
        if (Object.keys(newErrors.groupMembers[index]).length === 0) {
          delete newErrors.groupMembers[index];
        }
        if (Object.keys(newErrors.groupMembers).length === 0) {
          delete newErrors.groupMembers;
        }
        return newErrors;
      });
    } else if (errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index][name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        if(newErrors.groupMembers[index]) {
            delete newErrors.groupMembers[index][name];
            if(Object.keys(newErrors.groupMembers[index]).length === 0) {
                delete newErrors.groupMembers[index];
            }
        }
        if(Object.keys(newErrors.groupMembers).length === 0) {
            delete newErrors.groupMembers;
        }
        return newErrors;
      });
    }
  };

  const addGroupMember = () => {
    if (groupMembers.length < 5) {
      setGroupMembers([...groupMembers, { name: '', rollNo: '', year: '', department: '' }]);
    } else {
      showPopupMessage('Maximum 5 members allowed in a group', 'error');
    }
  };

  const removeGroupMember = (index) => {
    if (groupMembers.length > 1) {
      const updatedMembers = [...groupMembers];
      updatedMembers.splice(index, 1);
      setGroupMembers(updatedMembers);
    }
  };

  const validate = () => {
    const newErrors = {};
    const rollNoRegex = /^\d{2}[A-Z]{3}\d{3}$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.rollNo.trim()) {
        newErrors.rollNo = 'Roll No is required.';
    } else if (!rollNoRegex.test(formData.rollNo)) {
        newErrors.rollNo = 'Invalid Roll No format. Example: 23ADR145';
    }

    if (!formData.year) newErrors.year = 'Year is required.';
    if (!formData.department) newErrors.department = 'Department is required.';
    if (!formData.email) {
        newErrors.email = 'Email is required.';
    } else if (!formData.email.endsWith('@kongu.edu')) {
        newErrors.email = 'Email must be a kongu.edu address.';
    }
    if (!formData.phone.trim()) {
        newErrors.phone = 'Phone No is required.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Phone number must be exactly 10 digits.';
    }
    if (!formData.driveLink.trim()) newErrors.driveLink = 'Google Drive Audio Link is required.';

    if (eventType === 'group') {
        const groupErrors = [];
        let hasGroupErrors = false;
        groupMembers.forEach((member, index) => {
            const memberErrors = {};
            if (!member.name.trim()) memberErrors.name = 'Name is required.';
            if (!member.rollNo.trim()) {
                memberErrors.rollNo = 'Roll No is required.';
            } else if (!rollNoRegex.test(member.rollNo)) {
                memberErrors.rollNo = 'Invalid Roll No format. Example: 23ADR145';
            }
            if (!member.year) memberErrors.year = 'Year is required.';
            if (!member.department) memberErrors.department = 'Department is required.';
            if (!member.phone || !phoneRegex.test(member.phone || '')) {
                memberErrors.phone = 'Phone number must be exactly 10 digits.';
            }
            if (Object.keys(memberErrors).length > 0) {
                groupErrors[index] = memberErrors;
                hasGroupErrors = true;
            }
        });
        if (hasGroupErrors) {
            newErrors.groupMembers = groupErrors;
        }
    }

    return newErrors;
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    showPopupMessage('Please fix the errors in the form', 'error');
    return;
  }
  
  setIsSubmitting(true);

  // Check for duplicates (rollNo, department, phone) for the same event type
  const allRollNos = [
    formData.rollNo,
    ...(eventType === 'group' ? groupMembers.map(m => m.rollNo) : [])
  ].filter(Boolean);

  const allPhones = [
    formData.phone,
    ...(eventType === 'group' ? groupMembers.map(m => m.phone) : [])
  ].filter(Boolean);

  // Check for duplicate rollNo or phone within the form
  const uniqueRollNos = new Set(allRollNos);
  const uniquePhones = new Set(allPhones);

  if (uniqueRollNos.size !== allRollNos.length) {
    showPopupMessage('The same roll number is entered more than once.', 'error');
    setIsSubmitting(false);
    return;
  }
  if (uniquePhones.size !== allPhones.length) {
    showPopupMessage('The same phone number is entered more than once.', 'error');
    setIsSubmitting(false);
    return;
  }

  try {
    // Check for duplicate roll numbers one by one against the backend
    for (const rollNo of allRollNos) {
      const checkUrl = `${WEB_APP_URL}?action=checkDuplicate&eventType=${eventType}&rollNo=${encodeURIComponent(rollNo)}&t=${Date.now()}`;
      const checkResponse = await fetch(checkUrl);
      const checkData = await checkResponse.json();

      if (checkData.isDuplicate) {
        showPopupMessage(
          `Roll No ${rollNo} is already registered for this event. You cannot register again.`,
          'error'
        );
        setIsSubmitting(false);
        return;
      }
    }
  } catch (error) {
    console.error('Error checking for duplicates:', error);
    showPopupMessage('Could not verify registration. Please check your connection and try again.', 'error');
    setIsSubmitting(false);
    return;
  }

  // Generate sequential ID
  const idNumber = nextId.toString().padStart(2, '0');
  const newRegistrationId = eventType === 'solo'
    ? `SOLO-RAS-${idNumber}`
    : `GROUP-RAG-${idNumber}`;
  
  const submissionData = {
    action: 'submit',
    eventType,
    formData,
    groupMembers: eventType === 'group' ? groupMembers : [],
    registrationId: newRegistrationId,
    timestamp: new Date().toISOString()
  };

  try {
    console.log('Submitting data:', submissionData);

    // Try to POST to Google Apps Script
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(submissionData)
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}. Please ensure the registration server is accessible and deployed with "Anyone" access.`);
    }

    const responseData = await response.json();
    console.log('Server response:', responseData);

    if (responseData.result === "success") {
      setRegistrationId(responseData.registrationId);
      showPopupMessage(`Registration successful! Your ID is ${responseData.registrationId}`);
      setTimeout(() => {
        setSubmitted(true);
        setNextId(responseData.nextId);
      }, 2000);
    } else {
      throw new Error(responseData.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Error submitting data:', error);
    showPopupMessage(
      `Registration failed: ${error.message}. Please check your network or contact the event organizer.`,
      'error'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  if (submitted) {
    return (
      <div className="registration-success new-animation">
      <Confetti />
      <div className="success-content">
        <div className="animated-check">✅</div>
        <h2>Registration Successful!</h2>
        <p>Your Registration ID: <strong>{registrationId}</strong></p>
        
        <div className="whatsapp-section">
        <h3><FaWhatsapp /> Join the WhatsApp Group for Event Updates</h3>
        <a 
          href="https://chat.whatsapp.com/your-actual-link" 
          className="whatsapp-link-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp /> Join Group <FaExternalLinkAlt />
        </a>
        <p className="note">Please join the group to receive important event updates and announcements.</p>
        </div>
        
        <div className="see-you">
        <h3>Only selected teams (not all registrations) will receive email/WhatsApp updates. </h3>
        <p>Can participate in RAAGA-2K25.</p>
        </div>
        
        <button onClick={() => {
        setSubmitted(false);
        setFormData({
          name: '',
          rollNo: '',
          year: '',
          department: '',
          email: '',
          phone: '',
          driveLink: ''
        });
        setGroupMembers([{ name: '', rollNo: '', year: '', department: '' }]);
        }} className="register-another-btn">
        Register Another Participant
        </button>
      </div>
      </div>
    );
  }

  return (
    <>
      {showPopup && <Popup message={popupMessage} type={popupType} />}
      
      <header
        className="raaga-header"
        style={{
          marginTop: '58px',
          backgroundImage: 'url("https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          position: 'relative',
        }}
      >
        <div className="header-overlay" style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        }}></div>
        <div className="header-content" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="raaga-title">RAAGA</h1>
          <p className="event-subtitle">KEC Music Event</p>
          <div className="decoration-mic"><FaMicrophone /></div>
          <div className="decoration-music"><FaMusic /></div>
        </div>
      </header>

      <div className="registration-container">
        <div className="event-image-section">
          <div className="image-placeholder">
            {/* Add your image below */}
            <img 
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80" 
              alt="Music Event" 
              style={{ width: '100%', borderRadius: '16px', marginBottom: '16px', maxHeight: '180px', objectFit: 'cover' }}
            />
            <div className="music-icon">🎤</div>
            <h3>Show Your Talent!</h3>
            <p>Solo or Group singing competition</p>
            
            <div className="event-info">
              <h4>Event Details</h4>
              <p><strong>Date:</strong> October 15, 2023</p>
              <p><strong>Time:</strong> 2:00 PM onwards</p>
              <p><strong>Venue:</strong> College Auditorium</p>
            </div>
            
            <div className="rules-section">
              <h4 
                onClick={() => setShowRules(!showRules)}
                style={{
                  borderBottom: 'none',
                  color: 'inherit',
                  cursor: 'pointer'
                }}
              >
                Event Rules <span className={`dropdown-arrow ${showRules ? 'open' : ''}`}>▼</span>
              </h4>
              {showRules && (
                <ul>
                  {rules.map((rule, index) => (
                    <li key={index}><FaCheck /> {rule}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="registration-form">
          {/* Show a warning if the endpoint is unreachable */}
          {popupType === 'error' && popupMessage.includes('connect to server') && (
            <div className="form-error" style={{ marginBottom: 16 }}>
              <strong>Warning:</strong> Registration server is unreachable. Data will not be saved until connection is restored.
            </div>
          )}
          <h2>Event Registration</h2>
          <div className="event-type-selector">
            <button 
              className={eventType === 'solo' ? 'active' : ''}
              onClick={() => setEventType('solo')}
            >
              <FaMicrophone /> Solo Singing
            </button>
            <button 
              className={eventType === 'group' ? 'active' : ''}
              onClick={() => setEventType('group')}
            >
              <FaUserFriends /> Group Singing (2-5 Members)
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-section">
              <h3>Participant Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label>Roll No *</label>
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    placeholder="e.g., 23ADR145"
                    className={errors.rollNo ? 'error' : ''}
                  />
                  {errors.rollNo && <p className="form-error">{errors.rollNo}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Year *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={formData.year ? 'selected' : (errors.year ? 'error' : '')}
                  >
                    <option value="">Select Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.year && <p className="form-error">{errors.year}</p>}
                </div>
                <div className="form-group">
                  <label>Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={formData.department ? 'selected' : (errors.department ? 'error' : '')}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && <p className="form-error">{errors.department}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    pattern=".*@kongu\.edu"
                    title="Email must be a kongu.edu address."
                    placeholder="example@kongu.edu"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label>Phone No *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your 10-digit phone number"
                    maxLength={10}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
              </div>

              <div className="form-group drive-link-group">
                <label><FaGoogleDrive /> Google Drive Audio Link *</label>
                <input
                  type="url"
                  name="driveLink"
                  placeholder="Paste your audio file drive link"
                  value={formData.driveLink}
                  onChange={handleInputChange}
                  className={errors.driveLink ? 'error' : ''}
                />
                <p className="input-note">Make sure the file is accessible to anyone with the link</p>
                {errors.driveLink && <p className="form-error">{errors.driveLink}</p>}
              </div>
            </div>

            {eventType === 'group' && (
              <div className="form-section">
                <h3>Group Members ({groupMembers.length}/5)</h3>
                {groupMembers.map((member, index) => (
                  <div key={index} className="group-member">
                    <h4>Member {index + 1}</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={member.name}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          placeholder="Enter member name"
                          className={errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].name ? 'error' : ''}
                        />
                        {errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].name && (
                          <p className="form-error">{errors.groupMembers[index].name}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Roll No *</label>
                        <input
                          type="text"
                          name="rollNo"
                          value={member.rollNo}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          placeholder="e.g., 23ADR145"
                          className={errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].rollNo ? 'error' : ''}
                        />
                        {errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].rollNo && (
                          <p className="form-error">{errors.groupMembers[index].rollNo}</p>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Year *</label>
                        <select
                          name="year"
                          value={member.year}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          className={member.year ? 'selected' : (errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].year ? 'error' : '')}
                        >
                          <option value="">Select Year</option>
                          {years.map((year, i) => (
                            <option key={i} value={year}>{year}</option>
                          ))}
                        </select>
                        {errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].year && (
                          <p className="form-error">{errors.groupMembers[index].year}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Department *</label>
                        <select
                          name="department"
                          value={member.department}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          className={member.department ? 'selected' : (errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].department ? 'error' : '')}
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept, i) => (
                            <option key={i} value={dept}>{dept}</option>
                          ))}
                        </select>
                        {errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].department && (
                          <p className="form-error">{errors.groupMembers[index].department}</p>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone No *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={member.phone || ''}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          placeholder="Enter member's 10-digit phone number"
                          maxLength={10}
                          className={errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].phone ? 'error' : ''}
                        />
                        {errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].phone && (
                          <p className="form-error">{errors.groupMembers[index].phone}</p>
                        )}
                      </div>
                    </div>
                    {groupMembers.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-member"
                        onClick={() => removeGroupMember(index)}
                      >
                        Remove Member
                      </button>
                    )}
                  </div>
                ))}
                {groupMembers.length < 5 && (
                  <button type="button" className="add-member" onClick={addGroupMember}>
                    + Add Member
                  </button>
                )}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  Submitting...
                  <span className="spinner"></span>
                </>
              ) : (
                'Register Now'
              )}
            </button>
          </form>
        </div>
      </div>  

      <footer className="raaga-footer">
        <p>© 2025 All Rights Reserved by KEC Cultural and Music Club</p>
        <p>Contact | Sakthivel : <a href="tel:+918925490989" style={{ textDecoration: 'none', color: 'inherit' }}>8925490989</a></p>
      </footer>
    </>
  );
};

export default RaagaRegistration;
