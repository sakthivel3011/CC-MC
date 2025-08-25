import React, { useState, useEffect } from 'react';
import '../assets/styles/OnamEventForm.css';
import AOS from 'aos';

const OnamEventForm = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [teamMembers, setTeamMembers] = useState([{ name: '', rollNo: '', dept: '', year: '', phone: '', email: '' }]);
  const [teamId, setTeamId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const events = [
    { id: 'dualDance', name: 'Dual Dance', minMembers: 2, maxMembers: 2 },
    { id: 'pookkolam', name: 'Pookkolam', minMembers: 3, maxMembers: 5 },
    { id: 'rangoli', name: 'Rangoli', minMembers: 3, maxMembers: 5 },
    { id: 'groupSing', name: 'Group Singing', minMembers: 3, maxMembers: 5 }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const teamIdCounters = React.useRef({});
  
  useEffect(() => {
      if (selectedEvent) {
        const eventObj = events.find(e => e.id === selectedEvent);
        const eventCode = eventObj ? eventObj.name.slice(0, 3).toUpperCase() : selectedEvent.slice(0, 3).toUpperCase();
        const randomNum = Math.floor(100 + Math.random() * 900); // random 3-digit number (100-999)
        setTeamId(`${eventCode}-${randomNum}`);
      }
    }, [selectedEvent]);

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    setSelectedEvent(eventId);
    
    const selectedEventObj = events.find(event => event.id === eventId);
    if (selectedEventObj) {
      const initialMembers = Array(selectedEventObj.minMembers).fill().map(() => (
        { name: '', rollNo: '', dept: '', year: '', phone: '', email: '' }
      ));
      setTeamMembers(initialMembers);
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const addMember = () => {
    const selectedEventObj = events.find(event => event.id === selectedEvent);
    if (selectedEventObj && teamMembers.length < selectedEventObj.maxMembers) {
      setTeamMembers([...teamMembers, { name: '', rollNo: '', dept: '', year: '', phone: '', email: '' }]);
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

    try {
      // Prepare data for Google Apps Script
      const formData = {
        event: selectedEvent,
        teamId: teamId,
        teamMembers: teamMembers,
        timestamp: new Date().toISOString()
      };

      // Replace with your Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbw6-2qt0YJfjk_x-prqtNNgue5Rv7bE8oV3e4GAAObNmqRV-OIOAVhyGc58jGLLIOF7/exec';
      
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
      showNotification(`Registration Successful! Your Team ID: ${teamId}. Confirmation email sent to team members.`);
      
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
      <div className="onam-header" data-aos="fade-down">
        <h1>Onam Festival Events</h1>
        <div className="pookalam-decoration">
          <div className="pookalam-base">
            <div className="pookalam-petal"></div>
            <div className="pookalam-petal"></div>
            <div className="pookalam-petal"></div>
            <div className="pookalam-petal"></div>
            <div className="pookalam-petal"></div>
            <div className="pookalam-petal"></div>
          </div>
          <div className="pookalam-center"></div>
        </div>
        <p>Register your team for the glorious Onam celebrations</p>
      </div>

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
                />
                <label htmlFor={event.id} className="event-label">
                  <span className="event-name">{event.name}</span>
                  <span className="event-details">({event.minMembers}-{event.maxMembers} members)</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {selectedEvent && (
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
                <p>
                  {selectedEvent === 'dualDance' && 'Please enter details for both team members (All details required) & Only Malayalam Songs are allowed.'}
                  {(selectedEvent === 'pookkolam' || selectedEvent === 'rangoli' || selectedEvent === 'groupSing') && 
                    'Please enter details for 3-5 team members (First 2 members require all details, others need basic info &  for Dance and Songs Only Malayalam Songs are allowed.)'}
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
      </form>
    </div>
  );
};

export default OnamEventForm;