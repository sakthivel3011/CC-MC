import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaMusic, FaWhatsapp, FaGoogleDrive, FaUserFriends, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
import '../assets/styles/RaagaRegistration.css';

// Main Component
const RaagaRegistration = () => {
  return (
    <div className="raaga-container">
      <RegistrationForm />
    </div>
  );
};

// Popup Component
const Popup = ({ message }) => {
  return (
    <div className="popup">
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
  const [nextId, setNextId] = useState(1);

  const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const rules = [
    "Each performance should not exceed 5 minutes",
    "Participants must bring their own instruments (if any)",
    "Background music should be in audio format only",
    "Obscene or offensive content will lead to disqualification",
    "Decision of judges will be final and binding",
    "Participants must report 30 minutes before the event"
  ];

  // Fetch the next available ID from Google Sheets
  useEffect(() => {
    const fetchNextId = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzgGH1dSOO9NDjQQJY92os2V0TtQGoPnCJp09IZKglNBaAbGLaBq6jwDzhBdHkTDHDT1A/exec');
        const text = await response.text();
        const data = JSON.parse(text);
        setNextId(data.nextId || 1);
      } catch (error) {
        console.error('Error fetching next ID:', error);
        // Start from 1 if there's an error
        setNextId(1);
      }
    };
    
    fetchNextId();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'email') {
      if (value && !value.endsWith('@kongu.edu')) {
        setErrors(prevErrors => ({ ...prevErrors, email: 'Email must be a kongu.edu address.' }));
      } else if (errors.email) {
        setErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors.email;
          return newErrors;
        });
      }
    }
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

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.rollNo) newErrors.rollNo = 'Roll No is required.';
    if (!formData.year) newErrors.year = 'Year is required.';
    if (!formData.department) newErrors.department = 'Department is required.';
    if (!formData.email) {
        newErrors.email = 'Email is required.';
    } else if (!formData.email.endsWith('@kongu.edu')) {
        newErrors.email = 'Email must be a kongu.edu address.';
    }
    if (!formData.phone) newErrors.phone = 'Phone No is required.';
    if (!formData.driveLink) newErrors.driveLink = 'Google Drive Audio Link is required.';

    if (eventType === 'group') {
        const groupErrors = [];
        groupMembers.forEach((member, index) => {
            const memberErrors = {};
            if (!member.name) memberErrors.name = 'Name is required.';
            if (!member.rollNo) memberErrors.rollNo = 'Roll No is required.';
            if (!member.year) memberErrors.year = 'Year is required.';
            if (!member.department) memberErrors.department = 'Department is required.';
            if (Object.keys(memberErrors).length > 0) {
                groupErrors[index] = memberErrors;
            }
        });
        if (groupErrors.length > 0) {
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
        return;
    }
    setErrors({});
    
    setIsSubmitting(true);

    // Generate sequential ID
    const idNumber = nextId.toString().padStart(3, '0');
    const newRegistrationId = eventType === 'solo'
      ? `SOLO-RAS-${idNumber}`
      : `GROUP-RAG-${idNumber}`;
    
    const submissionData = {
      eventType,
      formData,
      groupMembers: eventType === 'group' ? groupMembers : [],
      registrationId: newRegistrationId,
      timestamp: new Date().toISOString()
    };

    try {
      // Use a proxy to avoid CORS issues
      const response = await fetch('https://corsproxy.io/?https://script.google.com/macros/s/AKfycbzgGH1dSOO9NDjQQJY92os2V0TtQGoPnCJp09IZKglNBaAbGLaBq6jwDzhBdHkTDHDT1A/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      const responseData = await response.json();
      
      if (responseData.result === "success") {
        console.log('Data submitted to Google Sheets');
        setRegistrationId(responseData.registrationId);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          setSubmitted(true);
          // Update the next ID for next registration
          setNextId(responseData.nextId);
        }, 4000);
      } else {
        console.error('Error from server:', responseData.error);
        alert('Registration failed: ' + responseData.error);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Registration failed. Please try again.');
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
            <h3><FaWhatsapp /> Join our WhatsApp Group for updates</h3>
            <a 
              href="https://chat.whatsapp.com/your-actual-link" 
              className="whatsapp-link-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> Join WhatsApp Group <FaExternalLinkAlt />
            </a>
            <p className="note">After joining, send your registration ID to the group admin</p>
          </div>
          
          <div className="see-you">
            <h3>We'll see you at Raaga!</h3>
            <p>Get ready to showcase your talent</p>
          </div>
          
          <button onClick={() => setSubmitted(false)} className="register-another-btn">
            Register Another Participant
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showPopup && <Popup message={`Registration successful! Your ID is ${registrationId}`} />}
      
      <header className="raaga-header">
        <div className="header-content">
          <h1 className="raaga-title">RAAGA</h1>
          <p className="event-subtitle">KEC Music Event</p>
          <div className="decoration-mic"><FaMicrophone /></div>
          <div className="decoration-music"><FaMusic /></div>
        </div>
      </header>

      <div className="registration-container">
        <div className="event-image-section">
          <div className="image-placeholder">
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

        <div className="registration-form">
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
                    placeholder="Enter your roll number"
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
                    className={formData.year ? 'selected' : ''}
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
                    className={formData.department ? 'selected' : ''}
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
                    placeholder="Enter your phone number"
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
                        />
                        {errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].name && <p className="form-error">{errors.groupMembers[index].name}</p>}
                      </div>
                      <div className="form-group">
                        <label>Roll No *</label>
                        <input
                          type="text"
                          name="rollNo"
                          value={member.rollNo}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          placeholder="Enter roll number"
                        />
                        {errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].rollNo && <p className="form-error">{errors.groupMembers[index].rollNo}</p>}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Year *</label>
                        <select
                          name="year"
                          value={member.year}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          className={member.year ? 'selected' : ''}
                        >
                          <option value="">Select Year</option>
                          {years.map((year, i) => (
                            <option key={i} value={year}>{year}</option>
                          ))}
                        </select>
                        {errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].year && <p className="form-error">{errors.groupMembers[index].year}</p>}
                      </div>
                      <div className="form-group">
                        <label>Department *</label>
                        <select
                          name="department"
                          value={member.department}
                          onChange={(e) => handleGroupMemberChange(index, e)}
                          className={member.department ? 'selected' : ''}
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept, i) => (
                            <option key={i} value={dept}>{dept}</option>
                          ))}
                        </select>
                        {errors.groupMembers && errors.groupMembers[index] && errors.groupMembers[index].department && <p className="form-error">{errors.groupMembers[index].department}</p>}
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
        <p>© 2023 KEC Raaga Music Event. All rights reserved.</p>
        <p>Contact: raaga@kongu.edu | Phone: +91 9876543210</p>
      </footer>
    </>
  );
};

export default RaagaRegistration;


 