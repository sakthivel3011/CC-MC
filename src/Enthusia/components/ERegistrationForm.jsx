import React, { useState } from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendarAlt, FaUsers, FaPlus, FaTrash, FaCheck, FaWhatsapp, FaCheckCircle, FaTimes } from 'react-icons/fa';
import '../styles/ERegistrationForm.css';

const ERegistrationForm = ({ event, onBack }) => {
  const [teamLeader, setTeamLeader] = useState({
    name: '',
    rollNo: '',
    department: '',
    year: '',
    contact: '',
    email: ''
  });

  const [subLeaders, setSubLeaders] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  // Event code mapping for registration IDs
  const getEventCode = (eventName) => {
    const codes = {
      'Comic Satire': 'COS',
      'Solo Instrumental': 'SOI',
      'Group Instrumental': 'GRI',
      'Solo Dance': 'SOD',
      'Dual Dance': 'DUD',
      'Group Dance': 'GRD',
      'Solo Singing': 'SOS',
      'Group Singing': 'GRS',
      'Mime': 'MIM',
      'Imitation': 'IMI',
      'Fashion Parade': 'FAP',
      'Movie Depiction': 'MOD',
      'Skit': 'SKI',
      'Short Film': 'SHF',
      'Stand Up Comedy': 'SUC',
      'Anchoring': 'ANC',
    };
    return codes[eventName] || 'EVT';
  };

  // Generate registration ID with proper sequential numbering
  const generateRegistrationId = async (eventName) => {
    const eventCode = getEventCode(eventName);
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJaGcUBfZlbf7Pc6Z0oiZf9qOBAhTLV1TJzUjBuh77HZNYWk3YobFneyz5Fv5NZ-AK/exec';
    
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getIds&event=${encodeURIComponent(eventName)}`);
      const data = await response.json();
      
      if (data.status === 'success' && data.ids) {
        const existingIds = data.ids;
        
        // Extract numbers from existing IDs for this event
        const existingNumbers = existingIds
          .filter(id => id.startsWith(eventCode))
          .map(id => parseInt(id.replace(eventCode, '')))
          .filter(num => !isNaN(num));
        
        // Find the next available number
        let nextNumber = 1;
        if (existingNumbers.length > 0) {
          nextNumber = Math.max(...existingNumbers) + 1;
        }
        
        // Format with leading zeros (01, 02, 03, etc.)
        const formattedNumber = nextNumber.toString().padStart(2, '0');
        return `${eventCode}${formattedNumber}`;
      }
    } catch (error) {
      console.error('Error fetching IDs:', error);
    }
    
    // Fallback: generate a timestamp-based ID if fetching fails
    const timestamp = Date.now().toString().slice(-4);
    return `${eventCode}${timestamp}`;
  };

  // Get team size limits from event data
  const getTeamLimits = () => {
    return {
      min: event.minParticipants || 1,
      max: event.maxParticipants || 1
    };
  };

  const teamLimits = getTeamLimits();
  const currentTeamSize = 1 + subLeaders.length + teamMembers.length;

  const addSubLeader = () => {
    if (currentTeamSize < teamLimits.max) {
      setSubLeaders([...subLeaders, {
        name: '',
        rollNo: '',
        department: '',
        year: '',
        contact: '',
        email: ''
      }]);
    }
  };

  const removeSubLeader = (index) => {
    setSubLeaders(subLeaders.filter((_, i) => i !== index));
  };

  const updateSubLeader = (index, field, value) => {
    const updated = [...subLeaders];
    updated[index][field] = value;
    setSubLeaders(updated);
  };

  const addTeamMember = () => {
    if (currentTeamSize < teamLimits.max) {
      setTeamMembers([...teamMembers, {
        name: '',
        rollNo: '',
        department: '',
        year: ''
      }]);
    }
  };

  const removeTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate registration ID
      const regId = await generateRegistrationId(event.name);
      setGeneratedId(regId);

      // Format participants list
      const participants = [
        {
          name: teamLeader.name,
          department: teamLeader.department,
          year: teamLeader.year,
          rollNo: teamLeader.rollNo,
          email: teamLeader.email,
          phone: teamLeader.contact,
          role: 'Team Leader'
        },
        ...subLeaders.map(leader => ({
          name: leader.name,
          department: leader.department || teamLeader.department,
          year: leader.year || teamLeader.year,
          rollNo: leader.rollNo,
          email: leader.email,
          phone: leader.contact,
          role: 'Sub Leader'
        })),
        ...teamMembers.map(member => ({
          name: member.name,
          department: member.department || teamLeader.department,
          year: member.year || teamLeader.year,
          rollNo: member.rollNo,
          email: member.email || '',
          phone: member.contact || '',
          role: 'Member'
        }))
      ];

      const registrationData = {
        registrationId: regId,
        name: teamLeader.name,
        email: teamLeader.email,
        phone: teamLeader.contact,
        department: teamLeader.department,
        year: teamLeader.year,
        rollNo: teamLeader.rollNo,
        college: 'Kongu Engineering College',
        eventId: event.id,
        eventName: event.name,
        eventCategory: event.category,
        participants: participants,
        totalMembers: participants.length,
        timestamp: new Date().toISOString()
      };

      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJaGcUBfZlbf7Pc6Z0oiZf9qOBAhTLV1TJzUjBuh77HZNYWk3YobFneyz5Fv5NZ-AK/exec';
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      // Show popup notification
      setShowPopup(true);
      
      // Auto-hide popup after 4 seconds and show thank you page
      setTimeout(() => {
        setShowPopup(false);
        setShowThankYou(true);
      }, 4000);
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration submitted! Your ID is: ' + generatedId);
      setShowThankYou(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email) => {
    return email.toLowerCase().endsWith('@kongu.edu');
  };

  const validateRollNo = (rollNo) => {
    const rollNoPattern = /^[0-9]{2}[A-Z]{2,3}[0-9]{3}$/;
    return rollNoPattern.test(rollNo);
  };

  const validateContact = (contact) => {
    const contactPattern = /^[0-9]{10}$/;
    return contactPattern.test(contact);
  };

  // Department code mapping
  const departmentCodes = {
    'AD': 'AIDS',
    'AM': 'AIML',
    'CS': 'CSE',
    'AU': 'AUTO',
    'CH': 'CHEM',
    'FT': 'FOOD',
    'CV': 'CIVIL',
    'CD': 'CSD',
    'IT': 'IT',
    'EE': 'EEE',
    'EI': 'EIE',
    'EC': 'ECE',
    'ME': 'MECH',
    'MT': 'MTS',
    'MS': 'MSC',
    'MC': 'MCA',
    'MB': 'MBA',
    'BS': 'BSC',
    'AR': 'ARCH'
  };

  // Year mapping based on admission year
  const getYearFromRollNo = (rollNo) => {
    if (!rollNo || rollNo.length < 2) return '';
    const admissionYear = parseInt(rollNo.substring(0, 2));
    const currentYear = new Date().getFullYear() % 100;
    const yearDiff = currentYear - admissionYear;
    
    const yearMap = {
      0: '1st Year',
      1: '2nd Year',
      2: '3rd Year',
      3: '4th Year',
      4: '5th Year'
    };

    return yearMap[yearDiff] || '1st Year';
  };

  // Auto-fill department and year based on roll number
  const autoFillFromRollNo = (rollNo) => {
    if (validateRollNo(rollNo)) {
      const deptCode = rollNo.substring(2, 4);
      const department = departmentCodes[deptCode] || '';
      const year = getYearFromRollNo(rollNo);
      
      return {
        department,
        year
      };
    }
    return null;
  };

  const isFormValid = () => {
    const { name, rollNo, department, year, contact, email } = teamLeader;
    const basicInfoValid = name && rollNo && validateRollNo(rollNo) && department && year && contact && validateContact(contact);
    const emailValid = email && validateEmail(email);
    const teamSizeValid = currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max;
    
    const subLeadersValid = subLeaders.every(leader => (
      leader.name && 
      leader.rollNo && validateRollNo(leader.rollNo) && 
      leader.contact && validateContact(leader.contact) &&
      leader.email && validateEmail(leader.email)
    ));

    const teamMembersValid = teamMembers.every(member => (
      member.name && 
      member.rollNo && validateRollNo(member.rollNo)
    ));
    
    return basicInfoValid && emailValid && teamSizeValid && subLeadersValid && teamMembersValid;
  };

  const totalMembers = currentTeamSize;

  // Success Popup Component
  const SuccessPopup = () => (
    <div className="erf-success-popup">
      <div className="erf-popup-content">
        <button className="erf-popup-close" onClick={() => setShowPopup(false)}>
          <FaTimes />
        </button>
        <div className="erf-popup-icon">
          <FaCheckCircle />
        </div>
        <h3>Registration Successful!</h3>
        <p className="erf-popup-id">
          Your ID: <strong>{generatedId}</strong>
        </p>
        <a 
          href="https://chat.whatsapp.com/your-group-link" 
          target="_blank" 
          rel="noopener noreferrer"
          className="erf-popup-whatsapp"
        >
          <FaWhatsapp /> Join WhatsApp Group
        </a>
      </div>
    </div>
  );

  // Thank You Page
  if (showThankYou) {
    return (
      <div className="erf-thank-you-container">
        <div className="erf-thank-you-card">
          <div className="erf-success-animation">
            <div className="erf-success-checkmark">
              <FaCheckCircle />
            </div>
          </div>
          
          <h1 className="erf-success-title">Registration Successful!</h1>
          <p className="erf-success-subtitle">You're all set for the event</p>
          
          <div className="erf-registration-id-showcase">
            <span className="erf-id-label">Your Registration ID</span>
            <div className="erf-reg-id-box">{generatedId}</div>
            <p className="erf-id-note">Please save this ID for future reference</p>
          </div>
          
          <div className="erf-event-summary">
            <div className="erf-summary-item">
              <span className="erf-summary-icon">{event.icon}</span>
              <div className="erf-summary-details">
                <h3>{event.name}</h3>
                <p>{teamLeader.name}</p>
              </div>
            </div>
            <div className="erf-summary-stats">
              <div className="erf-stat-box">
                <FaUsers />
                <span>{totalMembers} Member{totalMembers > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          

          <div className="erf-action-buttons-modern">
            <a 
              href="https://chat.whatsapp.com/your-group-link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="erf-btn-whatsapp"
            >
              <FaWhatsapp />
              Join WhatsApp Group
            </a>
            <button onClick={onBack} className="erf-btn-back-home">
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="erf-registration-page-modern">
      {showPopup && <SuccessPopup />}
      
      <div className="erf-page-header-modern">
        <button onClick={onBack} className="erf-btn-back-modern">
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <div className="erf-event-header-info">
          <span className="erf-event-icon-large">{event.icon}</span>
          <div className="erf-event-text">
            <h1>{event.name}</h1>
            <p>{event.description}</p>
          </div>
        </div>
      </div>

      <div className="erf-registration-container-modern">
        <div className="erf-registration-layout">
          {/* Sidebar */}
          <aside className="erf-sidebar-modern">
            <div className="erf-info-card-modern">
              <h3>Event Guidelines</h3>
              
              <div className="erf-team-size-modern">
                <h4>Team Size</h4>
                <div className="erf-size-badges">
                  <div className="erf-badge-required">
                    <span className="erf-badge-label">Required</span>
                    <span className="erf-badge-value">
                      {teamLimits.min === teamLimits.max 
                        ? `${teamLimits.min}`
                        : `${teamLimits.min}-${teamLimits.max}`
                      }
                    </span>
                  </div>
                  <div className={`erf-badge-current ${currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max ? 'erf-valid' : 'erf-invalid'}`}>
                    <span className="erf-badge-label">Current</span>
                    <span className="erf-badge-value">{currentTeamSize}</span>
                  </div>
                </div>
                
                {currentTeamSize < teamLimits.min && (
                  <div className="erf-status-alert erf-warning">
                    Add {teamLimits.min - currentTeamSize} more member{teamLimits.min - currentTeamSize > 1 ? 's' : ''}
                  </div>
                )}
                {currentTeamSize > teamLimits.max && (
                  <div className="erf-status-alert erf-error">
                    Remove {currentTeamSize - teamLimits.max} member{currentTeamSize - teamLimits.max > 1 ? 's' : ''}
                  </div>
                )}
                {currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max && (
                  <div className="erf-status-alert erf-success">
                    Perfect team size!
                  </div>
                )}
              </div>

              <div className="erf-rules-list-modern">
                <h4>Rules</h4>
                <ul>
                  {event.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>
              
              <div className="erf-coordinator-modern">
                <h4>Event Coordinator</h4>
                <div className="erf-coordinator-details">
                  <p className="erf-coordinator-name">{event.coordinator}</p>
                  <p className="erf-coordinator-phone"><FaPhone /> {event.phone}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Form */}
          <main className="erf-form-main-modern">
            <div className="erf-form-card-modern">
              <div className="erf-form-header-text">
                <h2>Registration Form</h2>
                <p>Fill in your details to register for the event</p>
              </div>

              <form onSubmit={handleSubmit} className="erf-registration-form-modern">
                {/* Team Leader */}
                <section className="erf-form-section-modern">
                  <div className="erf-section-title">
                    <FaUser className="erf-section-icon" />
                    <h3>Team Leader</h3>
                  </div>
                  
                  <div className="erf-input-grid">
                    <div className="erf-input-wrapper">
                      <label>Full Name (with Department) *</label>
                      <input
                        type="text"
                        required
                        value={teamLeader.name}
                        onChange={(e) => setTeamLeader({...teamLeader, name: e.target.value})}
                        placeholder="Enter your full name (e.g., John Doe - CSE)"
                        className="erf-input-modern"
                      />
                    </div>
                    
                    <div className="erf-input-wrapper">
                      <label>Roll Number *</label>
                      <input
                        type="text"
                        required
                        value={teamLeader.rollNo}
                        onChange={(e) => {
                          const rollNo = e.target.value.toUpperCase();
                          const autoFilled = autoFillFromRollNo(rollNo);
                          if (autoFilled) {
                            setTeamLeader({
                              ...teamLeader,
                              rollNo,
                              department: autoFilled.department,
                              year: autoFilled.year
                            });
                          } else {
                            setTeamLeader({...teamLeader, rollNo});
                          }
                        }}
                        placeholder="Enter roll number (e.g., 23ADR145)"
                        className={`erf-input-modern ${teamLeader.rollNo ? (!validateRollNo(teamLeader.rollNo) ? 'erf-input-error' : 'erf-input-success') : ''}`}
                      />
                      {teamLeader.rollNo && !validateRollNo(teamLeader.rollNo) && (
                        <div className="erf-input-error-message">
                          Invalid format. Example: 23ADR145 
                        </div>
                      )}
                      {teamLeader.rollNo && validateRollNo(teamLeader.rollNo) && (
                        <div className="erf-input-success-message">
                          <FaCheck /> Valid roll number format
                        </div>
                      )}
                    </div>
                    
                    <div className="erf-input-wrapper">
                      <label>Department *</label>
                      <select
                        required
                        value={teamLeader.department}
                        onChange={(e) => setTeamLeader({...teamLeader, department: e.target.value})}
                        className="erf-select-modern"
                      >
                        <option value="">Select Department</option>
                        <option value="AIDS">Artificial Intelligence and Data Science</option>
                        <option value="AIML">Artificial Intelligence and Machine Learning</option>
                        <option value="CSE">Computer Science and Engineering</option>
                        <option value="AUTO">Automobile Engineering</option>
                        <option value="CHEM">Chemical Engineering</option>
                        <option value="FOOD">Food Technology</option>
                        <option value="CIVIL">Civil Engineering</option>
                        <option value="CSD">Computer Science and Design</option>
                        <option value="IT">Information Technology</option>
                        <option value="EEE">Electrical and Electronics Engineering</option>
                        <option value="EIE">Electronics and Instrumentation Engineering</option>
                        <option value="ECE">Electronics and Communication Engineering</option>
                        <option value="MECH">Mechanical Engineering</option>
                        <option value="MTS">Mechatronics Engineering</option>
                        <option value="MSC">Master of Science</option>
                        <option value="MCA">Master of Computer Applications</option>
                        <option value="MBA">Master of Business Administration</option>
                        <option value="BSC">Bachelor of Science</option>
                        <option value="ME">Master of Engineering</option>
                        <option value="ARCH">Architecture</option>
                      </select>
                    </div>
                    
                    <div className="erf-input-wrapper">
                      <label>Year *</label>
                      <select
                        required
                        value={teamLeader.year}
                        onChange={(e) => setTeamLeader({...teamLeader, year: e.target.value})}
                        className="erf-select-modern"
                      >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="5th Year">5th Year</option>
                      </select>
                    </div>
                    
                    <div className="erf-input-wrapper">
                      <label>Contact Number *</label>
                      <input
                        type="tel"
                        required
                        value={teamLeader.contact}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length <= 10) {
                            setTeamLeader({...teamLeader, contact: value});
                          }
                        }}
                        placeholder="Enter 10 digit contact number"
                        className={`erf-input-modern ${teamLeader.contact ? (!validateContact(teamLeader.contact) ? 'erf-input-error' : 'erf-input-success') : ''}`}
                      />
                      {teamLeader.contact && !validateContact(teamLeader.contact) && (
                        <div className="erf-input-error-message">
                          Please enter exactly 10 digits
                        </div>
                      )}
                      {teamLeader.contact && validateContact(teamLeader.contact) && (
                        <div className="erf-input-success-message">
                          <FaCheck /> Valid contact number
                        </div>
                      )}
                    </div>
                    
                    <div className="erf-input-wrapper">
                      <label>Email Address *</label>
                      <div className="erf-input-group">
                        <input
                          type="email"
                          required
                          value={teamLeader.email}
                          onChange={(e) => setTeamLeader({...teamLeader, email: e.target.value})}
                          placeholder="Enter Kongu email address"
                          className={`erf-input-modern ${teamLeader.email ? (!validateEmail(teamLeader.email) ? 'erf-input-error' : 'erf-input-success') : ''}`}
                        />
                        {teamLeader.email && !validateEmail(teamLeader.email) && (
                          <div className="erf-input-error-message">
                            Must be a Kongu Engineering College email (@kongu.edu)
                          </div>
                        )}
                        {teamLeader.email && validateEmail(teamLeader.email) && (
                          <div className="erf-input-success-message">
                            <FaCheck /> Valid Kongu email
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Sub Leaders */}
                {teamLimits.max > 1 && (
                  <section className="erf-form-section-modern">
                    <div className="erf-section-title-with-action">
                      <div className="erf-section-title">
                        <FaUsers className="erf-section-icon" />
                        <h3>Sub Leader</h3>
                      </div>
                      {subLeaders.length < 1 && currentTeamSize < teamLimits.max && (
                        <button type="button" onClick={addSubLeader} className="erf-btn-add-modern">
                          <FaPlus /> Add Sub Leader
                        </button>
                      )}
                    </div>
                    
                    {subLeaders.map((subLeader, index) => (
                      <div key={index} className="erf-member-card-modern">
                        <div className="erf-member-card-header">
                          <h4>Sub Leader</h4>
                          <button 
                            type="button" 
                            onClick={() => removeSubLeader(index)}
                            className="erf-btn-remove-modern"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <div className="erf-input-grid">
                          <div className="erf-input-wrapper">
                            <label>Name (with Department) *</label>
                            <input
                              type="text"
                              required
                              value={subLeader.name}
                              onChange={(e) => updateSubLeader(index, 'name', e.target.value)}
                              placeholder="Enter name (e.g., John Doe - CSE)"
                              className="erf-input-modern"
                            />
                          </div>
                          <div className="erf-input-wrapper">
                            <label>Roll Number *</label>
                            <input
                              type="text"
                              required
                              value={subLeader.rollNo}
                              onChange={(e) => {
                                const rollNo = e.target.value.toUpperCase();
                                const autoFilled = autoFillFromRollNo(rollNo);
                                const updatedLeader = { ...subLeader, rollNo };
                                if (autoFilled) {
                                  updatedLeader.department = autoFilled.department;
                                  updatedLeader.year = autoFilled.year;
                                }
                                const newSubLeaders = [...subLeaders];
                                newSubLeaders[index] = updatedLeader;
                                setSubLeaders(newSubLeaders);
                              }}
                              placeholder="Enter roll number (e.g., 23ADR145)"
                              className={`erf-input-modern ${subLeader.rollNo && !validateRollNo(subLeader.rollNo) ? 'erf-input-error' : ''}`}
                            />
                          </div>
                          <div className="erf-input-wrapper">
                            <label>Department *</label>
                            <select
                              required
                              value={subLeader.department}
                              onChange={(e) => updateSubLeader(index, 'department', e.target.value)}
                              className="erf-select-modern"
                            >
                              <option value="">Select Department</option>
                              <option value="AIDS">Artificial Intelligence and Data Science</option>
                              <option value="AIML">Artificial Intelligence and Machine Learning</option>
                              <option value="CSE">Computer Science and Engineering</option>
                              <option value="AUTO">Automobile Engineering</option>
                              <option value="CHEM">Chemical Engineering</option>
                              <option value="FOOD">Food Technology</option>
                              <option value="CIVIL">Civil Engineering</option>
                              <option value="CSD">Computer Science and Design</option>
                              <option value="IT">Information Technology</option>
                              <option value="EEE">Electrical and Electronics Engineering</option>
                              <option value="EIE">Electronics and Instrumentation Engineering</option>
                              <option value="ECE">Electronics and Communication Engineering</option>
                              <option value="MECH">Mechanical Engineering</option>
                              <option value="MTS">Mechatronics Engineering</option>
                              <option value="MSC">Master of Science</option>
                              <option value="MCA">Master of Computer Applications</option>
                              <option value="MBA">Master of Business Administration</option>
                              <option value="BSC">Bachelor of Science</option>
                              <option value="ME">Master of Engineering</option>
                              <option value="ARCH">Architecture</option>
                            </select>
                          </div>

                          <div className="erf-input-wrapper">
                            <label>Year *</label>
                            <select
                              required
                              value={subLeader.year}
                              onChange={(e) => updateSubLeader(index, 'year', e.target.value)}
                              className="erf-select-modern"
                            >
                              <option value="">Select Year</option>
                              <option value="1st Year">1st Year</option>
                              <option value="2nd Year">2nd Year</option>
                              <option value="3rd Year">3rd Year</option>
                              <option value="4th Year">4th Year</option>
                              <option value="5th Year">5th Year</option>
                            </select>
                          </div>

                          <div className="erf-input-wrapper">
                            <label>Contact *</label>
                            <input
                              type="tel"
                              required
                              value={subLeader.contact}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                if (value.length <= 10) {
                                  updateSubLeader(index, 'contact', value);
                                }
                              }}
                              placeholder="Enter 10 digit contact number"
                              className={`erf-input-modern ${subLeader.contact ? (!validateContact(subLeader.contact) ? 'erf-input-error' : 'erf-input-success') : ''}`}
                            />
                            {subLeader.contact && !validateContact(subLeader.contact) && (
                              <div className="erf-input-error-message">
                                Please enter exactly 10 digits
                              </div>
                            )}
                            {subLeader.contact && validateContact(subLeader.contact) && (
                              <div className="erf-input-success-message">
                                <FaCheck /> Valid contact number
                              </div>
                            )}
                          </div>
                          <div className="erf-input-wrapper">
                            <label>Email Address *</label>
                            <div className="erf-input-group">
                              <input
                                type="email"
                                required
                                value={subLeader.email}
                                onChange={(e) => updateSubLeader(index, 'email', e.target.value)}
                                placeholder="Enter Kongu email address"
                                className={`erf-input-modern ${subLeader.email ? (!validateEmail(subLeader.email) ? 'erf-input-error' : 'erf-input-success') : ''}`}
                              />
                              {subLeader.email && !validateEmail(subLeader.email) && (
                                <div className="erf-input-error-message">
                                  Must be a Kongu Engineering College email (@kongu.edu)
                                </div>
                              )}
                              {subLeader.email && validateEmail(subLeader.email) && (
                                <div className="erf-input-success-message">
                                  <FaCheck /> Valid Kongu email
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>
                )}

                {/* Team Members */}
                {teamLimits.max > 1 && (
                  <section className="erf-form-section-modern">
                    <div className="erf-section-title-with-action">
                      <div className="erf-section-title">
                        <FaUsers className="erf-section-icon" />
                        <h3>Team Members {teamLimits.min > 1 ? '' : <span className="erf-optional-tag">(Optional)</span>}</h3>
                      </div>  
                      {currentTeamSize < teamLimits.max && (
                        <button type="button" onClick={addTeamMember} className="erf-btn-add-modern">
                          <FaPlus /> Add Member
                        </button>
                      )}
                    </div>
                    
                    {teamMembers.map((member, index) => (
                      <div key={index} className="erf-member-card-modern">
                        <div className="erf-member-card-header">
                          <h4>Team Member {index + 1}</h4>
                          <button 
                            type="button" 
                            onClick={() => removeTeamMember(index)}
                            className="erf-btn-remove-modern"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <div className="erf-input-grid">
                          <div className="erf-input-wrapper">
                            <label>Name (with Department) *</label>
                            <input
                              type="text"
                              required
                              value={member.name}
                              onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                              placeholder="Enter name (e.g., John Doe - CSE)"
                              className="erf-input-modern"
                            />
                          </div>
                          <div className="erf-input-wrapper">
                            <label>Roll Number *</label>
                            <input
                              type="text"
                              required
                              value={member.rollNo}
                              onChange={(e) => {
                                const rollNo = e.target.value.toUpperCase();
                                const autoFilled = autoFillFromRollNo(rollNo);
                                const updatedMember = { ...member, rollNo };
                                if (autoFilled) {
                                  updatedMember.department = autoFilled.department;
                                  updatedMember.year = autoFilled.year;
                                }
                                const newTeamMembers = [...teamMembers];
                                newTeamMembers[index] = updatedMember;
                                setTeamMembers(newTeamMembers);
                              }}
                              placeholder="Enter roll number (e.g., 23ADR145)"
                              className={`erf-input-modern ${member.rollNo && !validateRollNo(member.rollNo) ? 'erf-input-error' : ''}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>
                )}

                {/* Submit */}
                <div className="erf-form-submit-modern">
                  <button 
                    type="submit" 
                    className={`erf-btn-submit-modern ${!isFormValid() ? 'erf-disabled' : ''}`}
                    disabled={isSubmitting || !isFormValid()}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="erf-spinner"></span>
                        Registering...
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        {!isFormValid() && currentTeamSize < teamLimits.min ? 
                          `Add ${teamLimits.min - currentTeamSize} More Member${teamLimits.min - currentTeamSize > 1 ? 's' : ''}` :
                          !isFormValid() && currentTeamSize > teamLimits.max ? 
                          `Remove ${currentTeamSize - teamLimits.max} Member${currentTeamSize - teamLimits.max > 1 ? 's' : ''}` :
                          'Complete Registration'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ERegistrationForm;