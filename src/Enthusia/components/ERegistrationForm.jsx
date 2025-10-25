import React, { useState } from 'react';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendarAlt, FaUsers, FaPlus, FaTrash, FaCheck, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
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
      'Short Film': 'SHF',
      'Stand Up Comedy': 'SUC',
      'Anchoring': 'ANC',
    };
    return codes[eventName] || 'EVT';
  };

  // Generate registration ID
  const generateRegistrationId = async (eventName) => {
    const eventCode = getEventCode(eventName);
    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbwDd9NbTSUAsINIM0NAqQTRt7y68dl2WdQkGmVS3TP3Te2AwI80uBkDUWFDFgLZlKNE/exec?action=getIds&event=${encodeURIComponent(eventName)}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        const existingIds = data.ids || [];
        let counter = 1;
        let newId;
        
        do {
          const numberPart = counter.toString().padStart(2, '0');
          newId = `${eventCode}${numberPart}`;
          counter++;
        } while (existingIds.includes(newId));
        
        return newId;
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
      const regId = await generateRegistrationId(event.name);
      setGeneratedId(regId);

    // Format participants list including team leader and all members
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
        role: 'Member'
      }))
    ];      const registrationData = {
        registrationId: regId,
        name: teamLeader.name,
        email: teamLeader.email,
        phone: teamLeader.contact,
        department: teamLeader.department,
        year: teamLeader.year,
        rollNo: teamLeader.rollNo,
        college: 'Kongu Engineering College',
        event: {
          id: event.id,
          name: event.name,
          category: event.category,
          rules: event.rules
        },
        participants: participants,
        totalMembers: participants.length
      };

      const response = await fetch('https://script.google.com/macros/s/AKfycbwDd9NbTSUAsINIM0NAqQTRt7y68dl2WdQkGmVS3TP3Te2AwI80uBkDUWFDFgLZlKNE/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registrationData,
          formType: 'registration',
          eventCategory: event.category,
          eventRules: event.rules
        })
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setShowThankYou(true);
        setGeneratedId(regId);
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again or contact the coordinators.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email) => {
    return email.toLowerCase().endsWith('@kongu.edu');
  };

  const isFormValid = () => {
    const { name, rollNo, department, year, contact, email } = teamLeader;
    const basicInfoValid = name && rollNo && department && year && contact;
    const emailValid = email && validateEmail(email);
    const teamSizeValid = currentTeamSize >= teamLimits.min && currentTeamSize <= teamLimits.max;
    
    return basicInfoValid && emailValid && teamSizeValid;
  };

  const totalMembers = currentTeamSize;

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

          <div className="erf-next-steps-modern">
            <h4>What's Next?</h4>
            <div className="erf-steps-grid">
              <div className="erf-step-card">
                <span className="erf-step-number">1</span>
                <p>Save your registration ID</p>
              </div>
              <div className="erf-step-card">
                <span className="erf-step-number">2</span>
                <p>Join WhatsApp group</p>
              </div>
              <div className="erf-step-card">
                <span className="erf-step-number">3</span>
                <p>Check event schedule</p>
              </div>
              <div className="erf-step-card">
                <span className="erf-step-number">4</span>
                <p>Prepare your performance</p>
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
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={teamLeader.name}
                        onChange={(e) => setTeamLeader({...teamLeader, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="erf-input-modern"
                      />
                    </div>
                    
                    <div className="erf-input-wrapper">
                      <label>Roll Number *</label>
                      <input
                        type="text"
                        required
                        value={teamLeader.rollNo}
                        onChange={(e) => setTeamLeader({...teamLeader, rollNo: e.target.value})}
                        placeholder="Enter roll number"
                        className="erf-input-modern"
                      />
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
                      </select>
                    </div>
                    
                    <div className="erf-input-wrapper">
                      <label>Contact Number *</label>
                      <input
                        type="tel"
                        required
                        value={teamLeader.contact}
                        onChange={(e) => setTeamLeader({...teamLeader, contact: e.target.value})}
                        placeholder="Enter contact number"
                        className="erf-input-modern"
                      />
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
                          className={`erf-input-modern ${teamLeader.email && !validateEmail(teamLeader.email) ? 'erf-input-error' : ''}`}
                        />
                        {teamLeader.email && !validateEmail(teamLeader.email) && (
                          <div className="erf-input-error-message">
                            Please use your Kongu Engineering College email (@kongu.edu)
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
                        <h3>Sub Leaders <span className="erf-optional-tag">(Optional)</span></h3>
                      </div>
                      {currentTeamSize < teamLimits.max && (
                        <button type="button" onClick={addSubLeader} className="erf-btn-add-modern">
                          <FaPlus /> Add Sub Leader
                        </button>
                      )}
                    </div>
                    
                    {subLeaders.map((subLeader, index) => (
                      <div key={index} className="erf-member-card-modern">
                        <div className="erf-member-card-header">
                          <h4>Sub Leader {index + 1}</h4>
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
                            <label>Name *</label>
                            <input
                              type="text"
                              required
                              value={subLeader.name}
                              onChange={(e) => updateSubLeader(index, 'name', e.target.value)}
                              placeholder="Enter name"
                              className="erf-input-modern"
                            />
                          </div>
                          <div className="erf-input-wrapper">
                            <label>Roll Number *</label>
                            <input
                              type="text"
                              required
                              value={subLeader.rollNo}
                              onChange={(e) => updateSubLeader(index, 'rollNo', e.target.value)}
                              placeholder="Enter roll number"
                              className="erf-input-modern"
                            />
                          </div>
                          <div className="erf-input-wrapper">
                            <label>Contact *</label>
                            <input
                              type="tel"
                              required
                              value={subLeader.contact}
                              onChange={(e) => updateSubLeader(index, 'contact', e.target.value)}
                              placeholder="Enter contact"
                              className="erf-input-modern"
                            />
                          </div>
                          <div className="erf-input-wrapper">
                            <label>Email *</label>
                            <input
                              type="email"
                              required
                              value={subLeader.email}
                              onChange={(e) => updateSubLeader(index, 'email', e.target.value)}
                              placeholder="Enter email"
                              className="erf-input-modern"
                            />
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
                            <label>Name *</label>
                            <input
                              type="text"
                              required
                              value={member.name}
                              onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                              placeholder="Enter name"
                              className="erf-input-modern"
                            />
                          </div>
                          <div className="erf-input-wrapper">
                            <label>Roll Number *</label>
                            <input
                              type="text"
                              required
                              value={member.rollNo}
                              onChange={(e) => updateTeamMember(index, 'rollNo', e.target.value)}
                              placeholder="Enter roll number"
                              className="erf-input-modern"
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