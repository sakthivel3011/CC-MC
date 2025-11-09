import React, { useState } from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaUsers, FaPlus, FaTrash, FaCheck, FaWhatsapp, FaCheckCircle, FaTimes, FaMusic, FaUpload, FaFileAudio } from 'react-icons/fa';

const ERegistrationForm = ({ event, onBack }) => {
  const [teamLeader, setTeamLeader] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    department: '',
    year: '',
    contact: '',
    email: ''
  });

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

  // WhatsApp group links configuration
  const getWhatsAppLink = () => {
    const soloEvents = ['Comic Satire', 'Solo Instrumental', 'Solo Dance', 'Solo Singing', 'Imitation', 'Stand Up Comedy', 'Anchoring'];
    const dualEvents = ['Dual Dance'];
    
    if (soloEvents.includes(event.name)) {
      return 'https://chat.whatsapp.com/solo-events-group';
    } else if (dualEvents.includes(event.name)) {
      return 'https://chat.whatsapp.com/dual-events-group';
    } else {
      return 'https://chat.whatsapp.com/group-events-group';
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
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXBVLNKz-i4R0nQJTISt7tCclzqv9NmLuSkn4aFDnQ3Z4eTbA86ApAkAHTDVNYzim7/exec';
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
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXBVLNKz-i4R0nQJTISt7tCclzqv9NmLuSkn4aFDnQ3Z4eTbA86ApAkAHTDVNYzim7/exec';
    
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
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXBVLNKz-i4R0nQJTISt7tCclzqv9NmLuSkn4aFDnQ3Z4eTbA86ApAkAHTDVNYzim7/exec';
    
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
      const fullName = `${teamLeader.firstName} ${teamLeader.lastName}`.trim();
      
      const participants = [
        {
          name: fullName,
          department: teamLeader.department,
          year: teamLeader.year,
          rollNo: teamLeader.rollNo,
          email: teamLeader.email,
          phone: teamLeader.contact,
          role: 'Team Leader'
        },
        ...subLeaders.map(leader => ({
          name: `${leader.firstName} ${leader.lastName}`.trim(),
          department: leader.department || teamLeader.department,
          year: leader.year || teamLeader.year,
          rollNo: leader.rollNo,
          email: leader.email,
          phone: leader.contact,
          role: 'Sub Leader'
        })),
        ...teamMembers.map(member => ({
          name: `${member.firstName} ${member.lastName}`.trim(),
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
        name: fullName,
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

  const departmentCodes = {
    'AD': 'AIDS', 'AL': 'AIML', 'CS': 'CSE', 'AU': 'AUTO', 'CH': 'CHEM',
    'FT': 'FOOD', 'CV': 'CIVIL', 'CD': 'CSD', 'IT': 'IT', 'EE': 'EEE',
    'EI': 'EIE', 'EC': 'ECE', 'ME': 'MECH', 'MT': 'MTS', 'MS': 'MSC',
    'MC': 'MCA', 'MB': 'MBA', 'BS': 'BSC', 'AR': 'ARCH'
  };

  const getYearFromRollNo = (rollNo) => {
    if (!rollNo || rollNo.length < 2) return '';
    const yearDiff = (new Date().getFullYear() % 100) - parseInt(rollNo.substring(0, 2));
    const yearMap = { 0: '1st Year', 1: '2nd Year', 2: '3rd Year', 3: '4th Year', 4: '5th Year' };
    return yearMap[yearDiff] || '1st Year';
  };

  const autoFillFromRollNo = (rollNo) => {
    if (validateRollNo(rollNo)) {
      return {
        department: departmentCodes[rollNo.substring(2, 4)] || '',
        year: getYearFromRollNo(rollNo)
      };
    }
    return null;
  };

  const isFormValid = () => {
    const { firstName, lastName, rollNo, department, year, contact, email } = teamLeader;
    const basicInfoValid = firstName && lastName && rollNo && validateRollNo(rollNo) && 
                          department && year && contact && validateContact(contact);
    const emailValid = email && validateEmail(email);
    const teamSizeValid = currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max;
    const audioValid = !requiresAudio() || (requiresAudio() && audioFile);
    
    const subLeadersValid = subLeaders.every(leader => (
      leader.firstName && leader.lastName && leader.rollNo && validateRollNo(leader.rollNo) && 
      leader.contact && validateContact(leader.contact) && leader.email && validateEmail(leader.email)
    ));

    const teamMembersValid = teamMembers.every(member => (
      member.firstName && member.lastName && member.rollNo && validateRollNo(member.rollNo)
    ));
    
    return basicInfoValid && emailValid && teamSizeValid && subLeadersValid && teamMembersValid && audioValid;
  };

  const whatsappLink = getWhatsAppLink();

  if (showThankYou) {
    return (
      <div style={styles.thankYouContainer}>
        <div style={styles.thankYouCard}>
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <div style={{fontSize: '5rem', color: '#50c878'}}><FaCheckCircle /></div>
          </div>
          
          <h1 style={styles.successTitle}>Registration Successful!</h1>
          <p style={styles.successSubtitle}>You're all set for the event</p>
          
          <div style={styles.registrationIdShowcase}>
            <span style={styles.idLabel}>Your Registration ID</span>
            <div style={styles.regIdBox}>{generatedId}</div>
            <p style={styles.idNote}>Please save this ID for future reference</p>
          </div>
          
          <div style={styles.eventSummary}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem'}}>
              <span style={{fontSize: '3rem'}}>{event.icon}</span>
              <div>
                <h3 style={{color: '#ffd700', fontSize: '1.5rem', margin: '0 0 0.5rem 0'}}>{event.name}</h3>
                <p style={{color: 'white', margin: 0}}>{`${teamLeader.firstName} ${teamLeader.lastName}`}</p>
              </div>
            </div>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <div style={styles.statBox}>
                <FaUsers /> <span>{currentTeamSize} Member{currentTeamSize > 1 ? 's' : ''}</span>
              </div>
              {audioFileName && <div style={styles.statBox}><FaMusic /> <span>Audio Uploaded</span></div>}
            </div>
          </div>

          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={styles.btnWhatsapp}>
              <FaWhatsapp /> Join WhatsApp Group
            </a>
            <button onClick={onBack} style={styles.btnBackHome}>Back to Events</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {showPopup && (
        <div style={styles.popup}>
          <button style={styles.popupClose} onClick={() => setShowPopup(false)}><FaTimes /></button>
          <div style={{fontSize: '3rem', marginBottom: '15px'}}><FaCheckCircle /></div>
          <h3 style={{fontSize: '1.3rem', fontWeight: '700', margin: '0 0 10px 0'}}>Registration Successful!</h3>
          <p style={{fontSize: '0.95rem', margin: '0 0 15px 0'}}>Your ID: <strong style={{color: '#ffd700', fontSize: '1.1rem'}}>{generatedId}</strong></p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={styles.popupBtn}>
            <FaWhatsapp /> Join WhatsApp Group
          </a>
        </div>
      )}
      
      {showErrorPopup && (
        <div style={styles.errorPopup}>
          <button style={styles.popupClose} onClick={() => setShowErrorPopup(false)}><FaTimes /></button>
          <div style={{fontSize: '3.5rem', marginBottom: '15px', color: 'white'}}><FaTimes /></div>
          <h3 style={{fontSize: '1.4rem', fontWeight: '700', margin: '0 0 15px 0', color: 'white'}}>Registration Failed!</h3>
          <p style={{color: 'white', margin: '0 0 10px 0'}}>{errorMessage}</p>
          <p style={{fontSize: '0.9rem', opacity: 0.85, marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.3)', color: 'white'}}>
            Please check your details and try again.
          </p>
        </div>
      )}
      
      {isSubmitting && registrationProgress > 0 && (
        <div style={styles.progressOverlay}>
          <div style={styles.progressCard}>
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
      
      <div style={styles.header}>
        <button onClick={onBack} style={styles.btnBack}><FaArrowLeft /> <span>Back</span></button>
        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1}}>
          <span style={{fontSize: '3.5rem'}}>{event.icon}</span>
          <div>
            <h1 style={styles.title}>{event.name}</h1>
            <p style={styles.desc}>{event.description}</p>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.layout}>
          <aside style={styles.sidebar}>
            <div style={styles.card}>
              <h3 style={{color: '#ffd700', fontSize: '1.4rem', margin: '0 0 1.5rem 0'}}>Event Guidelines</h3>
              
              <div style={{background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '1.25rem', marginBottom: '1.5rem'}}>
                <h4 style={{color: '#87ceeb', fontSize: '1.1rem', margin: '0 0 1rem 0'}}>Team Size</h4>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem'}}>
                  <div style={styles.badge}>
                    <span style={styles.badgeLabel}>Required</span>
                    <span style={styles.badgeValue}>{teamLimits.min === teamLimits.max ? `${teamLimits.min}` : `${teamLimits.min}-${teamLimits.max}`}</span>
                  </div>
                  <div style={{...styles.badge, 
                    ...(currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max ? 
                      {borderColor: '#50c878', background: 'rgba(80,200,120,0.1)'} : 
                      {borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.1)'})}}>
                    <span style={styles.badgeLabel}>Current</span>
                    <span style={{...styles.badgeValue, color: currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max ? '#50c878' : '#ff6b6b'}}>
                      {currentTeamSize}
                    </span>
                  </div>
                </div>
                
                {currentTeamSize < teamLimits.min && (
                  <div style={{...styles.alert, background: 'rgba(255,191,0,0.15)', border: '1px solid #ffbf00', color: '#ffbf00'}}>
                    Add {teamLimits.min - currentTeamSize} more member{teamLimits.min - currentTeamSize > 1 ? 's' : ''}
                  </div>
                )}
                {currentTeamSize > teamLimits.max && (
                  <div style={{...styles.alert, background: 'rgba(255,107,107,0.15)', border: '1px solid #ff6b6b', color: '#ff6b6b'}}>
                    Remove {currentTeamSize - teamLimits.max} member{currentTeamSize - teamLimits.max > 1 ? 's' : ''}
                  </div>
                )}
                {currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max && (
                  <div style={{...styles.alert, background: 'rgba(80,200,120,0.15)', border: '1px solid #50c878', color: '#50c878'}}>
                    Perfect team size!
                  </div>
                )}
              </div>

              {requiresAudio() && (
                <div style={{background: 'rgba(255,107,107,0.1)', border: '2px solid #ff6b6b', borderRadius: '12px', 
                  padding: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <FaMusic style={{fontSize: '1.5rem', color: '#ff6b6b'}} />
                  <p style={{color: 'white', margin: 0, fontSize: '0.9rem', fontWeight: '600'}}>
                    Audio upload is required for this event
                  </p>
                </div>
              )}

              <div>
                <h4 style={{color: '#87ceeb', fontSize: '1.1rem', margin: '0 0 1rem 0'}}>Rules</h4>
                <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                  {event.rules.map((rule, index) => (
                    <li key={index} style={{padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', 
                      fontSize: '0.9rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.9)'}}>{rule}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '1.25rem', marginTop: '1.5rem'}}>
                <h4 style={{color: '#87ceeb', fontSize: '1.1rem', margin: '0 0 0.75rem 0'}}>Event Coordinator</h4>
                <p style={{fontWeight: '600', fontSize: '1.05rem', margin: '0 0 0.5rem 0', color: 'white'}}>{event.coordinator}</p>
                <p style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', margin: 0, color: 'white'}}>
                  <FaPhone /> {event.phone}
                </p>
              </div>
            </div>
          </aside>

          <main style={styles.main}>
            <div style={styles.formCard}>
              <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2 style={{color: 'white', fontSize: '2rem', fontWeight: '700', margin: '0 0 0.5rem 0'}}>Registration Form</h2>
                <p style={{color: 'rgba(255,255,255,0.7)', margin: 0}}>Fill in your details to register for the event</p>
              </div>

              <form onSubmit={handleSubmit}>
                <section style={{marginBottom: '2.5rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', 
                    paddingBottom: '0.75rem', borderBottom: '2px solid rgba(135,206,235,0.3)'}}>
                    <FaUser style={{color: '#87ceeb', fontSize: '1.5rem'}} />
                    <h3 style={{color: 'white', fontSize: '1.3rem', margin: 0}}>Team Leader</h3>
                  </div>
                  
                  <div style={styles.grid}>
                    <div style={styles.inputWrap}>
                      <label style={styles.label}>First Name *</label>
                      <input type="text" required value={teamLeader.firstName}
                        onChange={(e) => setTeamLeader({...teamLeader, firstName: e.target.value})}
                        placeholder="Enter first name" style={styles.input} />
                    </div>
                    <div style={styles.inputWrap}>
                      <label style={styles.label}>Last Name *</label>
                      <input type="text" required value={teamLeader.lastName}
                        onChange={(e) => setTeamLeader({...teamLeader, lastName: e.target.value})}
                        placeholder="Enter last name" style={styles.input} />
                    </div>
                    <div style={styles.inputWrap}>
                      <label style={styles.label}>Roll Number *</label>
                      <input type="text" required value={teamLeader.rollNo}
                        onChange={(e) => {
                          const rollNo = e.target.value.toUpperCase();
                          const autoFilled = autoFillFromRollNo(rollNo);
                          setTeamLeader(autoFilled ? {...teamLeader, rollNo, ...autoFilled} : {...teamLeader, rollNo});
                        }}
                        placeholder="e.g., 23CS123"
                        style={{...styles.input, ...(teamLeader.rollNo && !validateRollNo(teamLeader.rollNo) ? 
                          {borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.05)'} : 
                          teamLeader.rollNo && validateRollNo(teamLeader.rollNo) ? 
                          {borderColor: '#50c878', background: 'rgba(80,200,120,0.05)'} : {})}} />
                      {teamLeader.rollNo && !validateRollNo(teamLeader.rollNo) && (
                        <div style={{fontSize: '0.8rem', marginTop: '0.25rem', color: '#ff6b6b'}}>Invalid format. Example: 23CS123</div>
                      )}
                      {teamLeader.rollNo && validateRollNo(teamLeader.rollNo) && (
                        <div style={{fontSize: '0.8rem', marginTop: '0.25rem', color: '#50c878', display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                          <FaCheck /> Valid roll number
                        </div>
                      )}
                    </div>
                    <div style={styles.inputWrap}>
                      <label style={styles.label}>Department *</label>
                      <select required value={teamLeader.department} 
                        onChange={(e) => setTeamLeader({...teamLeader, department: e.target.value})} style={styles.input}>
                        <option value="">Select Department</option>
                        <option value="AIDS">AIDS</option>
                        <option value="AIML">AIML</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="AUTO">AUTO</option>
                        <option value="CHEM">CHEM</option>
                      </select>
                    </div>
                    <div style={styles.inputWrap}>
                      <label style={styles.label}>Year *</label>
                      <select required value={teamLeader.year}
                        onChange={(e) => setTeamLeader({...teamLeader, year: e.target.value})} style={styles.input}>
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </div>
                    <div style={styles.inputWrap}>
                      <label style={styles.label}>Contact Number *</label>
                      <input type="tel" required value={teamLeader.contact}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length <= 10) setTeamLeader({...teamLeader, contact: value});
                        }}
                        placeholder="10 digit number"
                        style={{...styles.input, ...(teamLeader.contact && !validateContact(teamLeader.contact) ? 
                          {borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.05)'} : 
                          teamLeader.contact && validateContact(teamLeader.contact) ? 
                          {borderColor: '#50c878', background: 'rgba(80,200,120,0.05)'} : {})}} />
                    </div>
                    <div style={styles.inputWrap}>
                      <label style={styles.label}>Email Address *</label>
                      <input type="email" required value={teamLeader.email}
                        onChange={(e) => setTeamLeader({...teamLeader, email: e.target.value})}
                        placeholder="your.name@kongu.edu"
                        style={{...styles.input, ...(teamLeader.email && !validateEmail(teamLeader.email) ? 
                          {borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.05)'} : 
                          teamLeader.email && validateEmail(teamLeader.email) ? 
                          {borderColor: '#50c878', background: 'rgba(80,200,120,0.05)'} : {})}} />
                      {teamLeader.email && !validateEmail(teamLeader.email) && (
                        <div style={{fontSize: '0.8rem', marginTop: '0.25rem', color: '#ff6b6b'}}>Must use @kongu.edu email</div>
                      )}
                    </div>
                  </div>
                </section>

                {requiresAudio() && (
                  <section style={{marginBottom: '2.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', 
                      paddingBottom: '0.75rem', borderBottom: '2px solid rgba(135,206,235,0.3)'}}>
                      <FaMusic style={{color: '#87ceeb', fontSize: '1.5rem'}} />
                      <h3 style={{color: 'white', fontSize: '1.3rem', margin: 0}}>
                        Audio Upload <span style={{fontSize: '0.8rem', color: '#ff6b6b', fontWeight: 400}}>(Required)</span>
                      </h3>
                    </div>
                    
                    <div style={{background: 'rgba(255,255,255,0.03)', border: '2px dashed rgba(135,206,235,0.4)', 
                      borderRadius: '15px', padding: '2rem', textAlign: 'center'}}>
                      <input type="file" id="audio-upload" accept="audio/*,.mp3,.wav,.ogg,.m4a"
                        onChange={handleAudioChange} style={{display: 'none'}} />
                      <label htmlFor="audio-upload" style={{display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                        background: 'linear-gradient(135deg, #87ceeb, #4169e1)', color: 'white', padding: '1rem 2rem',
                        borderRadius: '12px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer'}}>
                        <FaUpload /> {audioFileName ? 'Change Audio File' : 'Upload Audio File'}
                      </label>
                      
                      {audioFileName && (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                          background: 'rgba(80,200,120,0.1)', border: '2px solid #50c878', borderRadius: '12px',
                          padding: '1rem 1.5rem', marginTop: '1rem', color: '#50c878', fontWeight: '600'}}>
                          <FaFileAudio style={{fontSize: '1.5rem'}} />
                          <span>{audioFileName}</span>
                          <button type="button" onClick={() => {
                            setAudioFile(null);
                            setAudioFileName('');
                            document.getElementById('audio-upload').value = '';
                          }} style={{background: '#ff6b6b', color: 'white', border: 'none', padding: '0.5rem',
                            borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', marginLeft: 'auto'}}>
                            <FaTrash />
                          </button>
                        </div>
                      )}
                      
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div style={{marginTop: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px',
                          padding: '0.5rem', overflow: 'hidden'}}>
                          <div style={{height: '8px', background: 'linear-gradient(90deg, #50c878, #87ceeb)',
                            borderRadius: '10px', width: `${uploadProgress}%`, transition: 'width 0.3s ease'}}></div>
                          <span style={{display: 'block', textAlign: 'center', color: 'white', fontSize: '0.85rem',
                            marginTop: '0.5rem', fontWeight: '600'}}>{uploadProgress}% Uploading...</span>
                        </div>
                      )}
                      
                      <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '1rem', marginBottom: 0}}>
                        Supported formats: MP3, WAV, OGG, M4A (Max 50MB)
                      </p>
                    </div>
                  </section>
                )}

                {teamLimits.max > 1 && (
                  <section style={{marginBottom: '2.5rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                        <FaUsers style={{color: '#87ceeb', fontSize: '1.5rem'}} />
                        <h3 style={{color: 'white', fontSize: '1.3rem', margin: 0}}>Sub Leader</h3>
                      </div>
                      {subLeaders.length < 1 && currentTeamSize < teamLimits.max && (
                        <button type="button" onClick={() => setSubLeaders([...subLeaders, {
                          firstName: '', lastName: '', rollNo: '', department: '', year: '', contact: '', email: ''
                        }])} style={{display: 'flex', alignItems: 'center', gap: '0.5rem',
                          background: 'linear-gradient(135deg, #50c878, #228b22)', color: 'white', border: 'none',
                          padding: '0.625rem 1.25rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '600',
                          cursor: 'pointer'}}>
                          <FaPlus /> Add Sub Leader
                        </button>
                      )}
                    </div>
                    
                    {subLeaders.map((subLeader, index) => (
                      <div key={index} style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px', padding: '1.5rem', marginBottom: '1.25rem'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                          <h4 style={{color: '#ffd700', fontSize: '1.1rem', margin: 0}}>Sub Leader</h4>
                          <button type="button" onClick={() => setSubLeaders(subLeaders.filter((_, i) => i !== index))}
                            style={{background: 'linear-gradient(135deg, #ff6b6b, #dc143c)', color: 'white', border: 'none',
                              padding: '0.5rem', borderRadius: '10px', width: '40px', height: '40px', display: 'flex',
                              alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                            <FaTrash />
                          </button>
                        </div>
                        <div style={styles.grid}>
                          <div style={styles.inputWrap}>
                            <label style={styles.label}>First Name *</label>
                            <input type="text" required value={subLeader.firstName}
                              onChange={(e) => {
                                const updated = [...subLeaders];
                                updated[index].firstName = e.target.value;
                                setSubLeaders(updated);
                              }} placeholder="Enter first name" style={styles.input} />
                          </div>
                          <div style={styles.inputWrap}>
                            <label style={styles.label}>Last Name *</label>
                            <input type="text" required value={subLeader.lastName}
                              onChange={(e) => {
                                const updated = [...subLeaders];
                                updated[index].lastName = e.target.value;
                                setSubLeaders(updated);
                              }} placeholder="Enter last name" style={styles.input} />
                          </div>
                          <div style={styles.inputWrap}>
                            <label style={styles.label}>Roll Number *</label>
                            <input type="text" required value={subLeader.rollNo}
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
                              }} placeholder="e.g., 23CS123"
                              style={{...styles.input, ...(subLeader.rollNo && !validateRollNo(subLeader.rollNo) ? 
                                {borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.05)'} : {})}} />
                          </div>
                          <div style={styles.inputWrap}>
                            <label style={styles.label}>Contact *</label>
                            <input type="tel" required value={subLeader.contact}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                if (value.length <= 10) {
                                  const updated = [...subLeaders];
                                  updated[index].contact = value;
                                  setSubLeaders(updated);
                                }
                              }} placeholder="10 digit number"
                              style={{...styles.input, ...(subLeader.contact && !validateContact(subLeader.contact) ? 
                                {borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.05)'} : 
                                subLeader.contact && validateContact(subLeader.contact) ? 
                                {borderColor: '#50c878', background: 'rgba(80,200,120,0.05)'} : {})}} />
                          </div>
                          <div style={styles.inputWrap}>
                            <label style={styles.label}>Email *</label>
                            <input type="email" required value={subLeader.email}
                              onChange={(e) => {
                                const updated = [...subLeaders];
                                updated[index].email = e.target.value;
                                setSubLeaders(updated);
                              }} placeholder="name@kongu.edu"
                              style={{...styles.input, ...(subLeader.email && !validateEmail(subLeader.email) ? 
                                {borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.05)'} : 
                                subLeader.email && validateEmail(subLeader.email) ? 
                                {borderColor: '#50c878', background: 'rgba(80,200,120,0.05)'} : {})}} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>
                )}

                {teamLimits.max > 1 && (
                  <section style={{marginBottom: '2.5rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                        <FaUsers style={{color: '#87ceeb', fontSize: '1.5rem'}} />
                        <h3 style={{color: 'white', fontSize: '1.3rem', margin: 0}}>
                          Team Members <span style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400}}>(Optional)</span>
                        </h3>
                      </div>
                      {currentTeamSize < teamLimits.max && (
                        <button type="button" onClick={() => setTeamMembers([...teamMembers, {
                          firstName: '', lastName: '', rollNo: '', department: '', year: ''
                        }])} style={{display: 'flex', alignItems: 'center', gap: '0.5rem',
                          background: 'linear-gradient(135deg, #50c878, #228b22)', color: 'white', border: 'none',
                          padding: '0.625rem 1.25rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '600',
                          cursor: 'pointer'}}>
                          <FaPlus /> Add Member
                        </button>
                      )}
                    </div>
                    
                    {teamMembers.map((member, index) => (
                      <div key={index} style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px', padding: '1.5rem', marginBottom: '1.25rem'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                          <h4 style={{color: '#ffd700', fontSize: '1.1rem', margin: 0}}>Team Member {index + 1}</h4>
                          <button type="button" onClick={() => setTeamMembers(teamMembers.filter((_, i) => i !== index))}
                            style={{background: 'linear-gradient(135deg, #ff6b6b, #dc143c)', color: 'white', border: 'none',
                              padding: '0.5rem', borderRadius: '10px', width: '40px', height: '40px', display: 'flex',
                              alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                            <FaTrash />
                          </button>
                        </div>
                        <div style={styles.grid}>
                          <div style={styles.inputWrap}>
                            <label style={styles.label}>First Name *</label>
                            <input type="text" required value={member.firstName}
                              onChange={(e) => {
                                const updated = [...teamMembers];
                                updated[index].firstName = e.target.value;
                                setTeamMembers(updated);
                              }} placeholder="Enter first name" style={styles.input} />
                          </div>
                          <div style={styles.inputWrap}>
                            <label style={styles.label}>Last Name *</label>
                            <input type="text" required value={member.lastName}
                              onChange={(e) => {
                                const updated = [...teamMembers];
                                updated[index].lastName = e.target.value;
                                setTeamMembers(updated);
                              }} placeholder="Enter last name" style={styles.input} />
                          </div>
                          <div style={styles.inputWrap}>
                            <label style={styles.label}>Roll Number *</label>
                            <input type="text" required value={member.rollNo}
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
                              }} placeholder="e.g., 23CS123"
                              style={{...styles.input, ...(member.rollNo && !validateRollNo(member.rollNo) ? 
                                {borderColor: '#ff6b6b', background: 'rgba(255,107,107,0.05)'} : {})}} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>
                )}

                <div style={{textAlign: 'center', marginTop: '2.5rem', paddingTop: '2rem', 
                  borderTop: '2px solid rgba(255,255,255,0.1)'}}>
                  <button type="submit" disabled={isSubmitting || !isFormValid()}
                    style={{background: isFormValid() ? 'linear-gradient(135deg, #ffd700, #ff8c00)' : '#666',
                      color: isFormValid() ? '#1a365d' : '#999', border: 'none', padding: '1rem 3rem',
                      borderRadius: '14px', fontSize: '1.1rem', fontWeight: '700', cursor: isFormValid() ? 'pointer' : 'not-allowed',
                      display: 'inline-flex', alignItems: 'center', gap: '0.75rem', minWidth: '250px',
                      justifyContent: 'center', opacity: isFormValid() ? 1 : 0.5}}>
                    {isSubmitting ? (
                      <>
                        <span style={{width: '20px', height: '20px', border: '3px solid rgba(26,54,93,0.3)',
                          borderTopColor: '#1a365d', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}></span>
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

const styles = {
  page: {minHeight: '100vh', background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #1a5f7a 100%)', 
    padding: '1.5rem', fontFamily: "'Inter', sans-serif"},
  progressOverlay: {position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10002},
  progressCard: {background: 'white', borderRadius: '20px', padding: '2rem', textAlign: 'center', minWidth: '250px'},
  popup: {position: 'fixed', top: '20px', right: '20px', background: 'linear-gradient(135deg, #50c878, #228b22)',
    color: 'white', padding: '20px 25px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(80,200,120,0.4)',
    zIndex: 10000, minWidth: '320px', maxWidth: '420px'},
  popupClose: {position: 'absolute', top: '-10px', right: '-10px', background: 'rgba(255,255,255,0.2)', border: 'none',
    color: 'white', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center'},
  popupBtn: {display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25d366', color: 'white',
    padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600'},
  errorPopup: {position: 'fixed', top: '20px', right: '20px', background: 'linear-gradient(135deg, #ff6b6b, #dc143c)',
    color: 'white', padding: '25px 30px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(255,107,107,0.5)',
    zIndex: 10001, minWidth: '350px', maxWidth: '450px'},
  thankYouContainer: {minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #1a5f7a 100%)', padding: '2rem'},
  thankYouCard: {background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(30px)', borderRadius: '30px',
    padding: '3rem', maxWidth: '650px', width: '100%', border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.3)'},
  successTitle: {color: 'white', fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', margin: '0 0 0.5rem 0'},
  successSubtitle: {color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontSize: '1.1rem', margin: '0 0 2rem 0'},
  registrationIdShowcase: {background: 'linear-gradient(135deg, #4169e1, #1a5f7a)', borderRadius: '20px',
    padding: '2rem', textAlign: 'center', marginBottom: '2rem'},
  idLabel: {display: 'block', color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: '600',
    marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px'},
  regIdBox: {background: 'rgba(255,255,255,0.15)', borderRadius: '15px', padding: '1.25rem', fontSize: '2.5rem',
    fontWeight: '800', color: '#ffd700', fontFamily: "'Courier New', monospace", letterSpacing: '4px',
    marginBottom: '1rem', border: '2px solid rgba(255,215,0,0.3)'},
  idNote: {color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: 0},
  eventSummary: {background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '1.5rem', marginBottom: '2rem'},
  statBox: {background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '0.75rem 1.5rem', display: 'flex',
    alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: '600'},
  btnWhatsapp: {background: 'linear-gradient(135deg, #25d366, #128c7e)', color: 'white', textDecoration: 'none',
    padding: '1rem 2rem', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
    fontWeight: '600', fontSize: '1rem'},
  btnBackHome: {background: 'linear-gradient(135deg, #4169e1, #1a5f7a)', color: 'white', border: 'none',
    padding: '1rem 2rem', borderRadius: '14px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer'},
  header: {maxWidth: '1400px', margin: '0 auto 2rem', background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex', alignItems: 'center', gap: '1.5rem'},
  btnBack: {display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #4169e1, #1a5f7a)',
    color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', cursor: 'pointer',
    fontWeight: '600', fontSize: '0.95rem'},
  title: {color: 'white', fontSize: '2rem', fontWeight: '700', margin: '0 0 0.5rem 0'},
  desc: {color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '1rem'},
  container: {maxWidth: '1400px', margin: '0 auto'},
  layout: {display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', alignItems: 'start'},
  sidebar: {position: 'sticky', top: '1.5rem'},
  card: {background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '1.5rem',
    border: '1px solid rgba(255,255,255,0.1)', color: 'white'},
  badge: {background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '0.75rem', textAlign: 'center',
    border: '2px solid rgba(255,255,255,0.1)'},
  badgeLabel: {display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px',
    opacity: 0.7, marginBottom: '0.25rem'},
  badgeValue: {display: 'block', fontSize: '1.5rem', fontWeight: '700', color: '#ffd700'},
  alert: {padding: '0.75rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '600', textAlign: 'center'},
  main: {minHeight: '500px'},
  formCard: {background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: '20px',
    padding: '2rem', border: '1px solid rgba(255,255,255,0.1)'},
  grid: {display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem'},
  inputWrap: {display: 'flex', flexDirection: 'column', gap: '0.5rem'},
  label: {color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', fontWeight: '600'},
  input: {width: '100%', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.08)',
    border: '2px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem',
    transition: 'all 0.3s ease', fontFamily: 'inherit'}
};

export default ERegistrationForm;