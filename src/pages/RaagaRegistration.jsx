import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaMusic, FaWhatsapp, FaGoogleDrive, FaUserFriends, FaCheck, FaRegCheckCircle } from 'react-icons/fa';
import '../assets/styles/RaagaRegistration.css';

const RaagaRegistration = () => {
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

  const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  // Rules for the event
  const rules = [
    "Each performance should not exceed 5 minutes",
    "Participants must bring their own instruments (if any)",
    "Background music should be in audio format only",
    "Obscene or offensive content will lead to disqualification",
    "Decision of judges will be final and binding",
    "Participants must report 30 minutes before the event"
  ];

  useEffect(() => {
    // Generate registration ID based on event type
    const randomNum = Math.floor(100 + Math.random() * 900);
    if (eventType === 'solo') {
      setRegistrationId(`SOLO-RAS-${randomNum}`);
    } else {
      setRegistrationId(`GROUP-RAG-${randomNum}`);
    }
  }, [eventType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGroupMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...groupMembers];
    updatedMembers[index][name] = value;
    setGroupMembers(updatedMembers);
  };

  const addGroupMember = () => {
    if (groupMembers.length < 5) {
      setGroupMembers([...groupMembers, { name: '', rollNo: '', year: '', department: '' }]);
    }
  };

  const removeGroupMember = (index) => {
    if (groupMembers.length > 1) {
      const updatedMembers = [...groupMembers];
      updatedMembers.splice(index, 1);
      setGroupMembers(updatedMembers);
    }
  };

  // Google Apps Script endpoint URL
  const APPSCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"; // TODO: Replace with your actual Apps Script URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send
    const payload = {
      eventType,
      formData,
      groupMembers,
      registrationId
    };

    try {
      // Send data to Google Apps Script
      const response = await fetch(APPSCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // Simulate sending email and WhatsApp
        alert(`Registration Successful! Your ID: ${registrationId}\nDetails sent to your email and WhatsApp.`);
        setSubmitted(true);
      } else {
        alert("There was an error submitting your registration. Please try again.");
      }
    } catch (error) {
      alert("There was an error submitting your registration. Please check your connection and try again.");
      console.error(error);
    }
  };

  if (submitted) {
    return (
      <div className="registration-success" data-aos="fade-in">
        <div className="success-content">
          <div className="success-icon"><FaRegCheckCircle /></div>
          <h2>Registration Successful!</h2>
          <p>Your Registration ID: <strong>{registrationId}</strong></p>
          <p>Details have been sent to your email and WhatsApp.</p>
          <div className="whatsapp-section">
            <h3><FaWhatsapp /> Join our WhatsApp Group for updates</h3>
            <a href="#" className="whatsapp-link">https://chat.whatsapp.com/raaga-kec</a>
          </div>
          <button onClick={() => setSubmitted(false)}>Register Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="raaga-container">
      <header className="raaga-header" data-aos="fade-down">
        <div className="header-content">
          <h1 className="raaga-title">RAAGA</h1>
          <p className="event-subtitle">KEC Music Event</p>
          <div className="decoration-mic"><FaMicrophone /></div>
          <div className="decoration-music"><FaMusic /></div>
        </div>
      </header>

      <div className="registration-container">
        <div className="event-image-section" data-aos="fade-right">
          <div className="image-placeholder">
            <div className="music-icon">🎤</div>
            <h3>Show Your Talent!</h3>
            <p>Solo or Group singing competition</p>
            
            <div className="rules-section">
              <h4 onClick={() => setShowRules(!showRules)}>
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

        <div className="registration-form" data-aos="fade-left">
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

          <form onSubmit={handleSubmit}>
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Roll No *</label>
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Year *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className={formData.year ? 'selected' : ''}
                  >
                    <option value="">Select Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className={formData.department ? 'selected' : ''}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone No *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label><FaGoogleDrive /> Google Drive Audio Link *</label>
                <input
                  type="url"
                  name="driveLink"
                  placeholder="Paste your audio file drive link"
                  value={formData.driveLink}
                  onChange={handleInputChange}
                  required
                />
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
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Roll No *</label>
                        <input
                          type="text"
                          name="rollNo"
                          value={member.rollNo}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Year *</label>
                        <select
                          name="year"
                          value={member.year}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          required
                          className={member.year ? 'selected' : ''}
                        >
                          <option value="">Select Year</option>
                          {years.map((year, i) => (
                            <option key={i} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Department *</label>
                        <select
                          name="department"
                          value={member.department}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          required
                          className={member.department ? 'selected' : ''}
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept, i) => (
                            <option key={i} value={dept}>{dept}</option>
                          ))}
                        </select>
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

            <div className="id-display">
              <p>Your Registration ID: <strong>{registrationId}</strong></p>
              <small>This ID will be sent to your email and WhatsApp after submission</small>
            </div>

            <button type="submit" className="submit-btn">
              Register Now
            </button>
          </form>
        </div>
      </div>

      <footer className="raaga-footer">
        <p>© 2023 KEC Raaga Music Event. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RaagaRegistration;