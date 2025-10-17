import React, { useState, useCallback } from 'react';
import { submitRegistration, validateForm, DEPARTMENTS, ACADEMIC_YEARS } from '../utils/Enthusia.js';

const RegistrationForm = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    selectedEvent: event.id,
    teamLeader: {
      name: '',
      rollNo: '',
      department: '',
      year: '',
      contact: '',
      email: ''
    },
    teamMembers: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Initialize team members based on event requirements
  React.useEffect(() => {
    if (event.maxParticipants > 1) {
      const minMembers = event.minParticipants - 1; // Subtract 1 for team leader
      const initialMembers = Array(minMembers).fill().map(() => ({
        name: '',
        rollNo: '',
        department: '',
        year: '',
        contact: '',
        email: ''
      }));
      setFormData(prev => ({ ...prev, teamMembers: initialMembers }));
    }
  }, [event]);

  const handleInputChange = useCallback((section, field, value, index = null) => {
    setFormData(prev => {
      if (section === 'teamLeader') {
        return {
          ...prev,
          teamLeader: {
            ...prev.teamLeader,
            [field]: value
          }
        };
      } else if (section === 'teamMembers' && index !== null) {
        const newTeamMembers = [...prev.teamMembers];
        newTeamMembers[index] = {
          ...newTeamMembers[index],
          [field]: value
        };
        return {
          ...prev,
          teamMembers: newTeamMembers
        };
      }
      return prev;
    });

    // Clear error for this field
    const errorKey = `${section}${index !== null ? index : ''}${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  }, [errors]);

  const addTeamMember = () => {
    if (formData.teamMembers.length < event.maxParticipants - 1) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [
          ...prev.teamMembers,
          {
            name: '',
            rollNo: '',
            department: '',
            year: '',
            contact: '',
            email: ''
          }
        ]
      }));
    }
  };

  const removeTeamMember = (index) => {
    if (formData.teamMembers.length > event.minParticipants - 1) {
      setFormData(prev => ({
        ...prev,
        teamMembers: prev.teamMembers.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const registrationData = {
        ...formData,
        eventName: event.name,
        eventCategory: event.category,
        registrationFee: event.registrationFee,
        timestamp: new Date().toISOString(),
        teamSize: formData.teamMembers.length + 1
      };

      await submitRegistration(registrationData);
      setSubmitMessage('Registration successful! You will receive a confirmation email shortly.');
      
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setSubmitMessage('Registration failed. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            <i className="fas fa-user-plus"></i>
            Register for {event.name}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          {submitMessage && (
            <div className={`message ${submitMessage.includes('successful') ? 'success' : 'error'}`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="registration-form">
            {/* Event Info */}
            <div className="form-section">
              <h3 className="section-title-small">
                <i className="fas fa-info-circle"></i>
                Event Information
              </h3>
              <div className="event-summary">
                <div className="summary-item">
                  <strong>Event:</strong> {event.name}
                </div>
                <div className="summary-item">
                  <strong>Category:</strong> {event.category.toUpperCase()}
                </div>
                <div className="summary-item">
                  <strong>Participants:</strong> {event.minParticipants === event.maxParticipants 
                    ? event.maxParticipants 
                    : `${event.minParticipants}-${event.maxParticipants}`}
                </div>
                <div className="summary-item">
                  <strong>Registration Fee:</strong> ₹{event.registrationFee}
                </div>
              </div>
            </div>

            {/* Team Leader Information */}
            <div className="form-section">
              <h3 className="section-title-small">
                <i className="fas fa-user-tie"></i>
                Team Leader Information
              </h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.teamLeader.name}
                    onChange={(e) => handleInputChange('teamLeader', 'name', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                  {errors.teamLeaderName && <span className="error-text">{errors.teamLeaderName}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Roll Number *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.teamLeader.rollNo}
                    onChange={(e) => handleInputChange('teamLeader', 'rollNo', e.target.value)}
                    placeholder="Enter roll number"
                    required
                  />
                  {errors.teamLeaderRollNo && <span className="error-text">{errors.teamLeaderRollNo}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Department *</label>
                  <select
                    className="form-select"
                    value={formData.teamLeader.department}
                    onChange={(e) => handleInputChange('teamLeader', 'department', e.target.value)}
                    required
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.teamLeaderDepartment && <span className="error-text">{errors.teamLeaderDepartment}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Year *</label>
                  <select
                    className="form-select"
                    value={formData.teamLeader.year}
                    onChange={(e) => handleInputChange('teamLeader', 'year', e.target.value)}
                    required
                  >
                    <option value="">Select Year</option>
                    {ACADEMIC_YEARS.map(year => (
                      <option key={year} value={year}>{year} Year</option>
                    ))}
                  </select>
                  {errors.teamLeaderYear && <span className="error-text">{errors.teamLeaderYear}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Contact Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.teamLeader.contact}
                    onChange={(e) => handleInputChange('teamLeader', 'contact', e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                    required
                  />
                  {errors.teamLeaderContact && <span className="error-text">{errors.teamLeaderContact}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.teamLeader.email}
                    onChange={(e) => handleInputChange('teamLeader', 'email', e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                  {errors.teamLeaderEmail && <span className="error-text">{errors.teamLeaderEmail}</span>}
                </div>
              </div>
            </div>

            {/* Team Members (for group/dual events) */}
            {event.maxParticipants > 1 && (
              <div className="form-section">
                <h3 className="section-title-small">
                  <i className="fas fa-users"></i>
                  Team Members ({formData.teamMembers.length} / {event.maxParticipants - 1})
                </h3>
                
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="team-member">
                    <div className="member-header">
                      <h4 className="member-title">Member {index + 1}</h4>
                      {formData.teamMembers.length > event.minParticipants - 1 && (
                        <button
                          type="button"
                          className="remove-member"
                          onClick={() => removeTeamMember(index)}
                        >
                          <i className="fas fa-trash"></i> Remove
                        </button>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={member.name}
                          onChange={(e) => handleInputChange('teamMembers', 'name', e.target.value, index)}
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Roll Number *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={member.rollNo}
                          onChange={(e) => handleInputChange('teamMembers', 'rollNo', e.target.value, index)}
                          placeholder="Enter roll number"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Department *</label>
                        <select
                          className="form-select"
                          value={member.department}
                          onChange={(e) => handleInputChange('teamMembers', 'department', e.target.value, index)}
                          required
                        >
                          <option value="">Select Department</option>
                          {DEPARTMENTS.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Year *</label>
                        <select
                          className="form-select"
                          value={member.year}
                          onChange={(e) => handleInputChange('teamMembers', 'year', e.target.value, index)}
                          required
                        >
                          <option value="">Select Year</option>
                          {ACADEMIC_YEARS.map(year => (
                            <option key={year} value={year}>{year} Year</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Contact Number *</label>
                        <input
                          type="tel"
                          className="form-input"
                          value={member.contact}
                          onChange={(e) => handleInputChange('teamMembers', 'contact', e.target.value, index)}
                          placeholder="Enter 10-digit mobile number"
                          maxLength="10"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-input"
                          value={member.email}
                          onChange={(e) => handleInputChange('teamMembers', 'email', e.target.value, index)}
                          placeholder="Enter email address (optional)"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.teamMembers.length < event.maxParticipants - 1 && (
                  <button
                    type="button"
                    className="add-member"
                    onClick={addTeamMember}
                  >
                    <i className="fas fa-plus"></i> Add Team Member
                  </button>
                )}
              </div>
            )}

            {/* Terms and Submit */}
            <div className="form-section">
              <label className="checkbox-group">
                <input type="checkbox" required />
                <span className="checkmark"></span>
                I agree to the <a href="#terms" target="_blank">terms and conditions</a> and confirm that all information provided is accurate.
              </label>
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Register Now - ₹{event.registrationFee}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;