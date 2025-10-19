import React, { useState } from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendarAlt, FaUsers, FaPlus, FaTrash, FaCheck, FaWhatsapp } from 'react-icons/fa';
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
      'Short Film': 'SHF'
    };
    return codes[eventName] || 'EVT';
  };

  // Generate registration ID
  const generateRegistrationId = async (eventName) => {
    const eventCode = getEventCode(eventName);
    
    // In real implementation, check Google Sheets for existing IDs
    // For now, simulate with random number generation
    const existingIds = ['001', '002', '003']; // Mock existing IDs from sheet
    
    let counter = 1;
    let newId;
    
    do {
      const numberPart = counter.toString().padStart(3, '0');
      newId = `${eventCode}${numberPart}`;
      counter++;
    } while (existingIds.includes(newId.slice(-3)));
    
    return newId;
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
        rollNo: ''
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

      // Prepare data for Google Sheets
      const registrationData = {
        registrationId: regId,
        event: event.name,
        eventId: event.id,
        timestamp: new Date().toISOString(),
        teamLeader,
        subLeaders,
        teamMembers,
        totalMembers: 1 + subLeaders.length + teamMembers.length
      };

      // Submit to Google Apps Script
      const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        // Show thank you message instead of alert
        setShowThankYou(true);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again or contact the coordinators.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation function
  const isFormValid = () => {
    const { name, rollNo, department, year, contact, email } = teamLeader;
    const basicInfoValid = name && rollNo && department && year && contact && email;
    const teamSizeValid = currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max;
    
    return basicInfoValid && teamSizeValid;
  };

  // Calculate total team members
  const totalMembers = currentTeamSize;

  // Thank You Page
  if (showThankYou) {
    return (
      <div className="thank-you-container">
        <div className="thank-you-card">
          <div className="success-icon">
            <FaCheck />
          </div>
          <h1>Registration Successful!</h1>
          <div className="registration-id-display">
            <span>Your Registration ID:</span>
            <div className="reg-id">{generatedId}</div>
          </div>
          
          <div className="event-details">
            <h3>{event.name}</h3>
            <p>Team Leader: {teamLeader.name}</p>
            <p>Total Members: {totalMembers}</p>
          </div>

          <div className="next-steps">
            <h4>What's Next?</h4>
            <ul>
              <li>Save your registration ID: <strong>{generatedId}</strong></li>
              <li>Join our WhatsApp group for updates</li>
              <li>Check event schedule and guidelines</li>
              <li>Prepare for your performance</li>
            </ul>
          </div>

          <div className="action-buttons">
            <a 
              href="https://chat.whatsapp.com/your-group-link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <FaWhatsapp />
              Join WhatsApp Group
            </a>
            <button onClick={onBack} className="back-home-btn">
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="eregistration-form-page">
      <div className="form-header">
        <button onClick={onBack} className="back-btn">
          <FaArrowLeft />
          Back to Events
        </button>
        <div className="event-info">
          <span className="event-icon">{event.icon}</span>
          <div>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
          </div>
        </div>
      </div>

      <div className="form-container">
        <div className="form-content">
          {/* Event Details */}
          <div className="event-details-card">
            <h3>Event Rules & Guidelines</h3>
            
            {/* Team Size Display */}
            <div className="team-size-info">
              <h4>Team Size Requirements</h4>
              <div className="size-display">
                <div className="size-limit">
                  <span className="label">Required:</span>
                  <span className="value">
                    {teamLimits.min === teamLimits.max 
                      ? `${teamLimits.min} member${teamLimits.min > 1 ? 's' : ''}`
                      : `${teamLimits.min}-${teamLimits.max} members`
                    }
                  </span>
                </div>
                <div className="current-size">
                  <span className="label">Current:</span>
                  <span className={`value ${currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max ? 'valid' : 'invalid'}`}>
                    {currentTeamSize} member{currentTeamSize > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              {/* Validation Messages */}
              {currentTeamSize < teamLimits.min && (
                <div className="validation-message error">
                  ⚠️ Need {teamLimits.min - currentTeamSize} more member{teamLimits.min - currentTeamSize > 1 ? 's' : ''}
                </div>
              )}
              {currentTeamSize > teamLimits.max && (
                <div className="validation-message error">
                  ❌ Exceeds limit by {currentTeamSize - teamLimits.max} member{currentTeamSize - teamLimits.max > 1 ? 's' : ''}
                </div>
              )}
              {currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max && (
                <div className="validation-message success">
                  ✅ Team size is perfect!
                </div>
              )}
            </div>

            <ul>
              {event.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
            
            <div className="coordinator-info">
              <h4>Event Coordinator</h4>
              <p><strong>{event.coordinator}</strong></p>
              <p><FaPhone /> {event.phone}</p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="registration-form-card">
            <h3>Registration Form</h3>
            <form onSubmit={handleSubmit}>
              {/* Team Leader Details */}
              <div className="form-section">
                <h4><FaUser /> Team Leader Details</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={teamLeader.name}
                      onChange={(e) => setTeamLeader({...teamLeader, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Roll Number *</label>
                    <input
                      type="text"
                      required
                      value={teamLeader.rollNo}
                      onChange={(e) => setTeamLeader({...teamLeader, rollNo: e.target.value})}
                      placeholder="Enter roll number"
                    />
                  </div>
                  <div className="form-group">
                    <label>Department *</label>
                    <select
                      required
                      value={teamLeader.department}
                      onChange={(e) => setTeamLeader({...teamLeader, department: e.target.value})}
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Chemical">Chemical</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Year *</label>
                    <select
                      required
                      value={teamLeader.year}
                      onChange={(e) => setTeamLeader({...teamLeader, year: e.target.value})}
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Contact Number *</label>
                    <input
                      type="tel"
                      required
                      value={teamLeader.contact}
                      onChange={(e) => setTeamLeader({...teamLeader, contact: e.target.value})}
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={teamLeader.email}
                      onChange={(e) => setTeamLeader({...teamLeader, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>

              {/* Sub Leaders Section (for group events) */}
              {teamLimits.max > 1 && (
                <div className="form-section">
                  <div className="section-header">
                    <h4><FaUsers /> Sub Leaders (Optional)</h4>
                    {currentTeamSize < teamLimits.max && (
                      <button type="button" onClick={addSubLeader} className="add-btn">
                        <FaPlus /> Add Sub Leader
                      </button>
                    )}
                  </div>
                  {subLeaders.map((subLeader, index) => (
                    <div key={index} className="team-member-card">
                      <div className="card-header">
                        <h5>Sub Leader {index + 1}</h5>
                        <button 
                          type="button" 
                          onClick={() => removeSubLeader(index)}
                          className="remove-btn"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Name *</label>
                          <input
                            type="text"
                            required
                            value={subLeader.name}
                            onChange={(e) => updateSubLeader(index, 'name', e.target.value)}
                            placeholder="Enter name"
                          />
                        </div>
                        <div className="form-group">
                          <label>Roll Number *</label>
                          <input
                            type="text"
                            required
                            value={subLeader.rollNo}
                            onChange={(e) => updateSubLeader(index, 'rollNo', e.target.value)}
                            placeholder="Enter roll number"
                          />
                        </div>
                        <div className="form-group">
                          <label>Contact Number *</label>
                          <input
                            type="tel"
                            required
                            value={subLeader.contact}
                            onChange={(e) => updateSubLeader(index, 'contact', e.target.value)}
                            placeholder="Enter contact number"
                          />
                        </div>
                        <div className="form-group">
                          <label>Email Address *</label>
                          <input
                            type="email"
                            required
                            value={subLeader.email}
                            onChange={(e) => updateSubLeader(index, 'email', e.target.value)}
                            placeholder="Enter email address"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Team Members Section */}
              {teamLimits.max > 1 && (
                <div className="form-section">
                  <div className="section-header">
                    <h4><FaUsers /> Team Members {teamLimits.min > 1 ? '(Required)' : '(Optional)'}</h4>
                    {currentTeamSize < teamLimits.max && (
                      <button type="button" onClick={addTeamMember} className="add-btn">
                        <FaPlus /> Add Team Member
                      </button>
                    )}
                  </div>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="team-member-card">
                      <div className="card-header">
                        <h5>Team Member {index + 1}</h5>
                        <button 
                          type="button" 
                          onClick={() => removeTeamMember(index)}
                          className="remove-btn"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Name *</label>
                          <input
                            type="text"
                            required
                            value={member.name}
                            onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                            placeholder="Enter name"
                          />
                        </div>
                        <div className="form-group">
                          <label>Roll Number *</label>
                          <input
                            type="text"
                            required
                            value={member.rollNo}
                            onChange={(e) => updateTeamMember(index, 'rollNo', e.target.value)}
                            placeholder="Enter roll number"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Team size guidance */}
                  {teamLimits.min > 1 && currentTeamSize < teamLimits.min && (
                    <div className="team-size-guidance">
                      <p className="guidance-text">
                        📝 This event requires a minimum of {teamLimits.min} members. 
                        Please add {teamLimits.min - currentTeamSize} more member{teamLimits.min - currentTeamSize > 1 ? 's' : ''} to proceed.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`submit-btn ${!isFormValid() ? 'disabled' : ''}`}
                  disabled={isSubmitting || !isFormValid()}
                >
                  {isSubmitting ? 'Registering...' : 
                   !isFormValid() && currentTeamSize < teamLimits.min ? `Add ${teamLimits.min - currentTeamSize} More Member${teamLimits.min - currentTeamSize > 1 ? 's' : ''}` :
                   !isFormValid() && currentTeamSize > teamLimits.max ? `Remove ${currentTeamSize - teamLimits.max} Member${currentTeamSize - teamLimits.max > 1 ? 's' : ''}` :
                   'Register for Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERegistrationForm;