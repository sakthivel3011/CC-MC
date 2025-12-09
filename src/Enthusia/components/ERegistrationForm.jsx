import React, { useState } from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaUsers, FaPlus, FaTrash, FaCheck, FaWhatsapp, FaCheckCircle, FaTimes, FaMusic, FaUpload, FaFileAudio, FaVenusMars, FaVenus, FaMars, FaGraduationCap } from 'react-icons/fa';
import '../styles/ERegistrationForm.css';

const ERegistrationForm = ({ event, onBack }) => {
  // Team Leader Contact Info (First Section)
  const [teamLeaderContact, setTeamLeaderContact] = useState({
    email: '',
    contact: ''
  });

  // Team Leader Details (Second Section)
  const [teamLeader, setTeamLeader] = useState({
    firstName: '',
    rollNo: ''
  });

  // Team Members
  const [subLeaders, setSubLeaders] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [registrationProgress, setRegistrationProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedId, setGeneratedId] = useState('');

  // Department codes mapping from roll number
  const departmentCodes = {
    'AD': 'AIDS', 'AL': 'AIML', 'CS': 'CSE', 'AU': 'AUTO', 'CH': 'CHEM',
    'FT': 'FOOD', 'CV': 'CIVIL', 'CD': 'CSD', 'IT': 'IT', 'EE': 'EEE',
    'EI': 'EIE', 'EC': 'ECE', 'ME': 'MECH', 'MT': 'MTS', 'MS': 'MSC',
    'MC': 'MCA', 'MB': 'MBA', 'BS': 'BSC', 'AR': 'ARCH'
  };

  // Get year from roll number (first 2 digits)
  const getYearFromRollNo = (rollNo) => {
    if (!rollNo || rollNo.length < 2) return '';
    const currentYear = new Date().getFullYear() % 100;
    const rollYear = parseInt(rollNo.substring(0, 2));
    const yearDiff = currentYear - rollYear;
    
    if (yearDiff === 0) return '1st Year';
    if (yearDiff === 1) return '2nd Year';
    if (yearDiff === 2) return '3rd Year';
    if (yearDiff === 3) return '4th Year';
    if (yearDiff === 4) return '5th Year';
    return '1st Year';
  };

  // Extract department from roll number
  const getDepartmentFromRollNo = (rollNo) => {
    if (!rollNo || rollNo.length < 4) return '';
    const deptCode = rollNo.substring(2, 4);
    return departmentCodes[deptCode] || '';
  };

  // WhatsApp group links configuration
  const getWhatsAppLink = () => {
    const soloEvents = ['Comic Satire', 'Solo Instrumental', 'Solo Dance', 'Solo Singing', 'Imitation', 'Stand Up Comedy', 'Anchoring'];
    const dualEvents = ['Dual Dance'];
    
    if (soloEvents.includes(event.name)) {
      return 'https://chat.whatsapp.com/BYX1khdDtbCFiAHlv2AmB5?mode=hqrt3 ';
    } else if (dualEvents.includes(event.name)) {
      return 'https://chat.whatsapp.com/EkOHwRPV05gEnrqK9WXN31?mode=hqrt3 ';
    } else {
      return 'https://chat.whatsapp.com/HnqZM1NvOtmDOYMPBTfgOo?mode=hqrt3 ';
    }
  };

  const getEventCode = (eventName) => {
    const codes = {
      'Comic Satire': 'CS', 'Solo Instrumental': 'SI', 'Group Instrumental': 'GI',
      'Solo Dance': 'SD', 'Dual Dance': 'DD', 'Group Dance': 'GD',
      'Solo Singing': 'SS', 'Group Singing': 'GS', 'Mime': 'ME',
      'Imitation': 'IP', 'Fashion Parade': 'FP', 'Movie Depiction': 'MD',
      'Skit': 'SK', 'Short Film': 'SF', 'Stand Up Comedy': 'SC', 'Anchoring': 'AC',
    };
    return codes[eventName] || 'GEN';
  };

  const requiresAudio = () => {
    const audioEvents = ['Solo Singing', 'Group Singing', 'Solo Instrumental', 'Group Instrumental'];
    return audioEvents.includes(event.name);
  };

  const checkDuplicates = async (eventName, rollNumbers) => {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzwyQ57oCytElhz6ll3yMWyHi0qrqDJTMjtgNA-wH_YKJT0VWdfpi52SXqvQwn5GGR/exec';
    try {
      const response = await fetch(`${SCRIPT_URL}?action=checkDuplicate&event=${encodeURIComponent(eventName)}&rollNos=${rollNumbers.join(',')}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return { isDuplicate: false };
    }
  };

  const generateRegistrationId = async (eventName) => {
    const eventCode = getEventCode(eventName);
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzwyQ57oCytElhz6ll3yMWyHi0qrqDJTMjtgNA-wH_YKJT0VWdfpi52SXqvQwn5GGR/exec';
    
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getIds&event=${encodeURIComponent(eventName)}`);
      const data = await response.json();
      
      if (data.status === 'success' && data.ids) {
        const existingNumbers = data.ids
          .filter(id => id.startsWith(eventCode))
          .map(id => parseInt(id.replace(eventCode, '')))
          .filter(num => !isNaN(num));
        
        let nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
        return `${eventCode}${nextNumber.toString().padStart(2, '0')}`;
      }
    } catch (error) {
      console.error('Error fetching IDs:', error);
    }
    return `${eventCode}${Date.now().toString().slice(-4)}`;
  };

  const uploadAudioToDrive = async (file, regId) => {
    const DRIVE_FOLDER_ID = '1n1aH1aVtRgZOaw0TmOBlCTLGgOT7EREG';
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzwyQ57oCytElhz6ll3yMWyHi0qrqDJTMjtgNA-wH_YKJT0VWdfpi52SXqvQwn5GGR/exec';
    
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          const base64Data = e.target.result.split(',')[1];
          const fileName = `${regId}_${file.name}`;
          setUploadProgress(30);
          
          const uploadData = {
            action: 'uploadAudio',
            fileName: fileName,
            mimeType: file.type,
            data: base64Data,
            folderId: DRIVE_FOLDER_ID
          };
          
          try {
            setUploadProgress(60);
            await fetch(SCRIPT_URL, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(uploadData)
            });
            setUploadProgress(100);
            resolve(`https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error) {
      return null;
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a'];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
        alert('Please upload a valid audio file (MP3, WAV, OGG, M4A)');
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        alert('File size must be less than 50MB');
        return;
      }
      setAudioFile(file);
      setAudioFileName(file.name);
    }
  };

  const getTeamLimits = () => ({
    min: event.minParticipants || 1,
    max: event.maxParticipants || 1
  });

  const teamLimits = getTeamLimits();
  const currentTeamSize = 1 + subLeaders.length + teamMembers.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegistrationProgress(0);

    try {
      setRegistrationProgress(10);
      
      if (requiresAudio() && !audioFile) {
        setErrorMessage(`Audio upload is required for ${event.name}!`);
        setShowErrorPopup(true);
        setIsSubmitting(false);
        setTimeout(() => setShowErrorPopup(false), 5000);
        return;
      }

      setRegistrationProgress(20);
      const allRollNumbers = [
        teamLeader.rollNo,
        ...subLeaders.map(sl => sl.rollNo),
        ...teamMembers.map(tm => tm.rollNo)
      ];

      setRegistrationProgress(30);
      const duplicateCheck = await checkDuplicates(event.name, allRollNumbers);
      
      if (duplicateCheck.isDuplicate) {
        setErrorMessage(`Roll number ${duplicateCheck.rollNo} is already registered for ${event.name}!`);
        setShowErrorPopup(true);
        setIsSubmitting(false);
        setTimeout(() => setShowErrorPopup(false), 5000);
        return;
      }

      setRegistrationProgress(40);
      const regId = await generateRegistrationId(event.name);
      setGeneratedId(regId);

      let audioUrl = '';
      if (audioFile) {
        setRegistrationProgress(50);
        audioUrl = await uploadAudioToDrive(audioFile, regId);
        setRegistrationProgress(70);
      } else {
        setRegistrationProgress(70);
      }

      setRegistrationProgress(80);
      
      // Prepare all participants data
      const allParticipants = [
        {
          name: teamLeader.firstName.trim(),
          rollNo: teamLeader.rollNo,
          contact: teamLeaderContact.contact,
          email: teamLeaderContact.email,
          role: 'Team Leader',
          department: getDepartmentFromRollNo(teamLeader.rollNo),
          year: getYearFromRollNo(teamLeader.rollNo)
        },
        ...subLeaders.map(leader => ({
          name: leader.firstName.trim(),
          rollNo: leader.rollNo,
          role: 'Sub Leader',
          department: getDepartmentFromRollNo(leader.rollNo),
          year: getYearFromRollNo(leader.rollNo)
        })),
        ...teamMembers.map(member => ({
          name: member.firstName.trim(),
          rollNo: member.rollNo,
          role: 'Member',
          department: getDepartmentFromRollNo(member.rollNo),
          year: getYearFromRollNo(member.rollNo)
        }))
      ];

      const registrationData = {
        registrationId: regId,
        name: teamLeader.firstName.trim(),
        email: teamLeaderContact.email,
        phone: teamLeaderContact.contact,
        rollNo: teamLeader.rollNo,
        department: getDepartmentFromRollNo(teamLeader.rollNo),
        year: getYearFromRollNo(teamLeader.rollNo),
        college: 'Kongu Engineering College',
        eventId: event.id,
        eventName: event.name,
        eventCategory: event.category,
        participants: allParticipants,
        totalMembers: allParticipants.length,
        audioUrl: audioUrl,
        audioFileName: audioFileName,
        timestamp: new Date().toISOString()
      };

      setRegistrationProgress(90);
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXBVLNKz-i4R0nQJTISt7tCclzqv9NmLuSkn4aFDnQ3Z4eTbA86ApAkAHTDVNYzim7/exec';
        
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
      });

      setRegistrationProgress(100);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setShowThankYou(true);
      }, 4000);
      
    } catch (error) {
      setRegistrationProgress(100);
      alert('Registration submitted! Your ID is: ' + generatedId);
      setShowThankYou(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email) => email.toLowerCase().endsWith('@kongu.edu');
  const validateRollNo = (rollNo) => /^[0-9]{2}[A-Z]{2,3}[0-9]{3}$/.test(rollNo);
  const validateContact = (contact) => /^[0-9]{10}$/.test(contact);

  const isFormValid = () => {
    // Team Leader Contact Info
    const contactInfoValid = teamLeaderContact.email && validateEmail(teamLeaderContact.email) && 
                           teamLeaderContact.contact && validateContact(teamLeaderContact.contact);
    
    // Team Leader Details
    const teamLeaderValid = teamLeader.firstName && 
                          teamLeader.rollNo && validateRollNo(teamLeader.rollNo);
    
    // Sub Leaders
    const subLeadersValid = subLeaders.every(leader => (
      leader.firstName && leader.rollNo && validateRollNo(leader.rollNo)
    ));

    // Team Members
    const teamMembersValid = teamMembers.every(member => (
      member.firstName && member.rollNo && validateRollNo(member.rollNo)
    ));
    
    // Team Size
    const teamSizeValid = currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max;
    
    // Audio (if required)
    const audioValid = !requiresAudio() || (requiresAudio() && audioFile);
    
    return contactInfoValid && teamLeaderValid && subLeadersValid && teamMembersValid && teamSizeValid && audioValid;
  };

  const whatsappLink = getWhatsAppLink();

  if (showThankYou) {
    return (
      <div className="erf-thank-you-container">
        <div className="erf-thank-you-card">
          <div className="erf-success-animation">
            <div className="erf-success-checkmark"><FaCheckCircle /></div>
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
                <p>{teamLeader.firstName}</p>
              </div>
            </div>
            <div className="erf-summary-stats">
              <div className="erf-stat-box">
                <FaUsers /> <span>{currentTeamSize} Member{currentTeamSize > 1 ? 's' : ''}</span>
              </div>
              {audioFileName && <div className="erf-stat-box"><FaMusic /> <span>Audio Uploaded</span></div>}
            </div>
          </div>

          <div className="erf-action-buttons-modern">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="erf-btn-whatsapp">
              <FaWhatsapp /> Join WhatsApp Group
            </a>
            <button onClick={onBack} className="erf-btn-back-home">Back to Events</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="erf-registration-page-modern">
      {showPopup && (
        <div className="erf-success-popup">
          <div className="erf-popup-content">
            <button className="erf-popup-close" onClick={() => setShowPopup(false)}><FaTimes /></button>
            <div className="erf-popup-icon"><FaCheckCircle /></div>
            <h3>Registration Successful!</h3>
            <p className="erf-popup-id">Your ID: <strong>{generatedId}</strong></p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="erf-popup-whatsapp">
              <FaWhatsapp /> Join WhatsApp Group
            </a>
          </div>
        </div>
      )}
      
      {showErrorPopup && (
        <div className="erf-duplicate-error-popup">
          <div className="erf-error-content">
            <button className="erf-error-close" onClick={() => setShowErrorPopup(false)}><FaTimes /></button>
            <div className="erf-error-icon"><FaTimes /></div>
            <h3>Registration Failed!</h3>
            <p>{errorMessage}</p>
            <p className="erf-error-note">
              Please check your details and try again.
            </p>
          </div>
        </div>
      )}
      
      {isSubmitting && registrationProgress > 0 && (
        <div className="erf-progress-overlay">
          <div className="erf-progress-card">
            <div style={{position: 'relative', width: '150px', height: '150px', margin: '0 auto 1rem'}}>
              <svg style={{width: '100%', height: '100%', transform: 'rotate(-90deg)'}} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#4169e1" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray="283" strokeDashoffset={283 - (283 * registrationProgress) / 100} 
                  style={{transition: 'stroke-dashoffset 0.3s ease'}} />
              </svg>
              <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
                fontSize: '2rem', fontWeight: 'bold', color: '#4169e1'}}>{registrationProgress}%</div>
            </div>
            <p style={{fontSize: '1.1rem', fontWeight: '600', color: '#333', marginTop: '1rem'}}>
              {registrationProgress < 30 ? 'Validating...' : registrationProgress < 50 ? 'Checking...' : 
               registrationProgress < 80 ? 'Uploading...' : registrationProgress < 100 ? 'Submitting...' : 'Complete!'}
            </p>
          </div>
        </div>
      )}
      
      <div className="erf-page-header-modern">
        <button onClick={onBack} className="erf-btn-back-modern"><FaArrowLeft /> <span>Back</span></button>
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
          <aside className="erf-sidebar-modern">
            <div className="erf-info-card-modern">
              <h3>Event Guidelines</h3>
              
              <div className="erf-team-size-modern">
                <h4>Team Size</h4>
                <div className="erf-size-badges">
                  <div className="erf-badge-required">
                    <span className="erf-badge-label">Required</span>
                    <span className="erf-badge-value">{teamLimits.min === teamLimits.max ? `${teamLimits.min}` : `${teamLimits.min}-${teamLimits.max}`}</span>
                  </div>
                  <div className={`erf-badge-current ${
                    currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max ? 'erf-valid' : 'erf-invalid'
                  }`}>
                    <span className="erf-badge-label">Current</span>
                    <span className="erf-badge-value">
                      {currentTeamSize}
                    </span>
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

              {requiresAudio() && (
                <div className="erf-status-alert erf-error" style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <FaMusic style={{fontSize: '1.5rem'}} />
                  <span>Audio upload is required for this event</span>
                </div>
              )}

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
                  <p className="erf-coordinator-phone">
                    <FaPhone /> {event.phone}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <main className="erf-form-main-modern">
            <div className="erf-form-card-modern">
              <div className="erf-form-header-text">
                <h2>Registration Form</h2>
                <p>Fill in your details to register for the event</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Section 1: Team Leader Contact Info */}
                <section className="erf-form-section-modern">
                  <div className="erf-section-title">
                    <FaUser className="erf-section-icon" />
                    <h3>General Information</h3>
                  </div>
                  
                  <div className="erf-input-grid">
                    <div className="erf-input-wrapper">
                      <label>Email Address *</label>
                      <input type="email" required value={teamLeaderContact.email}
                        onChange={(e) => setTeamLeaderContact({...teamLeaderContact, email: e.target.value})}
                        placeholder="your.name@kongu.edu"
                        className={`erf-input-modern ${
                          teamLeaderContact.email && !validateEmail(teamLeaderContact.email) ? 'erf-input-error' : 
                          teamLeaderContact.email && validateEmail(teamLeaderContact.email) ? 'erf-input-success' : ''
                        }`} />
                      {teamLeaderContact.email && !validateEmail(teamLeaderContact.email) && (
                        <div className="erf-input-error-message">Must use @kongu.edu email</div>
                      )}
                    </div>
                    
                    <div className="erf-input-wrapper">
                      <label>Contact Number *</label>
                      <input type="tel" required value={teamLeaderContact.contact}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length <= 10) setTeamLeaderContact({...teamLeaderContact, contact: value});
                        }}
                        placeholder="10 digit number"
                        className={`erf-input-modern ${
                          teamLeaderContact.contact && !validateContact(teamLeaderContact.contact) ? 'erf-input-error' : 
                          teamLeaderContact.contact && validateContact(teamLeaderContact.contact) ? 'erf-input-success' : ''
                        }`} />
                    </div>
                  </div>
                </section>

                {/* Section 2: Team Leader Details */}
                <section className="erf-form-section-modern">
                  <div className="erf-section-title">
                    <FaUser className="erf-section-icon" />
                    <h3>Team Leader Details</h3>
                  </div>
                  
                  <div className="erf-input-grid">
                    <div className="erf-input-wrapper">
                      <label>Full Name *</label>
                      <input type="text" required value={teamLeader.firstName}
                        onChange={(e) => setTeamLeader({...teamLeader, firstName: e.target.value})}
                        placeholder="Enter your full name" className="erf-input-modern" />
                    </div>
                    
                    <div className="erf-input-wrapper">
                      <label>Roll Number *</label>
                      <div className="erf-rollno-input-wrapper">
                        <input type="text" required value={teamLeader.rollNo}
                          onChange={(e) => {
                            const rollNo = e.target.value.toUpperCase();
                            setTeamLeader({...teamLeader, rollNo});
                          }}
                          placeholder="e.g., 23ADR145"
                          className={`erf-input-modern ${
                            teamLeader.rollNo && !validateRollNo(teamLeader.rollNo) ? 'erf-input-error' : 
                            teamLeader.rollNo && validateRollNo(teamLeader.rollNo) ? 'erf-input-success' : ''
                          }`} />
                        
                        {teamLeader.rollNo && validateRollNo(teamLeader.rollNo) && (
                          <div className="erf-rollno-info">
                            <span className="erf-department-badge">
                              <FaGraduationCap /> {getDepartmentFromRollNo(teamLeader.rollNo)} - {getYearFromRollNo(teamLeader.rollNo)}
                            </span>
                          </div>
                        )}
                        
                        {teamLeader.rollNo && !validateRollNo(teamLeader.rollNo) && (
                          <div className="erf-input-error-message">Invalid format. Example: 23ADR145</div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {requiresAudio() && (
                  <section className="erf-form-section-modern">
                    <div className="erf-section-title">
                      <FaMusic className="erf-section-icon" />
                      <h3>
                        Audio Upload <span className="erf-optional-tag" style={{color: '#ff6b6b'}}>(Required)</span>
                      </h3>
                    </div>
                    
                    <div className="erf-audio-upload-container">
                      <input type="file" id="audio-upload" accept="audio/*,.mp3,.wav,.ogg,.m4a"
                        onChange={handleAudioChange} style={{display: 'none'}} />
                      <label htmlFor="audio-upload" className="erf-audio-upload-btn">
                        <FaUpload /> {audioFileName ? 'Change Audio File' : 'Upload Audio File'}
                      </label>
                      
                      {audioFileName && (
                        <div className="erf-audio-file-display">
                          <FaFileAudio />
                          <span>{audioFileName}</span>
                          <button type="button" onClick={() => {
                            setAudioFile(null);
                            setAudioFileName('');
                            document.getElementById('audio-upload').value = '';
                          }} className="erf-audio-remove-btn">
                            <FaTrash />
                          </button>
                        </div>
                      )}
                      
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="erf-upload-progress">
                          <div className="erf-progress-bar" style={{width: `${uploadProgress}%`}}></div>
                          <span>{uploadProgress}% Uploading...</span>
                        </div>
                      )}
                      
                      <p className="erf-audio-note">
                        Supported formats: MP3, WAV, OGG, M4A (Max 50MB)
                      </p>
                    </div>
                  </section>
                )}

                {/* Section 3: Sub Leaders */}
                {teamLimits.max > 1 && (
                  <section className="erf-form-section-modern">
                    <div className="erf-section-title-with-action">
                      <div className="erf-section-title">
                        <FaUsers className="erf-section-icon" />
                        <h3>Sub Leader</h3>
                      </div>
                      {subLeaders.length < 1 && currentTeamSize < teamLimits.max && (
                        <button type="button" onClick={() => setSubLeaders([...subLeaders, {
                          firstName: '', rollNo: ''
                        }])} className="erf-btn-add-modern">
                          <FaPlus /> Add Sub Leader
                        </button>
                      )}
                    </div>
                    
                    {subLeaders.map((subLeader, index) => (
                      <div key={index} className="erf-member-card-modern">
                        <div className="erf-member-card-header">
                          <h4>Sub Leader</h4>
                          <button type="button" onClick={() => setSubLeaders(subLeaders.filter((_, i) => i !== index))}
                            className="erf-btn-remove-modern">
                            <FaTrash />
                          </button>
                        </div>
                        <div className="erf-input-grid">
                          <div className="erf-input-wrapper">
                            <label>Full Name *</label>
                            <input type="text" required value={subLeader.firstName}
                              onChange={(e) => {
                                const updated = [...subLeaders];
                                updated[index].firstName = e.target.value;
                                setSubLeaders(updated);
                              }} placeholder="Enter full name" className="erf-input-modern" />
                          </div>
                          
                          <div className="erf-input-wrapper">
                            <label>Roll Number *</label>
                            <div className="erf-rollno-input-wrapper">
                              <input type="text" required value={subLeader.rollNo}
                                onChange={(e) => {
                                  const rollNo = e.target.value.toUpperCase();
                                  const updated = [...subLeaders];
                                  updated[index].rollNo = rollNo;
                                  setSubLeaders(updated);
                                }} placeholder="e.g., 23ADR145"
                                className={`erf-input-modern ${
                                  subLeader.rollNo && !validateRollNo(subLeader.rollNo) ? 'erf-input-error' : ''
                                }`} />
                              
                              {subLeader.rollNo && validateRollNo(subLeader.rollNo) && (
                                <div className="erf-rollno-info">
                                  <span className="erf-department-badge">
                                    <FaGraduationCap /> {getDepartmentFromRollNo(subLeader.rollNo)} - {getYearFromRollNo(subLeader.rollNo)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>
                )}

                {/* Section 4: Team Members */}
                {teamLimits.max > 1 && (
                  <section className="erf-form-section-modern">
                    <div className="erf-section-title-with-action">
                      <div className="erf-section-title">
                        <FaUsers className="erf-section-icon" />
                        <h3>
                          Team Members <span className="erf-optional-tag">(Optional)</span>
                        </h3>
                      </div>
                      {currentTeamSize < teamLimits.max && (
                        <button type="button" onClick={() => setTeamMembers([...teamMembers, {
                          firstName: '', rollNo: ''
                        }])} className="erf-btn-add-modern">
                          <FaPlus /> Add Member
                        </button>
                      )}
                    </div>
                    
                    {teamMembers.map((member, index) => (
                      <div key={index} className="erf-member-card-modern">
                        <div className="erf-member-card-header">
                          <h4>Team Member {index + 1}</h4>
                          <button type="button" onClick={() => setTeamMembers(teamMembers.filter((_, i) => i !== index))}
                            className="erf-btn-remove-modern">
                            <FaTrash />
                          </button>
                        </div>
                        <div className="erf-input-grid">
                          <div className="erf-input-wrapper">
                            <label>Full Name *</label>
                            <input type="text" required value={member.firstName}
                              onChange={(e) => {
                                const updated = [...teamMembers];
                                updated[index].firstName = e.target.value;
                                setTeamMembers(updated);
                              }} placeholder="Enter full name" className="erf-input-modern" />
                          </div>
                          
                          <div className="erf-input-wrapper">
                            <label>Roll Number *</label>
                            <div className="erf-rollno-input-wrapper">
                              <input type="text" required value={member.rollNo}
                                onChange={(e) => {
                                  const rollNo = e.target.value.toUpperCase();
                                  const updated = [...teamMembers];
                                  updated[index].rollNo = rollNo;
                                  setTeamMembers(updated);
                                }} placeholder="e.g., 23ADR145"
                                className={`erf-input-modern ${
                                  member.rollNo && !validateRollNo(member.rollNo) ? 'erf-input-error' : ''
                                }`} />
                              
                              {member.rollNo && validateRollNo(member.rollNo) && (
                                <div className="erf-rollno-info">
                                  <span className="erf-department-badge">
                                    <FaGraduationCap /> {getDepartmentFromRollNo(member.rollNo)} - {getYearFromRollNo(member.rollNo)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>
                )}

                <div className="erf-form-submit-modern">
                  <button type="submit" disabled={isSubmitting || !isFormValid()}
                    className={`erf-btn-submit-modern ${!isFormValid() ? 'erf-disabled' : ''}`}>
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
                          !isFormValid() && requiresAudio() && !audioFile ?
                          'Audio Upload Required' :
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