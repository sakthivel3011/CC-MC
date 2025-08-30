import React, { useState, useEffect } from 'react';
import OnamPNG from '../assets/images/Onam/O1.png'; // Add your PNG path here
import '../assets/styles/OnamEventForm.css';
import AOS from 'aos';

const OnamEventForm = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [rulesChecked, setRulesChecked] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(true);
  const [tugCategory, setTugCategory] = useState('');
  const [teamMembers, setTeamMembers] = useState([{ name: '', rollNo: '', dept: '', year: '', phone: '', email: '', malayalamStudent: false }]);
  const [teamId, setTeamId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usedTeamIds, setUsedTeamIds] = useState([]);
  const [eventFull, setEventFull] = useState(false);

  const events = [
  { id: 'pookkolam', name: 'Pookkolam', minMembers: 4, maxMembers: 4, maxTeams: 40 },
  { id: 'fashionParade', name: 'Fashion Parade', minMembers: 5, maxMembers: 5, maxTeams: 20 },
  { id: 'tugOfWar', name: 'Tug of War', minMembers: 7, maxMembers: 7, maxTeams: 20, categories: ['Boys', 'Girls'] },
  { id: 'dualDance', name: 'Dual Dance', minMembers: 2, maxMembers: 2, maxTeams: 30 }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  // Function to generate a unique team ID
  const generateUniqueTeamId = (eventCode) => {
    const randomNum = Math.floor(100 + Math.random() * 900); // random 3-digit number (100-999)
    const newTeamId = `${eventCode}-${randomNum}`;
    
    // Check if this ID is already used
    if (usedTeamIds.includes(newTeamId)) {
      // If used, generate a new one recursively
      return generateUniqueTeamId(eventCode);
    }
    
    return newTeamId;
  };

  useEffect(() => {
    if (selectedEvent) {
      const eventObj = events.find(e => e.id === selectedEvent);
      const eventCode = eventObj ? eventObj.name.slice(0, 3).toUpperCase() : selectedEvent.slice(0, 3).toUpperCase();
      const newTeamId = generateUniqueTeamId(eventCode);
      setTeamId(newTeamId);
      setUsedTeamIds([...usedTeamIds, newTeamId]);
      checkEventCapacity(selectedEvent);
      if (selectedEvent === 'tugOfWar') setTugCategory('');
    }
  }, [selectedEvent]);

  const checkEventCapacity = async (eventId) => {
    try {
      // Replace with your Google Apps Script Web App URL for checking capacity
      const scriptURL = 'https://script.google.com/macros/s/AKfycbznnJ4n8UvOPiyivsLyQS2ewlzqhCqD4Hss0Yu2dCOedvdrUQ1HVjkYNnSZH-1inrAWAQ/exec';
      
      const response = await fetch(`${scriptURL}?event=${eventId}&action=checkCapacity`);
      const data = await response.json();
      
      if (data.isFull) {
        setEventFull(true);
      } else {
        setEventFull(false);
      }
    } catch (error) {
      console.error('Error checking event capacity:', error);
      setEventFull(false);
    }
  };

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    setSelectedEvent(eventId);
    const selectedEventObj = events.find(event => event.id === eventId);
    if (selectedEventObj) {
      const initialMembers = Array(selectedEventObj.minMembers).fill().map(() => (
        { name: '', rollNo: '', dept: '', year: '', phone: '', email: '', malayalamStudent: false }
      ));
      setTeamMembers(initialMembers);
    }
    if (eventId === 'tugOfWar') setTugCategory('');
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const addMember = () => {
    const selectedEventObj = events.find(event => event.id === selectedEvent);
    if (selectedEventObj && teamMembers.length < selectedEventObj.maxMembers) {
      setTeamMembers([...teamMembers, { name: '', rollNo: '', dept: '', year: '', phone: '', email: '', malayalamStudent: false }]);
    }
  };

  const removeMember = (index) => {
    const selectedEventObj = events.find(event => event.id === selectedEvent);
    if (selectedEventObj && teamMembers.length > selectedEventObj.minMembers) {
      const updatedMembers = [...teamMembers];
      updatedMembers.splice(index, 1);
      setTeamMembers(updatedMembers);
    }
  };

  const showNotification = (message, isSuccess = true) => {
    const notification = document.createElement('div');
    notification.className = `submit-notification ${isSuccess ? 'success' : 'error'}`;
    notification.innerHTML = `
      <div class="notification-content">
        <h3>${isSuccess ? 'Success!' : 'Error!'}</h3>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (eventFull) {
      showNotification('This event is full. Registration is closed.', false);
      return;
    }
    
    setIsSubmitting(true);
    
    // Validation
    const invalidEmail = teamMembers.some(member => 
      member.email && !/^([a-zA-Z0-9._%+-]+)@kongu\.edu$/.test(member.email)
    );
    if (invalidEmail) {
      showNotification('All email addresses must be kongu.edu emails.', false);
      setIsSubmitting(false);
      return;
    }
    // Check if all required fields are filled
    const incompleteFields = teamMembers.some(member => 
      !member.name || !member.rollNo || !member.dept || !member.year
    );
    if (incompleteFields) {
      showNotification('Please fill all required fields for all team members.', false);
      setIsSubmitting(false);
      return;
    }
    // Prevent duplicate registration for same event by same student
    const rollNos = teamMembers.map(m => m.rollNo);
    if (new Set(rollNos).size !== rollNos.length) {
      showNotification('Same student cannot register twice for the same event.', false);
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for Google Apps Script
      const formData = {
        event: selectedEvent,
        teamId: teamId,
        teamMembers: teamMembers,
        timestamp: new Date().toISOString()
      };

      // Replace with your Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbznnJ4n8UvOPiyivsLyQS2ewlzqhCqD4Hss0Yu2dCOedvdrUQ1HVjkYNnSZH-1inrAWAQ/exec';
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Since we're using no-cors, we can't read the response
      // But we assume it worked if we got here
      showNotification(`Registration Successful! Your Team ID: ${teamId}.`);
      
      // Reset form
      setSelectedEvent('');
      setTeamMembers([{ name: '', rollNo: '', dept: '', year: '', phone: '', email: '' }]);
      setTeamId('');
      
    } catch (error) {
      console.error('Error:', error);
      showNotification('There was an error submitting your registration. Please try again.', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="onam-event-container">
      {/* Onam PNG image at the top */}

      <div className="onam-form-heading">
        <h1 style={{color: '#fff', fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginTop: '45px', marginBottom: '10px', letterSpacing: '2px', textShadow: '2px 2px 8px #b30000'}}>Onam Registration Form</h1>
      </div>
      <div className="onam-theme-img" style={{textAlign: 'right', marginBottom: '1px', marginTop: '-12px'}}>
        <img src={OnamPNG} alt="Onam Theme" style={{maxWidth: '30%', height: 'auto', borderRadius: '16px'}} />
      </div>
      {/* Rules Modal */}
        {showRulesModal && (
        <div className="rules-modal" style={{position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.6)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{background:'#fff', padding:'32px', borderRadius:'16px', maxWidth:'600px', width:'90%', boxShadow:'0 2px 16px rgba(0,0,0,0.2)'}}>
            <h2 style={{color:'#fd2600'}}>Onam Event Rules</h2>
            <ul style={{margin:'16px 0', paddingLeft:'20px', color:'#222', fontSize:'1rem'}}>
              <li>All students must strictly follow the dress code (Traditional attire is encouraged).</li>
              <li>Students must carry their College ID cards during the event.</li>
              <li>Misbehavior (inside or outside the venue) will cancel OD and attendance for that student.</li>
              <li>Follow the instructions given by event coordinators and faculty.</li>
            </ul>
            <div style={{marginTop:'24px'}}>
              <label style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <input type="checkbox" checked={rulesChecked} onChange={e => setRulesChecked(e.target.checked)} />
                <span style={{color:'#222'}}>I have read and agree to the rules</span>
              </label>
            </div>
            <button
              style={{marginTop:'24px', padding:'10px 24px', background:'#fd2600', color:'#fff', border:'none', borderRadius:'8px', fontWeight:'bold', cursor: rulesChecked ? 'pointer' : 'not-allowed'}}
              disabled={!rulesChecked}
              onClick={() => { setShowRulesModal(false); setShowForm(true); }}
            >
              Proceed to Registration
            </button>
          </div>
        </div>
      )}
      {/* Registration Form */}
      {showForm && (
        <form className="onam-event-form" onSubmit={handleSubmit} data-aos="fade-up">
          <div className="form-section" data-aos="fade-right">
            <h2>Step 1: Select Event</h2>
            <div className="event-options">
              {events.map(event => (
                <div key={event.id} className="event-option" data-aos="zoom-in" data-aos-delay={events.indexOf(event) * 100}>
                  <input
                    type="radio"
                    id={event.id}
                    name="event"
                    value={event.id}
                    checked={selectedEvent === event.id}
                    onChange={handleEventChange}
                    disabled={eventFull && selectedEvent !== event.id}
                  />
                  <label htmlFor={event.id} className="event-label">
                    <span className="event-name">{event.name}</span>
                  </label>
                </div>
              ))}
            </div>
            {/* Tug of War category selector */}
            {selectedEvent === 'tugOfWar' && (
              <div className="form-section" data-aos="fade-right" style={{marginTop:'16px', display:'flex', alignItems:'center', gap:'16px'}}>
                <span style={{fontWeight:'bold', fontSize:'1.2rem', color:'#fd2600ff'}}>Category:</span>
                <select value={tugCategory} onChange={e => setTugCategory(e.target.value)} required style={{fontWeight:'bold', fontSize:'1.1rem', padding:'6px 12px', borderRadius:'8px', border:'2px solid #fd2600ff', color:'#222', background:'#fff'}}>
                  <option value="">Select Category</option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                </select>
              </div>
            )}
          </div>
          {selectedEvent && (
            <>
              {eventFull ? (
                <div className="form-section" data-aos="fade-right" data-aos-delay="200">
                  <div className="event-full-message">
                    <h3>Registration Closed</h3>
                    <p>This event has reached its maximum capacity of {events.find(e => e.id === selectedEvent).maxTeams} teams.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="form-section" data-aos="fade-right" data-aos-delay="200">
                    <h2>Step 2: Team Information</h2>
                    <div className="team-id-display">
                      <span className="team-id-label">Team ID:</span>
                      <span className="team-id-value">{teamId}</span>
                      <span className="team-id-note">(Automatically generated)</span>
                    </div>
                  </div>
                  <div className="form-section" data-aos="fade-right" data-aos-delay="300">
                    <h2>Step 3: Team Members</h2>
                    <div className="members-info-card">
                      <div className="info-icon">ℹ️</div>
                      <p style={{fontWeight:'bold', color:'#fd2600ff'}}>
                        {selectedEvent === 'pookkolam' && 'All flowers must be brought by participants. Sticking materials are not allowed.'}
                        {selectedEvent === 'fashionParade' && 'All costumes must be brought by participants. Onam theme only dress should be followed.'}
                        {selectedEvent === 'tugOfWar' && 'Please enter details for all 7 team members. Select Boys/Girls category.'}
                        {selectedEvent === 'dualDance' && 'Enter details of both members. Only Malayalam songs allowed. Teams must be only boys or only girls.'}
                      </p>
                    </div>
                    <div className="members-container">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="member-card" data-aos="flip-up" data-aos-delay={index * 100}>
                          <div className="member-header">
                            <h3>Member {index + 1}</h3>
                            {teamMembers.length > events.find(e => e.id === selectedEvent).minMembers && (
                              <button 
                                type="button" 
                                className="remove-member-btn"
                                onClick={() => removeMember(index)}
                                title="Remove member"
                              >
                                ×
                              </button>
                            )}
                          </div>
                          <div className="member-fields">
                            <div className="form-row">
                              <div className="input-group">
                                <label htmlFor={`name-${index}`}>Name </label>
                                <input
                                  type="text"
                                  id={`name-${index}`}
                                  value={member.name}
                                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                  required
                                  placeholder="Enter full name"
                                />
                              </div>
                              <div className="input-group">
                                <label htmlFor={`rollNo-${index}`}>Roll Number </label>
                                <input
                                  type="text"
                                  id={`rollNo-${index}`}
                                  value={member.rollNo}
                                  onChange={(e) => handleMemberChange(index, 'rollNo', e.target.value)}
                                  required
                                  placeholder="Enter roll number"
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="input-group">
                                <label htmlFor={`malayalamStudent-${index}`}>Malayalam student</label>
                                <select
                                  id={`malayalamStudent-${index}`}
                                  value={member.malayalamStudent ? 'yes' : 'no'}
                                  onChange={(e) => handleMemberChange(index, 'malayalamStudent', e.target.value === 'yes')}
                                >
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="input-group">
                                <label htmlFor={`dept-${index}`}>Department </label>
                                <select
                                  id={`dept-${index}`}
                                  value={member.dept}
                                  onChange={(e) => handleMemberChange(index, 'dept', e.target.value)}
                                  required
                                >
                                  <option value="">Select Department</option>
                                  <option value="AIDS">AIDS</option>
                                  <option value="AIML">AIML</option>
                                  <option value="CSE">CSE</option>
                                  <option value="AUTO">AUTO</option>
                                  <option value="CHEM">CHEM</option>
                                  <option value="FT">FT</option>
                                  <option value="CIVIL">CIVIL</option>
                                  <option value="CSD">CSD</option>
                                  <option value="IT">IT</option>
                                  <option value="EEE">EEE</option>
                                  <option value="EIE">EIE</option>
                                  <option value="ECE">ECE</option>
                                  <option value="MECH">MECH</option>
                                  <option value="MTS">MTS</option>
                                  <option value="MSC">MSC</option>
                                  <option value="MCA">MCA</option>
                                  <option value="MBA">MBA</option>
                                  <option value="BSC">BSC</option>
                                  <option value="ME">ME</option>
                                  <option value="ARCH">ARCH</option>
                                </select>
                              </div>
                              <div className="input-group">
                                <label htmlFor={`year-${index}`}>Year </label>
                                <select
                                  id={`year-${index}`}
                                  value={member.year}
                                  onChange={(e) => handleMemberChange(index, 'year', e.target.value)}
                                  required
                                >
                                  <option value="">Select Year</option>
                                  <option value="1">First Year</option>
                                  <option value="2">Second Year</option>
                                  <option value="3">Third Year</option>
                                  <option value="4">Fourth Year</option>
                                  <option value="5">Fifth Year</option>
                                </select>
                              </div>
                            </div>
                            {(index < 2) && (
                              <div className="form-row">
                                <div className="input-group">
                                  <label htmlFor={`phone-${index}`}>Contact Number </label>
                                  <input
                                    type="tel"
                                    id={`phone-${index}`}
                                    value={member.phone}
                                    onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                                    required
                                    placeholder="Enter phone number"
                                  />
                                </div>
                                <div className="input-group">
                                  <label htmlFor={`email-${index}`}>Email Address </label>
                                  <input
                                    type="email"
                                    id={`email-${index}`}
                                    value={member.email}
                                    onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                    required
                                    placeholder="example@kongu.edu"
                                    pattern="^[a-zA-Z0-9._%+-]+@kongu\.edu$"
                                    title="Only kongu.edu email addresses are allowed"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {teamMembers.length < events.find(e => e.id === selectedEvent).maxMembers && (
                      <button 
                        type="button" 
                        className="add-member-btn"
                        onClick={addMember}
                        data-aos="zoom-in"
                      >
                        <span>+ Add Another Member</span>
                        <span className="member-count">({teamMembers.length}/{events.find(e => e.id === selectedEvent).maxMembers})</span>
                      </button>
                    )}
                  </div>
                  <div className="whatsapp-group-section" style={{marginTop: '32px', textAlign: 'center'}}>
                    <h2 style={{color: '#fd2600ff'}}>Join Our WhatsApp Group</h2>
                    <p style={{color: '#000'}}>Stay updated and connect with other participants!</p>
                    <button
                      type="button"
                      style={{display: 'inline-block', padding: '10px 20px', background: '#25D366', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}
                      onClick={() => window.open('https://chat.whatsapp.com/EWEZ9f2vp6jG7l6hXIbcLV?mode=ems_copy_t', '_blank')}
                    >
                      Join WhatsApp Group
                    </button>
                  </div>
                  <button 
                    type="submit" 
                    className="submit-btn" 
                    data-aos="zoom-in" 
                    data-aos-delay="400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Step 4: Submit Registration'}
                  </button>
                </>
              )}
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default OnamEventForm;